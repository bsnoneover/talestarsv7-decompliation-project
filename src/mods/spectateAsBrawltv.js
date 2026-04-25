const SpectateAsBrawltv = {
  update() {
    Interceptor.attach(Offsets.libg.Messages.StartSpectateMessage, {
      onEnter(args) {
        if (Config.spectateEveryMatchAsBrawltv) {
          args[2] = ptr(1);
        }
      }
    });
  }
};

module.exports = { SpectateAsBrawltv };
