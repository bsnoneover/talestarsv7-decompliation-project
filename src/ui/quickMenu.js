const QuickMenu = {
  instance: null,
  quickMenu: null,
  isOpen: false,
  isCameraSettingsOpen: false,
  mainButtons: [],
  cameraButtons: [],
  init(t) {
    this.instance = t;
    new Button({ sprite: this.instance }, 40, 70, '', ButtonType.TALEPLUS, 0, null, ButtonCallbacks.QuickMenu.onQuickMenuButtonClick);
  },
  createMenu() {
    this.isOpen = true;
    this.isCameraSettingsOpen = false;
    this.quickMenu = new QuickPopup({ sprite: this.instance }, 380, 55);
    new Image({ sprite: this.quickMenu.ptr }, AssetsManager.getImagePath('talestarsv65icon'), 100, 78, 14, 14);
    new Text({ sprite: this.quickMenu.ptr }, 120, 68, 'Quick Menu <cff9300>(BETA)</c>', 1.7);
    this.createMainButtons();
  },
  createMainButtons() {
    if (Config.aimBotModEnabled) {
      this.mainButtons = [
        new Button({ sprite: this.quickMenu.ptr }, 160, -135, 'X-Ray Autoshoot', ButtonType.BLACK, -0.5, { name: Config.xRayModEnabled ? 'Name1' : 'DefaultName' }, ButtonCallbacks.QuickMenu.Mods.onXrayAutoshootButtonClick),
        new Button({ sprite: this.quickMenu.ptr }, 300, -135, 'Aim Bot', ButtonType.BLACK, -0.5, { name: Config.aimBotModEnabled ? 'Name1' : 'DefaultName' }, ButtonCallbacks.QuickMenu.Mods.onAimBotButtonClick),
        new Button({ sprite: this.quickMenu.ptr }, 160, -90, 'Auto Dodge', ButtonType.BLACK, -0.5, { name: Config.autoDodgeModEnabled ? 'Name1' : 'DefaultName' }, ButtonCallbacks.QuickMenu.Mods.onAutoDodgeButtonClick),
        new Button({ sprite: this.quickMenu.ptr }, 300, -90, 'Auto Charge', ButtonType.BLACK, -0.5, { name: Config.autoChargeModEnabled ? 'Name1' : 'DefaultName' }, ButtonCallbacks.QuickMenu.Mods.onAutoChargeButtonClick),
        new Button({ sprite: this.quickMenu.ptr }, 160, -45, 'Auto Spinner', ButtonType.BLACK, -0.5, { name: 'DefaultName' }, ButtonCallbacks.QuickMenu.Mods.onAutoSpinnerButtonClick),
        new Button({ sprite: this.quickMenu.ptr }, 300, -45, 'Follow Closest Ally', ButtonType.BLACK, -0.5, { name: 'DefaultName' }, ButtonCallbacks.QuickMenu.Mods.onFollowClosestAllyButtonClick),
        new Button({ sprite: this.quickMenu.ptr }, 230, 0, 'Camera Settings', ButtonType.BLACK, -0.5, { name: 'DefaultName' }, () => this.openCameraSettings())
      ];
      return;
    }
  },
  openCameraSettings() {
    this.isCameraSettingsOpen = true;
    this.mainButtons.forEach(btn => btn.hide());
    this.cameraButtons = [
      new Button({ sprite: this.quickMenu.ptr }, 230, -135, 'Back', ButtonType.BLACK, -0.5, { name: 'DefaultName' }, () => this.closeCameraSettings()),
      new Button({ sprite: this.quickMenu.ptr }, 230, -165, 'Next Camera Mode', ButtonType.BLACK, -0.3, { name: 'DefaultName' }, () => {
        if (CameraSettings.Mode === 0) {
          CameraSettings.X = 0;
          CameraSettings.Y = 0;
          CameraSettings.Mode = 4;
        } else if (CameraSettings.Mode === 4) {
          CameraSettings.X = 0;
          CameraSettings.Y = 0;
          CameraSettings.Mode = 5;
        }
      })
    ];
  },
  closeCameraSettings() {
    this.isCameraSettingsOpen = false;
    this.cameraButtons.forEach(btn => btn.hide());
    this.cameraButtons = [];
    this.mainButtons.forEach(btn => btn.reveal());
  },
  removeMenu() {
    this.isOpen = false;
    this.isCameraSettingsOpen = false;
    this.mainButtons = [];
    this.cameraButtons = [];
    this.quickMenu.remove();
  }
};
Global.QuickMenu = QuickMenu;
