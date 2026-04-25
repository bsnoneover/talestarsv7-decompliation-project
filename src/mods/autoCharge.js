const AutoCharge = {
  stopInput13: false,
  interval: null,
  addInputIC: null,

  sendInput13() {
    try {
      const battleMode = Offsets.libg.BattleMode.getInstance(ptr(0));
      if (battleMode.toInt32() === 0) {
        return;
      }
      const input = malloc(60);
      const clientInput = Offsets.libg.ClientInput.ctor(input, 13);
      clientInput.add(52).writeU8(37);
      Offsets.libg.ClientInputManager.addInput(
        Offsets.libg.BattleMode.getInstance(clientInput).add(88).readPointer(),
        input
      );
    } catch { }
  },

  attachAddInput() {
    if (this.addInputIC) {
      return;
    }
    const self = this;
    this.addInputIC = Interceptor.attach(Offsets.libg.ClientInputManager.addInput, {
      onEnter(args) {
        if (A.activated === 0 || !Config.autoChargeModEnabled) {
          return;
        }
        const inputType = args[1].add(4).readInt();
        if (inputType === 13 && self.stopInput13) {
          args[1].add(4).writeInt(0);
        }
      }
    });
  },

  startLoop() {
    if (this.interval) {
      return;
    }
    const self = this;
    this.interval = setInterval(function () {
      if (!Config.autoChargeModEnabled) {
        return;
      }
      self.sendInput13();
    }, 160);
  },

  stopLoop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  },

  attachAll() {
    this.attachAddInput();
    this.startLoop();
  },

  update() {
    this.attachAll();
  }
};

module.exports = { AutoCharge };
