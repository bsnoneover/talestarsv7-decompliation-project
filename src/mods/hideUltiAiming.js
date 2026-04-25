const HideUltiAiming = {
  update() {
    Interceptor.attach(Offsets.libg.ClientInput.ctor, {
      onEnter(args) {
        if (args[1].toInt32() !== 5) {
          return;
        }
      }
    });
  }
};

module.exports = { HideUltiAiming };
