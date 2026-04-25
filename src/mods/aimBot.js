const AimBot = {
  getClosestIC: null,
  activateSkillIC: null,
  updateIC: null,
  latestX: null,
  latestY: null,
  timeDiffs: null,
  battleModeAimBot: null,
  lastTime: 0,
  config: {
    lastpositionsLen: 3,
    projectileSpeed: 3255,
    useWeightedAverage: false,
    timeToHitMultiplyCoeficient: 0.8
  },
  createRecentArray(maxLength = 2) {
    const arr = [];
    return {
      array: arr,
      push(value) {
        arr.push(value);
        if (arr.length > maxLength) {
          arr.shift();
        }
      },
      setMax(newMax) {
        maxLength = newMax;
        while (arr.length > maxLength) {
          arr.shift();
        }
      }
    };
  },
  calculateDistance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  },
  calculateTimeToHit(x1, y1, x2, y2) {
    return this.calculateDistance(x1, y1, x2, y2) / this.config.projectileSpeed;
  },
  predictFuturePosition(timeToHit) {
    if (this.latestX.array.length < 2 || this.timeDiffs.array.length < 1) {
      return {
        x: this.latestX.array[this.latestX.array.length - 1] || 0,
        y: this.latestY.array[this.latestY.array.length - 1] || 0
      };
    }

    let totalTime = this.timeDiffs.array.reduce((sum, diff) => sum + diff, 0);
    totalTime = totalTime / this.timeDiffs.array.length / 1000;

    let weightedVelocityX = 0;
    let weightedVelocityY = 0;
    let totalWeight = 0;

    for (let i = 1; i < this.latestX.array.length; i++) {
      const dx = this.latestX.array[i] - this.latestX.array[i - 1];
      const dy = this.latestY.array[i] - this.latestY.array[i - 1];
      const dt = this.timeDiffs.array[i - 1] / 1000;
      if (dt > 0) {
        weightedVelocityX += (dx / dt) * i;
        weightedVelocityY += (dy / dt) * i;
        totalWeight += i;
      }
    }

    const velocityX = totalWeight > 0 ? weightedVelocityX / totalWeight : 0;
    const velocityY = totalWeight > 0 ? weightedVelocityY / totalWeight : 0;

    return {
      x: this.latestX.array[this.latestX.array.length - 1] + velocityX * timeToHit,
      y: this.latestY.array[this.latestY.array.length - 1] + velocityY * timeToHit
    };
  },
  attachGetClosest() {
    if (this.getClosestIC) {
      return;
    }
    const self = this;
    this.getClosestIC = Interceptor.attach(
      Offsets.libg.BattleScreen.getClosestTargetForAutoshoot,
      {
        onLeave(targetPtr) {
          if (A.activated === 0 || !Config.aimBotModEnabled) {
            return;
          }
          if (targetPtr === 0) {
            return;
          }
          const targetX = Offsets.libg.LogicGameObjectClient.getX(targetPtr);
          const targetY = Offsets.libg.LogicGameObjectClient.getY(targetPtr);
          self.latestX.push(targetX);
          self.latestY.push(targetY);
          const now = Date.now();
          if (self.lastTime !== 0) {
            self.timeDiffs.push(now - self.lastTime);
          }
          self.lastTime = now;
        }
      }
    );
  },
  attachActivateSkill() {
    if (this.activateSkillIC) {
      return;
    }
    const self = this;
    this.activateSkillIC = Interceptor.attach(Offsets.libg.BattleScreen.activateSkill, {
      onEnter(args) {
        if (A.activated === 0 || !Config.aimBotModEnabled) {
          return;
        }
        if (parseInt(args[6]) === 0 || !self.battleModeAimBot) {
          return;
        }

        const ownCharacter = Offsets.libg.LogicBattleModeClient.getOwnCharacter(self.battleModeAimBot);
        const characterName = StringUtils.readStringFromStringObject(
          Offsets.libg.LogicData.getName(Offsets.libg.LogicCharacterClient.getCharacterData(ownCharacter))
        );

        let projectileSpeed = self.config.projectileSpeed;
        if (characterName === 'SnakeOil') {
          projectileSpeed = 2000;
        } else if (characterName === 'BeeSniper') {
          projectileSpeed = 3255;
        } else if (characterName === 'Sniper' || characterName === 'Percenter') {
          projectileSpeed = 4000;
        }
        self.config.projectileSpeed = projectileSpeed;

        const ownX = Offsets.libg.LogicGameObjectClient.getX(ownCharacter);
        const ownY = Offsets.libg.LogicGameObjectClient.getY(ownCharacter);
        const targetX = self.latestX.array[self.latestX.array.length - 1];
        const targetY = self.latestY.array[self.latestY.array.length - 1];

        const timeToHit = self.config.timeToHitMultiplyCoeficient * self.calculateTimeToHit(
          ownX, ownY, targetX, targetY
        );
        const predictedPosition = self.predictFuturePosition(timeToHit, self.config.useWeightedAverage);

        args[5] = ptr(0);
        args[1] = ptr(predictedPosition.x);
        args[2] = ptr(predictedPosition.y);
      }
    });
  },
  attachUpdate() {
    if (this.updateIC) {
      return;
    }
    const self = this;
    this.updateIC = Interceptor.attach(Offsets.libg.LogicBattleModeClient.update, {
      onEnter(args) {
        self.battleModeAimBot = args[0];
      }
    });
  },
  attachAll() {
    this.attachGetClosest();
    this.attachActivateSkill();
    this.attachUpdate();
  },

  init() {
    this.latestX = this.createRecentArray(this.config.lastpositionsLen);
    this.latestY = this.createRecentArray(this.config.lastpositionsLen);
    this.timeDiffs = this.createRecentArray(this.config.lastpositionsLen - 1);
  },

  update() {
    this.init();
    this.attachAll();
  }
};

module.exports = { AimBot };
