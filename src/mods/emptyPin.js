const EmptyPin = {
  update() {
    Interceptor.attach(Offsets.libg.ClientInputManager.addInput, {
      onEnter(args) {
        const inputData = args[1];
        const inputType = inputData.add(4).readInt();
        const pinId = inputData.add(20).readU8();

        if (inputType !== 1) {
          return;
        }

        if (Config.emptyPinModEnabled && pinId) {
          inputData.add(20).writeU8(0);
        }
      }
    });
  }
};

module.exports = { EmptyPin };
