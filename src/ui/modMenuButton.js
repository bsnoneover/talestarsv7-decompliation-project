const ModMenuButton = {
  modMenuButton: null,

  setModMenuButtonXY(position) {
    const stage = Offsets.libg.Stage.instance.readPointer();
    const width = stage.add(88).readFloat();
    const height = stage.add(84).readFloat();
    let scale = 0.1;
    if (stage.add(7224).readFloat() !== 0) {
      scale = stage.add(7232).readFloat();
    }
    const screenWidth = stage.add(7376).readInt() - (height + width) / scale;

    const positions = {
      bottom_left: [40, 540],
      top_left: [40, 40],
      top_right: [screenWidth - 40, 30],
      bottom_right: [screenWidth - 40, 540]
    };
    const [x, y] = positions[position] || positions.bottom_left;
    this.modMenuButton.setXY(x, y);
  },

  addModMenuButton() {
    if (this.modMenuButton) return;
    this.modMenuButton = new Button({ isStage: true }, 40, 540, 'MOD MENU', ButtonType.MAP_EDITOR_EXIT_BUTTON, 0, null, ButtonCallbacks.onModMenuButtonClick);
    this.setModMenuButtonXY(Config.modMenuButtonPosition);
  },

  removeModMenuButton() {
    this.modMenuButton?.remove();
    this.modMenuButton = null;
  }
};
Global.ModMenuButton = ModMenuButton;

module.exports = { ModMenuButton };
