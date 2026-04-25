const CreditText = {
  creditText: null,
  activationStatusText: null,
  fpsCounter: 0,
  fpsHistory: [],
  fps: 0,

  addCreditText() {
    if (this.creditText || this.activationStatusText) return;
    this.creditText = new Text({ isStage: true }, 5, 0, '', 1.3);
    this.activationStatusText = new Text({ isStage: true }, 5, 15, A.activated ? Localization.talePlusActive : Localization.talePlusNotActive, 1.3);
  },

  startFPSCounter() {
    Interceptor.replace(
      Offsets.libg.GameMain.draw,
      new NativeCallback((ptr, delta) => {
        this.fpsCounter++;
        return Offsets.libg.GameMain.draw(ptr, delta);
      }, 'pointer', ['pointer', 'float'])
    );
    setInterval(() => {
      const currentFps = this.fpsCounter * 4;
      this.fpsCounter = 0;
      this.fpsHistory.push(currentFps);
      if (this.fpsHistory.length > 5) this.fpsHistory.shift();
      if (this.fpsHistory.length === 0) return;
      this.fps = Math.round(this.fpsHistory.reduce((a, b) => a + b, 0) / this.fpsHistory.length);
      this.creditText?.setText(
        `${this.getFPSColor(this.fps)}FPS ${this.fps}</c> ${LocalizationStatic.telegramTextShort} ${ColorUtils.colorize('(v' + Versioning.base() + ')', 'gray', 'gray', 'gray')}`,
        null
      );
    }, 250);
  },

  getFPSColor(fps) {
    const ratio = Math.max(0, Math.min(60, fps)) / 60;
    const r = Math.round((1 - ratio) * 255);
    const g = Math.round(ratio * 255);
    const toHex = v => v.toString(16).padStart(2, '0');
    return `<c${toHex(r)}${toHex(g)}00>`;
  },

  removeCreditText() {
    this.creditText?.remove();
    this.creditText = null;
  }
};
Global.CreditText = CreditText;

module.exports = { CreditText };
