const VisualSpectators = {
  spectatorCount: null,

  update() {
    Interceptor.attach(Offsets.libg.MessageManager.receiveMessage, {
      onEnter(args) {
        const messagePtr = args[1];
        const getMessageType = new NativeFunction(messagePtr.readPointer().add(40).readPointer(), 'int', ['pointer']);

        const messageType = getMessageType(messagePtr);
        if (messageType !== 24109) {
          return;
        }
      }
    });
  }
};

module.exports = { VisualSpectators };
