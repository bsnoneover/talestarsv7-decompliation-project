const AntiAFK = {
  update() {
    Interceptor.replace(
      Offsets.libg.BattleScreen.isAfk,
      new NativeCallback(
        function (battleScreenPtr) {
          if (!Config.antiAfkModEnabled) {
            return Offsets.libg.BattleScreen.isAfk(battleScreenPtr);
          }

          const afkTime = parseInt(battleScreenPtr.add(3784).readFloat());
          const ownCharacter = Offsets.libg.LogicBattleModeClient.getOwnCharacter(
            Offsets.libg.BattleMode.getInstance2().add(40).readPointer()
          );

          if (ownCharacter.toInt32() === 0) {
            return 0;
          }

          if (afkTime > 9) {
            const posX = ownCharacter.add(48).readInt();
            const posY = ownCharacter.add(52).readInt();
            const input = malloc(200);
            const clientInput = Offsets.libg.ClientInput.ctor(input, 2);
            input.add(8).writeInt(posX);
            input.add(12).writeInt(posY);
            Offsets.libg.ClientInputManager.addInput(
              Offsets.libg.BattleMode.getInstance(clientInput).add(88).readPointer(),
              input
            );
          }
          return 0;
        },
        'bool',
        ['pointer']
      )
    );
  }
};

module.exports = { AntiAFK };
