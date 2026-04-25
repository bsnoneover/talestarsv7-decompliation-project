const XrayAutoshoot = {
  addInputIC: null,
  othersIC: null,
  gameStartIC: null,
  selectedId: null,
  duelsCheck: false,
  duelsCheck2: false,
  isDuels: false,
  xRayTargetSet: false,
  xRayMode: 0,
  attachGameOverBool: true,
  attachGameModeBool: true,
  attachGameStart() {
    if (this.gameStartIC) {
      return;
    }
    const self = this;
    this.gameStartIC = Interceptor.attach(Offsets.libg.StartLoadingMessage.ctor, {
      onEnter() {
        setTimeout(function () {
          self.selectedId = null;
        }, 500);
      }
    });
  },
  attachOthers() {
    if (this.othersIC) {
      return;
    }
    const self = this;
    this.othersIC = Interceptor.attach(Offsets.libg.StringTable.getString, {
      onEnter(args) {
        if (A.activated === 0 || !Config.xRayModEnabled) {
          return;
        }
        const stringValue = args[0].readUtf8String();

        if (self.attachGameOverBool && stringValue === 'TID_GAME_OVER') {
          setTimeout(function () {
            self.selectedId = null;
          }, 500);
          self.attachGameOverBool = false;
        }

        if (self.attachGameModeBool && stringValue === 'TID_GAME_MODE_24') {
          self.duelsCheck = true;
          setTimeout(function () {
            if (self.duelsCheck2) {
              self.isDuels = true;
            }
            self.duelsCheck = false;
          }, 300);
        }
      }
    });
  },
  attachAddInput() {
    if (this.addInputIC) {
      return;
    }
    const self = this;
    this.addInputIC = Interceptor.attach(Offsets.libg.ClientInputManager.addInput, {
      onEnter(args) {
        if (A.activated === 0 || !Config.xRayModEnabled) {
          return;
        }
        const inputType = args[1].add(20).readU8();
        const actionType = args[1].add(4).readInt();

        if (inputType !== 1 || actionType !== 0) {
          return;
        }

        const targetId = args[1].add(16).readInt();

        if (self.isDuels) {
          self.handleDuelsTargetSelection(args, targetId);
        } else {
          if (targetId >= 1000000 && self.selectedId !== targetId) {
            self.selectedId = targetId;
          }
          if (self.selectedId !== null) {
            args[1].add(16).writeInt(self.selectedId);
          }
        }
      }
    });
  },

  handleDuelsTargetSelection(args, targetId) {
    const ownId = getOwnGlobalID();

    if (ownId === 1000001) {
      this.selectedId = 1000000;
      this.xRayMode = 0;
    } else if (ownId === 1000000) {
      this.selectedId = 1000001;
      this.xRayMode = 1;
    } else if (this.xRayMode === 1) {
      this.selectedId = ownId + 1;
    } else {
      this.selectedId = ownId - 1;
    }

    if (!this.xRayTargetSet) {
      Offsets.libg.GUI.showFloater_helper(Localization.xrayTargetSelected);
      this.xRayTargetSet = true;
    }

    if (this.selectedId !== null) {
      args[1].add(16).writeInt(this.selectedId);
    }
  },
  attachAll() {
    this.attachAddInput();
    this.attachGameStart();
    this.attachOthers();
  },
  update() {
    this.attachAll();
  }
};

module.exports = { XrayAutoshoot };
