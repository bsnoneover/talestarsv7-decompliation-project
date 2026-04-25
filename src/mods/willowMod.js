const WillowMod = {
  updateIC: null,
  superButton: null,
  gadgetButton: null,
  gadgetInput() {
    const input = malloc(50);
    const clientInput = Offsets.libg.ClientInput.ctor(input, 8);
    Offsets.libg.ClientInputManager.addInput(Offsets.libg.BattleMode.getInstance(clientInput).add(88).readPointer(), input);
  },
  superInput() {
    const input = malloc(50);
    const clientInput = Offsets.libg.ClientInput.ctor(input, 1);
    Offsets.libg.ClientInputManager.addInput(Offsets.libg.BattleMode.getInstance(clientInput).add(88).readPointer(), input);
  },
  getXPosition() {
    const stage = Offsets.libg.Stage.instance.readPointer();
    if (!stage || stage.isNull?.()) {
      return 0;
    }
    const scale = 0.1;
    const offsetX = stage.add(88).readFloat();
    const offsetY = stage.add(84).readFloat();
    return stage.add(7376).readInt() - (offsetY + offsetX) / scale - 40;
  },
  attachUpdate() {
    if (this.updateIC) {
      return;
    }
    this.updateIC = Interceptor.attach(Offsets.libg.LogicBattleModeClient.update, {
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

module.exports = { WillowMod };
