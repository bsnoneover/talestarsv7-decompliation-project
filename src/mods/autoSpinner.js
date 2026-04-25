const AutoSpinner = {
  logicBattle: null,
  battleMode: null,
  interval: null,
  angle: 0,
  last: {
    x: null,
    y: null
  },
  currentModIndex: 0,
  modeOrder: ['normal', 'fast', 'super-fast', 'supersuper-fast', 'off'],
  modeDecorateNames: ['Name1', 'Name2', 'Name3', 'Name4', 'DefaultName'],
  moveTo(x, y) {
    if (this.logicBattle.isNull()) {
      return;
    }
    const input = malloc(200);
    Offsets.libg.ClientInput.ctor(input, 2);
    input.add(8).writeInt(x);
    input.add(12).writeInt(y);
    Offsets.libg.ClientInputManager.addInput(Offsets.libg.BattleMode.getInstance2().add(88).readPointer(), input);
    Offsets.libg.LogicBattleModeClient.setClientPredictionMoveTo(this.logicBattle, x, y, 1);
  },
  spin(radius = 1, angleStep = 0.15, intervalMs = 50) {
    if (this.interval) {
      return;
    }

    const ownCharacter = Offsets.libg.LogicBattleModeClient.getOwnCharacter(this.battleMode);
    const originX = Offsets.libg.LogicGameObjectClient.getX(ownCharacter);
    const originY = Offsets.libg.LogicGameObjectClient.getY(ownCharacter);

    const self = this;
    this.interval = setInterval(function () {
      self.angle += angleStep;

      while (self.angle > Math.PI * 2) {
        self.angle -= Math.PI * 2;
      }

      const targetX = Math.round(originX + Math.cos(self.angle) * radius);
      const targetY = Math.round(originY + Math.sin(self.angle) * radius);

      if (targetX === self.last.x && targetY === self.last.y) {
        return;
      }

      self.last.x = targetX;
      self.last.y = targetY;
      self.moveTo(targetX, targetY);
    }, intervalMs);
  },
  toggle(mode) {
    switch (mode) {
      case 'normal':
        this.spin(1, 0.09, 50);
        break;
      case 'fast':
        this.spin(1, 0.09, 30);
        break;
      case 'super-fast':
        this.spin(1, 45.77, 50);
        break;
      case 'supersuper-fast':
        this.spin(1, 45.77, 29);
        break;
      case 'off':
        this.stop();
        break;
    }
  },

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    this.last.x = null;
    this.last.y = null;
    this.angle = 0;
    this.logicBattle = null;
    this.battleMode = null;
  },
  update() {
    const self = this;

    Interceptor.attach(Offsets.libg.BattleScreen.update, {
      onEnter(args) {
        self.logicBattle = Offsets.libg.GameScreen.getLogicBattle(args[0]);
      }
    });

    Interceptor.attach(Offsets.libg.LogicBattleModeClient.update, {
      onEnter(args) {
        self.battleMode = args[0];
      }
    });

    Interceptor.attach(Offsets.libg.BattleMode.exit, {
      onEnter() {
        self.stop();
      }
    });
  }
};

module.exports = { AutoSpinner };
