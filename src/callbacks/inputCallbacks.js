const InputCallbacks = {
  onUnlockSkinInput(input) {
    if (!input || input.length === 0) {
      Offsets.libg.GUI.showFloater_helper(Localization.invalidSkin);
      return;
    }

    let selectedMapping = AssetsManager.SkinMappings.EN;

    for (const [langCode, mapping] of Object.entries(AssetsManager.SkinMappings)) {
      const currentLang = Offsets.libg.StringTable.getCurrentLanguageCode();
      const langPtr = StringUtils.getStrPtr(langCode);

      if (Offsets.libg.String.equals(currentLang, langPtr)) {
        selectedMapping = mapping;
        break;
      }
    }

    const match = Mods.SkinChanger.findClosestMatch(input, selectedMapping);

    if (match) {
      Mods.SkinChanger.writeCsv(AssetsManager.Files.Paths.skinsCsvPath, AssetsManager.Files.Paths.skinsCsvPath, match, match);
      Mods.SkinChanger.writeCsv(AssetsManager.Files.Paths.skinConfsCsvPath, AssetsManager.Files.Paths.skinConfsCsvPath, match, match);

      Mods.SkinChanger.isSkinUnlocked = true;
      Offsets.libg.GUI.showFloater_helper(Localization.skinUnlocked + input);
      return;
    }

    Offsets.libg.GUI.showFloater_helper(Localization.invalidSkin);
  },

  onSpectateWithIDInput(input) {
    return input.startsWith('#') ? input : `#${input}`;
  },

  onSetSpamTextInput(input) {
    Mods.ChatSpam.ChatSpamText = input;
  },

  onInviteByIDInput(input) {
    return input.startsWith('#') ? input : `#${input}`;
  },

  onOpenCustomUrlInput(input) {
    Offsets.libg.SimpleWebView.showSimpleWebView(input, input);
  },

  onSetNameInput(input) {
    if (!input || input.length < 1) {
      Offsets.libg.GUI.showFloater_helper(Localization.setNameFailed);
      return;
    }

    Config.selectedName = input;
    TaleConfig.saveConfig();

    NameChanger.addName(AccountInfo.TAG, Config.selectedName);
    Offsets.libg.GameMain.reload();
  }
};

Global.InputCallbacks = InputCallbacks;

module.exports = { InputCallbacks };