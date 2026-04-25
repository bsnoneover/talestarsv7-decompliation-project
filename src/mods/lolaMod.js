const LolaMod = {
  inputInterval: null,
  startButton: null,
  stopButton: null,
  sendInput() {
    const input = malloc(50);
    const clientInput = Offsets.libg.ClientInput.ctor(input, 3);
    Offsets.libg.ClientInputManager.addInput(Offsets.libg.BattleMode.getInstance(clientInput).add(88).readPointer(), input);
  },
  startInput() {
    if (this.inputInterval) {
      clearInterval(this.inputInterval);
      this.inputInterval = null;
    }
    const self = this;
    this.inputInterval = setInterval(function () {
      self.sendInput();
    }, 60);
  },
  stopInput() {
    if (this.inputInterval) {
      clearInterval(this.inputInterval);
      this.inputInterval = null;
    }
  },
  getX() {
    const stage = Offsets.libg.Stage.instance.readPointer();
    if (!stage || stage.isNull?.()) {
      return 0;
    }
    const scale = 0.1;
    const offsetX = stage.add(88).readFloat();
    const offsetY = stage.add(84).readFloat();
    return stage.add(7376).readInt() - (offsetY + offsetX) / scale - 40;
  },
  createButtons() {
    const self = this;

    if (!this.startButton) {
      this.startButton = new Button({ isStage: true }, this.getX(), 220, '[LOLA] Start', ButtonType.MAP_EDITOR_EXIT_BUTTON, 0, null,
        function () {
          self.startInput();
        }
      );
    }

    if (!this.stopButton) {
      this.stopButton = new Button({ isStage: true }, this.getX(), 280, '[LOLA] Stop', ButtonType.MAP_EDITOR_EXIT_BUTTON, 0, null,
        function () {
          self.stopInput();
        }
      );
    }
  },
  attachUpdate() {
    Interceptor.attach(Offsets.libg.LogicBattleModeClient.update, {
      onEnter(args) {
        const battleMode = args[0];
        if (!battleMode || battleMode.isNull?.()) {
          return;
        }
        const ownCharacter = Offsets.libg.LogicBattleModeClient.getOwnCharacter(battleMode);
        if (!ownCharacter || ownCharacter.isNull?.()) {
          return;
        }
        const characterData = Offsets.libg.LogicCharacterClient.getCharacterData(ownCharacter);
        if (!characterData || characterData.isNull?.()) {
          return;
        }
        const namePtr = Offsets.libg.LogicData.getName(characterData);
        if (!namePtr || namePtr.isNull?.()) {
          return;
        }
        const characterName = StringUtils.readStringFromStringObject(namePtr);
      }
    });
  },
  attachExitHandler() {
    const self = this;
    Interceptor.attach(Offsets.libg.BattleScreen.exit, {
      onLeave() {
        if (self.superButton) {
          self.superButton.remove();
          self.superButton = null;
        }
        if (self.gadgetButton) {
          self.gadgetButton.remove();
          self.gadgetButton = null;
        }
        if (self.updateIC) {
          self.updateIC.detach();
          self.updateIC = null;
        }
        self.attachUpdate();
      }
    });
  },
  update() {
    this.attachUpdate();
    this.attachExitHandler();
  }
};

module.exports = { LolaMod };
