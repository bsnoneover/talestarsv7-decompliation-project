const AutoPlayAgain = {
  update() {
    Interceptor.attach(Offsets.libg.Other.BattleEndScreen_enterAddr, {
      onLeave() {
        if (!Config.autoPlayAgainModEnabled) {
          return;
        }
      }
    });
  }
};

module.exports = { AutoPlayAgain };
