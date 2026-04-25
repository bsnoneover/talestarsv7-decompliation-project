const FollowClosestAlly = {
  interceptors: [],
  intervals: [],
  teammates: {},
  isStarted: false,
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
    try {
      const gameState = Offsets.libg.GameStateManager.getInstance();
      const logicBattle = Offsets.libg.GameScreen.getLogicBattle(gameState.add(72).readPointer().add(16).readPointer());
      if (!logicBattle) {
        return;
      }
      this.sendMoveInput(x, y);
      Offsets.libg.LogicBattleModeClient.setClientPredictionMoveTo(logicBattle, x, y, 1);
    } catch (_) { }
  },
  getDistance(x1, y1, x2, y2) {
    const dx = x1 - x2;
    const dy = y1 - y2;
    return Math.sqrt(dx * dx + dy * dy);
  },
  start() {
    this.isStarted = true;
    this.teammates = {};
    const self = this;
    const interceptor = Interceptor.attach(Offsets.libg.Character.update, {
      onEnter(args) {
        try {
          const gameState = Offsets.libg.GameStateManager.getInstance().add(72).readPointer().add(40).readPointer();
          const ownCharacter = Offsets.libg.LogicBattleModeClient.getOwnCharacter(gameState);
          const ownGlobalId = Offsets.libg.LogicGameObjectClient.getGlobalID(ownCharacter);
          const ownTeamId = Offsets.libg.LogicBattleModeClient.getOwnPlayerTeam(Offsets.libg.BattleMode.getInstance2().add(40).readPointer());
          const characterPtr = args[0];
          const logic = Offsets.libg.GameObject.getLogic(characterPtr);
          const globalId = Offsets.libg.LogicGameObjectClient.getGlobalID(logic);
          if (globalId === ownGlobalId) {
            return;
          }
          if (logic.add(64).readInt() !== ownTeamId) {
            return;
          }
          const teammateX = Offsets.libg.LogicGameObjectClient.getX(logic);
          const teammateY = Offsets.libg.LogicGameObjectClient.getY(logic);
          self.teammates[globalId] = {
            x: teammateX,
            y: teammateY,
            ts: Date.now()
          };
        } catch (_) { }
      }
    });
    this.interceptors.push(interceptor);

    const interval = setInterval(function () {
      try {
        const gameState = Offsets.libg.GameStateManager.getInstance().add(72).readPointer().add(40).readPointer();
        const ownCharacter = Offsets.libg.LogicBattleModeClient.getOwnCharacter(gameState);
        const ownX = Offsets.libg.LogicGameObjectClient.getX(ownCharacter);
        const ownY = Offsets.libg.LogicGameObjectClient.getY(ownCharacter);

        let closestTeammate = null;
        let closestDistance = Infinity;

        for (const teammateId in self.teammates) {
          const teammate = self.teammates[teammateId];
          if (Date.now() - teammate.ts > 200) {
            delete self.teammates[teammateId];
            continue;
          }
          const distance = self.getDistance(ownX, ownY, teammate.x, teammate.y);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestTeammate = teammate;
          }
        }

        if (closestTeammate) {
          self.moveTo(closestTeammate.x, closestTeammate.y);
        }
        return;
      } catch (_) {
        return;
      }
    }, 50);
    this.intervals.push(interval);
  },
  stop() {
    this.isStarted = false;
    for (const interval of this.intervals) {
      clearInterval(interval);
    }
    for (const interceptor of this.interceptors) {
      interceptor.detach();
    }
    this.intervals = [];
    this.interceptors = [];
    this.teammates = {};
  },
  attachBattleModeExit() {
    const self = this;
    Interceptor.attach(Offsets.libg.BattleMode.exit, {
      onEnter() {
        self.stop();
      }
    });
  },
  init() {
    this.attachBattleModeExit();
  }
};

module.exports = { FollowClosestAlly };
