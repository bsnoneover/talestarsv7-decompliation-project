const AntiAutoSuperAndShoot = {
  update() {
    Interceptor.attach(Offsets.libg.ClientInputManager.addInput, {
      onEnter(args) {
        const inputData = args[1];
        const inputType = inputData.add(4).readInt();
        const isAuto = inputData.add(20).readU8();

        if (inputType !== 1) {
          return;
        }

        if (Config.antiAutoSuperModEnabled && isAuto) {
          inputData.add(20).writeU8(0);
        }
      }
    });
  }
};

module.exports = { AntiAutoSuperAndShoot };
