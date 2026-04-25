const RandomSpraySpam = {
  isStarted: false,
  interval: null,
  angle: 0,
  speed: 100,

  sendInput() {
    const input = malloc(50);
    const clientInput = Offsets.libg.ClientInput.ctor(input, 15);
    input.add(36).writeInt(Math.floor(Math.random() * 5 + 6));

    this.angle = (this.angle + 30) % 360;
    input.add(40).writeInt(this.angle);

    Offsets.libg.ClientInputManager.addInput(
      Offsets.libg.BattleMode.getInstance(clientInput).add(88).readPointer(),
      input
    );
  },

  start() {
    if (this.isStarted) {
      return;
    }
    this.isStarted = true;
    const self = this;
    this.interval = setInterval(function () {
      if (self.isStarted) {
        self.sendInput();
      }
    }, 1000 / self.speed);
  },

  stop() {
    this.isStarted = false;
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    this.angle = 0;
  },

  update() { }
};

module.exports = { RandomSpraySpam };
