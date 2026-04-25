const AutoDodge = {
  state: {
    ownCharacter: ptr(0),
    ownTeamId: -1,
    isDodging: false,
    movementTarget: {
      x: 0,
      y: 0
    },
    projectiles: new Map(),
    lastDodgeTime: 0,
    lastInput: {
      x: 0,
      y: 0,
      time: 0
    },
    dodgeTimeout: null,
    currentDodge: {
      x: 0,
      y: 0
    },
    queuedInput: null,
    forceDodge: false,
    forceMovementBlock: false,
    lastThreatDirection: 0,
    consecutiveDodges: 0,
    movementInterval: null,
    threatHistory: new Map(),
    dangerLevel: 0,
    lastPosition: {
      x: 0,
      y: 0
    }
  },
  CONFIG: {
    DODGE_DURATION: 80,
    FORCE_BLOCK_DURATION: 40,
    DODGE_COOLDOWN: 50,
    PREDICTION_TIME: 0.8,
    EARLY_DODGE_MULTIPLIER: 1.3,
    ANGLE_DETECTION_THRESHOLD: 4,
    COLLISION_MARGIN: 80,
    MIN_PROJECTILE_SPEED: 25,
    SAFETY_ANGLE: Math.PI / 3,
    DODGE_DIRECTION_WEIGHT: 0.7,
    VELOCITY_PREDICTION_FACTOR: 1.5,
    MAX_CONSECUTIVE_DODGES: 3,
    MULTI_THREAT_THRESHOLD: 2,
    THREAT_PRIORITY_DISTANCE: 300,
    STALE_PROJECTILE_THRESHOLD: 500,
    INPUT_COOLDOWN: 8,
    ADAPTIVE_DODGE_DISTANCE: true,
    CORNER_AVOIDANCE: true,
    PREDICTION_ACCURACY_THRESHOLD: 0.85,
    MAX_DISTANCE: 3500
  },
  logicBattle: null,
  projectileUpdateIC: null,
  lbmcUpdateIC: null,
  battleModeEnterIC: null,
  destroyTileIC: null,
  normalizeAngle(angle) {
    while (angle > Math.PI) {
      angle -= Math.PI * 2;
    }
    while (angle < -Math.PI) {
      angle += Math.PI * 2;
    }
    return angle;
  },
  getBlacklist() {
    return Config.autoDodge.blacklist || [];
  },

  isBlacklisted(speed, radius) {
    return this.getBlacklist().some((item) => item.speed === speed && item.radius === radius);
  },
  sendMoveInput(x, y) {
    const input = malloc(200);
    Offsets.libg.ClientInput.ctor(input, 2);
    input.add(8).writeInt(x);
    input.add(12).writeInt(y);
    Offsets.libg.ClientInputManager.addInput(
      Offsets.libg.BattleMode.getInstance2().add(88).readPointer(),
      input
    );
  },
  moveTo(x, y) {
    const logicBattle = Offsets.libg.GameScreen.getLogicBattle(Qt().add(16).readPointer());
    if (logicBattle) {
      this.sendMoveInput(x, y);
    }
  },
  stopMovement() {
    if (!this.state.movementInterval) {
      return;
    }
    clearInterval(this.state.movementInterval);
    this.state.movementInterval = null;
  },
  analyzeProjectiles(projectilePtr, ownTeamId, ownX, ownY, ownRadius) {
    const threats = [];
    const now = Date.now();
    const processedIds = new Set();

    try {
      const logic = Offsets.libg.GameObject.getLogic(projectilePtr);
      const projectileData = Offsets.libg.LogicGameObjectClient.getData(logic);
      if (!projectileData || projectileData.isNull()) {
        return [];
      }

      const projectileId = Offsets.libg.LogicGameObjectClient.getGlobalID(logic).toString();
      processedIds.add(projectileId);

      const projectileTeam = logic.add(64).readU32();
      const projectileState = logic.add(208).readU32();

      if (projectileTeam === ownTeamId || projectileState !== 0) {
        this.state.projectiles.delete(projectileId);
        return [];
      }

      const projectileX = Offsets.libg.LogicGameObjectClient.getX(logic);
      const projectileY = Offsets.libg.LogicGameObjectClient.getY(logic);
      const speed = Offsets.libg.LogicProjectileData.getSpeed(projectileData);
      const radius = Offsets.libg.LogicProjectileData.getRadius(projectileData);

      if (this.isBlacklisted(speed, radius)) {
        this.state.projectiles.delete(projectileId);
        return [];
      }

      const distance = Math.hypot(ownX - projectileX, ownY - projectileY);
      if (distance > this.CONFIG.MAX_DISTANCE) {
        return [];
      }

      let angle;
      let angleCalculated;
      let accuracy;

      if (Config.autoDodge.isOldAngle) {
        const prevData = this.state.projectiles.get(projectileId) || {};
        angle = prevData.angle;
        angleCalculated = prevData.calculated;
        accuracy = prevData.accuracy || 0;

        if (prevData.x !== undefined && prevData.y !== undefined) {
          const dx = projectileX - prevData.x;
          const dy = projectileY - prevData.y;
          const moveDistance = Math.hypot(dx, dy);

          if (moveDistance > this.CONFIG.ANGLE_DETECTION_THRESHOLD) {
            const newAngle = Math.atan2(dy, dx);
            if (angle !== undefined) {
              const angleDiff = Math.abs(this.normalizeAngle(newAngle - angle));
              accuracy = Math.max(0, 1 - angleDiff / Math.PI / 4);
            }
            angle = newAngle;
            angleCalculated = true;
          }
        }
      } else {
        const projectileAngleDegrees = Offsets.libg.Projectile.getAngle(projectilePtr);
        angle = (projectileAngleDegrees * Math.PI) / 180;
        angleCalculated = true;
        accuracy = 1;

        const points = this.getPointsAlongPath(ownX, ownY, projectileX, projectileY, projectileAngleDegrees, 100);
        let hasWall = false;
        for (const point of points) {
          if (qt(point.x, point.y)) {
            hasWall = true;
            break;
          }
        }
        if (hasWall) {
          return [];
        }
      }

      this.state.projectiles.set(projectileId, {
        x: projectileX,
        y: projectileY,
        speed,
        radius,
        angle,
        calculated: angleCalculated,
        accuracy,
        lastSeen: now,
        distance
      });

      if (speed > this.CONFIG.MIN_PROJECTILE_SPEED &&
        angleCalculated &&
        accuracy > this.CONFIG.PREDICTION_ACCURACY_THRESHOLD) {
        const timeToCollision = this.improvedTimeToCollision(
          { x: projectileX, y: projectileY, speed, radius, angle },
          ownX, ownY, ownRadius
        );

        if (timeToCollision < this.CONFIG.PREDICTION_TIME) {
          const priority = this.calculateThreatPriority(
            { x: projectileX, y: projectileY, speed, radius, angle, ttc: timeToCollision },
            ownX, ownY
          );
          threats.push({
            id: projectileId,
            x: projectileX,
            y: projectileY,
            speed,
            radius,
            angle,
            ttc: timeToCollision,
            priority
          });
        }
      }
      return threats;
    } catch (_) {
      return [];
    }
  },

  getPointsAlongPath(x1, y1, x2, y2, angleDegrees, step = 10) {
    const points = [];
    const angleRad = (angleDegrees * Math.PI) / 180;
    const distance = Math.hypot(x1 - x2, y1 - y2);
    const cos = Math.cos(angleRad);
    const sin = Math.sin(angleRad);

    for (let dist = 0; dist <= distance; dist += step) {
      points.push({
        x: x2 + cos * dist,
        y: y2 + sin * dist
      });
    }
    return points;
  },
  improvedTimeToCollision(projectile, ownX, ownY, ownRadius) {
    const dx = projectile.x - ownX;
    const dy = projectile.y - ownY;
    const velocityX = Math.cos(projectile.angle) * projectile.speed * this.CONFIG.VELOCITY_PREDICTION_FACTOR;
    const velocityY = Math.sin(projectile.angle) * projectile.speed * this.CONFIG.VELOCITY_PREDICTION_FACTOR;
    const collisionDist = projectile.radius + ownRadius + this.CONFIG.COLLISION_MARGIN;
    const a = velocityX * velocityX + velocityY * velocityY;
    const b = (dx * velocityX + dy * velocityY) * 2;
    const c = b * b - a * 4 * (dx * dx + dy * dy - collisionDist * collisionDist);

    if (c < 0) {
      return Infinity;
    }
    const sqrtC = Math.sqrt(c);
    const t1 = ((-b - sqrtC) / 2) * a;
    const t2 = ((-b + sqrtC) / 2) * a;

    if (t1 > 0) {
      return t1;
    }
    if (t2 > 0) {
      return t2;
    }
    return Infinity;
  },
  calculateThreatPriority(threat, ownX, ownY) {
    const distance = Math.hypot(threat.x - ownX, threat.y - ownY);
    return 0.5 / Math.max(threat.ttc, 0.01) + 0.3 / Math.max(distance, 50) + (threat.speed * 0.2) / 100;
  },
  calculateBestDodge(threats, ownX, ownY, ownRadius) {
    if (threats.length === 0) {
      return null;
    }
    const primaryThreat = threats[0];
    const threatAngle = primaryThreat.angle;

    let dodgeDistance = Config.autoDodge.distance;
    if (this.CONFIG.ADAPTIVE_DODGE_DISTANCE) {
      const threatDist = Math.hypot(primaryThreat.x - ownX, primaryThreat.y - ownY);
      dodgeDistance = Math.min(Config.autoDodge.distance, threatDist * 0.6);
    }

    const predictionTime = primaryThreat.ttc * this.CONFIG.EARLY_DODGE_MULTIPLIER;
    const predictedThreatX = primaryThreat.x + Math.cos(threatAngle) * primaryThreat.speed * predictionTime;
    const predictedThreatY = primaryThreat.y + Math.sin(threatAngle) * primaryThreat.speed * predictionTime;

    const perpendicularAngle1 = threatAngle + Math.PI / 2;
    const perpendicularAngle2 = threatAngle - Math.PI / 2;

    const dodgeOption1 = {
      x: ownX + Math.cos(perpendicularAngle1) * dodgeDistance,
      y: ownY + Math.sin(perpendicularAngle1) * dodgeDistance,
      angle: perpendicularAngle1
    };
    const dodgeOption2 = {
      x: ownX + Math.cos(perpendicularAngle2) * dodgeDistance,
      y: ownY + Math.sin(perpendicularAngle2) * dodgeDistance,
      angle: perpendicularAngle2
    };

    const score1 = this.evaluateDodgeOption(dodgeOption1, threats, predictedThreatX, predictedThreatY, ownX, ownY);
    const score2 = this.evaluateDodgeOption(dodgeOption2, threats, predictedThreatX, predictedThreatY, ownX, ownY);

    return score1 > score2 ? dodgeOption1 : dodgeOption2;
  },
  evaluateDodgeOption(dodgeOption, threats, predictedThreatX, predictedThreatY, ownX, ownY) {
    let score = 0;
    score += Math.hypot(dodgeOption.x - predictedThreatX, dodgeOption.y - predictedThreatY) * 0.4;

    for (let i = 1; i < Math.min(threats.length, this.CONFIG.MULTI_THREAT_THRESHOLD + 1); i++) {
      const threat = threats[i];
      const predictedX = threat.x + Math.cos(threat.angle) * threat.speed * threat.ttc;
      const predictedY = threat.y + Math.sin(threat.angle) * threat.speed * threat.ttc;
      score += Math.hypot(dodgeOption.x - predictedX, dodgeOption.y - predictedY) * 0.2;
    }

    score -= Math.hypot(dodgeOption.x - ownX, dodgeOption.y - ownY) * 0.1;

    if (this.CONFIG.CORNER_AVOIDANCE) {
      score -= this.calculateBoundaryPenalty(dodgeOption.x, dodgeOption.y) * 0.3;
    }
    return score;
  },
  calculateBoundaryPenalty(x, y) {
    const boundaryLimit = 1000;
    return 0;
  },
  executeForceDodge(x, y) {
    const now = Date.now();
    if (this.state.isDodging) {
      return;
    }
    this.state.isDodging = true;
    this.state.forceMovementBlock = true;
    this.state.consecutiveDodges++;
    this.state.lastDodgeTime = now;
    this.state.dangerLevel = Math.min(this.state.dangerLevel + 1, 5);
    this.stopMovement();
    this.moveTo(x, y);

    const self = this;
    this.state.dodgeTimeout = setTimeout(function () {
      self.state.isDodging = false;
      setTimeout(function () {
        self.state.forceMovementBlock = false;
        self.state.dangerLevel = Math.max(0, self.state.dangerLevel - 0.5);
        if (self.state.consecutiveDodges >= self.CONFIG.MAX_CONSECUTIVE_DODGES) {
          self.state.consecutiveDodges = 0;
        }
        if (self.state.queuedInput) {
          self.moveTo(self.state.queuedInput.x, self.state.queuedInput.y);
          self.state.queuedInput = null;
        }
      }, self.CONFIG.FORCE_BLOCK_DURATION);
    }, this.CONFIG.DODGE_DURATION);
  },
  attachAll() {
    if (this.projectileUpdateIC) {
      return;
    }
  },
  detachAll() {
    if (this.projectileUpdateIC) {
      this.projectileUpdateIC.detach();
      this.projectileUpdateIC = null;
    }
    if (this.lbmcUpdateIC) {
      this.lbmcUpdateIC.detach();
      this.lbmcUpdateIC = null;
    }
    if (this.battleModeEnterIC) {
      this.battleModeEnterIC.detach();
      this.battleModeEnterIC = null;
    }
    if (this.destroyTileIC) {
      this.destroyTileIC.detach();
      this.destroyTileIC = null;
    }
  },
  update() {
    if (Config.autoDodgeModEnabled) {
      this.attachAll();
      return;
    }
    this.detachAll();
  }
};

module.exports = { AutoDodge };
