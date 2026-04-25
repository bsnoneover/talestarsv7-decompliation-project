const ShowEnemyAmmo = {
  update() {
    Interceptor.replace(
      Offsets.libg.Character.updateHealthBar,
      new NativeCallback(
        function (characterPtr, healthValue) {
          Offsets.libg.Character.updateHealthBar(characterPtr, healthValue);

          if (!Config.showEnemyAmmoModEnabled) {
            return;
          }

          const ammoPtr = characterPtr.add(2568).readPointer();
          if (ammoPtr && !ammoPtr.isNull()) {
            ammoPtr.add(8).writeU8(1);
          }
        },
        'void',
        ['pointer', 'float']
      )
    );
  }
};

module.exports = { ShowEnemyAmmo };
