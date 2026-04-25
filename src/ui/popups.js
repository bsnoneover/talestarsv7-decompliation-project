const Popups = {
  ModMenuPopup: {
    selectedPage: 1,
    pageCount: 4,
    buttons: [],
    create() {
      if (A.isInEarlyAccess !== 0) {
        if (A.activated === 0) {
          Offsets.libg.GUI.showFloater_helper(
            'Tale Stars is currently in early access, so for a few days only Plus users can play the mod'
          );
          return Popups.ActivationPopup.create();
        }
      }
      const ROW_Y = [-95, -30, 35, 90];
      const COL_X = [-220, -75, 70, 215];
      const popup = new Popup('MOD MENU', PopupType.NORMAL);
      this.selectedPage = 1;
      new Button({ sprite: popup.ptr }, 380, -462, '', ButtonType.INFO, null, null, function () { });
      new Button({ sprite: popup.ptr }, -295, -208, '', ButtonType.SETTINGS, -0.1, null, ButtonCallbacks.onSettingsButtonClick);
      const page1Buttons = [
        new Button({ sprite: popup.ptr }, COL_X[0], ROW_Y[0], 'X-RAY AUTOSHOOT', Config.xRayModEnabled ? ButtonType.NORMAL_SELECTED : ButtonType.NORMAL, -0.17, { name: 'Golden' }, ButtonCallbacks.ModMenuPopup_Page1.onXrayAutoshootButtonClick),
        new Button({ sprite: popup.ptr }, COL_X[1], ROW_Y[0], 'AIM BOT', Config.aimBotModEnabled ? ButtonType.NORMAL_SELECTED : ButtonType.NORMAL, -0.17, { name: 'Golden' }, ButtonCallbacks.ModMenuPopup_Page1.onAimBotButtonClick),
        new Button({ sprite: popup.ptr }, COL_X[2], ROW_Y[0], 'AUTO DODGE', Config.autoDodgeModEnabled ? ButtonType.NORMAL_SELECTED : ButtonType.NORMAL, -0.17, { name: 'Golden' }, ButtonCallbacks.ModMenuPopup_Page1.onAutoDodgeButtonClick),
        new Button({ sprite: popup.ptr }, COL_X[3], ROW_Y[0], 'AUTO CHARGE', Config.autoChargeModEnabled ? ButtonType.NORMAL_SELECTED : ButtonType.NORMAL, -0.17, { name: 'Golden' }, ButtonCallbacks.ModMenuPopup_Page1.onAutoChargeButtonClick),
        new Button({ sprite: popup.ptr }, COL_X[0], ROW_Y[1], 'BATTLE SERVER CHANGER', ButtonType.NORMAL, -0.17, null, ButtonCallbacks.ModMenuPopup_Page1.onBattleServerChangerButtonClick),
        new Button({ sprite: popup.ptr }, COL_X[1], ROW_Y[1], 'CHROMATIC NAME', Config.chromaticNameEnabled ? ButtonType.NORMAL_SELECTED : ButtonType.NORMAL, -0.17, null, ButtonCallbacks.ModMenuPopup_Page1.onChromaticNameButtonClick),
        new Button({ sprite: popup.ptr }, COL_X[2], ROW_Y[1], 'UNLOCK ALL EMOTES', Config.csvMods.unlockAllEmotesModEnabled ? ButtonType.NORMAL_SELECTED : ButtonType.NORMAL, -0.17, null, ButtonCallbacks.ModMenuPopup_Page1.onUnlockAllEmotesButtonClick),
        new Button({ sprite: popup.ptr }, COL_X[3], ROW_Y[1], 'SHOW ENEMY AMMO', Config.showEnemyAmmoModEnabled ? ButtonType.NORMAL_SELECTED : ButtonType.NORMAL, -0.17, null, ButtonCallbacks.ModMenuPopup_Page1.onShowEnemyAmmoButtonClick),
        new Button({ sprite: popup.ptr }, COL_X[0], ROW_Y[2], 'NANI ULTI MOD', Config.csvMods.naniUltiModEnabled ? ButtonType.NORMAL_SELECTED : ButtonType.NORMAL, -0.17, null, ButtonCallbacks.ModMenuPopup_Page1.onNaniUltiModButtonClick),
        new Button({ sprite: popup.ptr }, COL_X[1], ROW_Y[2], 'WILLOW MOD', Config.willowModEnabled ? ButtonType.NORMAL_SELECTED : ButtonType.NORMAL, -0.17, { name: 'SubwaySurfersRainbow' }, ButtonCallbacks.ModMenuPopup_Page1.onWillowModButtonClick),
        new Button({ sprite: popup.ptr }, COL_X[2], ROW_Y[2], 'LOLA MOD', Config.lolaModEnabled ? ButtonType.NORMAL_SELECTED : ButtonType.NORMAL, -0.17, { colors: [4288423167, 4278255547, 4294901985], speed: 0.5, scale: 1 }, ButtonCallbacks.ModMenuPopup_Page1.onLolaModButtonClick),
        new Button({ sprite: popup.ptr }, COL_X[3], ROW_Y[2], 'SKIN CHANGER', ButtonType.NORMAL, -0.17, null, ButtonCallbacks.ModMenuPopup_Page1.onSkinChangerButtonClick)
      ];
      const page2Buttons = [
        new Button({ sprite: popup.ptr }, COL_X[0], ROW_Y[0], 'RANKED MOD', Config.csvMods.rankedRanksModEnabled ? ButtonType.NORMAL_SELECTED : ButtonType.NORMAL, -0.17, null, ButtonCallbacks.ModMenuPopup_Page2.onRankedModButtonClick),
        new Button({ sprite: popup.ptr }, COL_X[1], ROW_Y[0], 'SET FPS', ButtonType.NORMAL, -0.17, null, ButtonCallbacks.ModMenuPopup_Page2.onSetFPSButtonClick),
        new Button({ sprite: popup.ptr }, COL_X[2], ROW_Y[0], 'ANTI AUTO SUPER', Config.antiAutoSuperModEnabled ? ButtonType.NORMAL_SELECTED : ButtonType.NORMAL, -0.17, null, ButtonCallbacks.ModMenuPopup_Page2.onAntiAutoSuperButtonClick),
        new Button({ sprite: popup.ptr }, COL_X[3], ROW_Y[0], 'HIDE ULTI AIMING', Config.hideUltiAimingModEnabled ? ButtonType.NORMAL_SELECTED : ButtonType.NORMAL, -0.17, null, ButtonCallbacks.ModMenuPopup_Page2.onHideUltiAimingButtonClick),
        new Button({ sprite: popup.ptr }, COL_X[0], ROW_Y[1], 'EMPTY PIN', Config.emptyPinModEnabled ? ButtonType.NORMAL_SELECTED : ButtonType.NORMAL, -0.17, null, ButtonCallbacks.ModMenuPopup_Page2.onEmptyPinButtonClick),
        new Button({ sprite: popup.ptr }, COL_X[1], ROW_Y[1], 'BATTLE CARD MOD', Config.csvMods.battleCardModEnabled ? ButtonType.NORMAL_SELECTED : ButtonType.NORMAL, -0.17, null, ButtonCallbacks.ModMenuPopup_Page2.onBattleCardModButtonClick),
        new Button({ sprite: popup.ptr }, COL_X[2], ROW_Y[1], 'SPECTATORS MENU', ButtonType.NORMAL, -0.17, null, ButtonCallbacks.ModMenuPopup_Page2.onSpectatorsMenuButtonClick),
        new Button({ sprite: popup.ptr }, COL_X[3], ROW_Y[1], 'SEE SELECTED BRAWLERS', Config.seeSelectedBrawlersModEnabled ? ButtonType.NORMAL_SELECTED : ButtonType.NORMAL, -0.17, null, ButtonCallbacks.ModMenuPopup_Page2.onSeeSelectedBrawlersButtonClick),
        new Button({ sprite: popup.ptr }, COL_X[0], ROW_Y[2], 'STATUS CHANGER', ButtonType.NORMAL, -0.17, null, ButtonCallbacks.ModMenuPopup_Page2.onStatusChangerButtonClick),
        new Button({ sprite: popup.ptr }, COL_X[1], ROW_Y[2], 'ANTI AUTOSHOOT', Config.antiAutoshootModEnabled ? ButtonType.NORMAL_SELECTED : ButtonType.NORMAL, -0.17, null, ButtonCallbacks.ModMenuPopup_Page2.onAntiAutoshootButtonClick),
        new Button({ sprite: popup.ptr }, COL_X[2], ROW_Y[2], 'MAP MAKER MOD', Config.csvMods.tilesModEnabled ? ButtonType.NORMAL_SELECTED : ButtonType.NORMAL, -0.17, null, ButtonCallbacks.ModMenuPopup_Page2.onMapMakerModButtonClick),
        new Button({ sprite: popup.ptr }, COL_X[3], ROW_Y[2], 'NAME CHANGER', ButtonType.NORMAL, -0.17, null, ButtonCallbacks.ModMenuPopup_Page2.onNameChangerButtonClick)
      ];
      const page3Buttons = [
        new Button({ sprite: popup.ptr }, COL_X[0], ROW_Y[0], 'SPECTATE WITH ID', ButtonType.NORMAL, -0.17, null, ButtonCallbacks.ModMenuPopup_Page3.onSpectateWithIDButtonClick),
        new Button({ sprite: popup.ptr }, COL_X[1], ROW_Y[0], 'RANDOM SPRAY SPAM', Config.randomSpraySpamModEnabled ? ButtonType.NORMAL_SELECTED : ButtonType.NORMAL, -0.17, null, ButtonCallbacks.ModMenuPopup_Page3.onRandomSpraySpamButtonClick),
        new Button({ sprite: popup.ptr }, COL_X[2], ROW_Y[0], 'CHAT SPAM', ButtonType.NORMAL, -0.17, null, ButtonCallbacks.ModMenuPopup_Page3.onChatSpamButtonClick),
        new Button({ sprite: popup.ptr }, COL_X[3], ROW_Y[0], 'DECREASED COOLDOWN', Config.csvMods.decreasedCooldownModEnabled ? ButtonType.NORMAL_SELECTED : ButtonType.NORMAL, -0.17, null, ButtonCallbacks.ModMenuPopup_Page3.onDecreasedCooldownButtonClick),
        new Button({ sprite: popup.ptr }, COL_X[0], ROW_Y[1], 'ANTI AFK', Config.antiAfkModEnabled ? ButtonType.NORMAL_SELECTED : ButtonType.NORMAL, -0.17, null, ButtonCallbacks.ModMenuPopup_Page3.onAntiAFKButtonClick),
        new Button({ sprite: popup.ptr }, COL_X[1], ROW_Y[1], 'REMOVE BLACK BORDERS', Config.removeBlackbordersModEnabled ? ButtonType.NORMAL_SELECTED : ButtonType.NORMAL, -0.17, null, ButtonCallbacks.ModMenuPopup_Page3.onRemoveBlackBordersButtonClick),
        new Button({ sprite: popup.ptr }, COL_X[2], ROW_Y[1], 'INVITE BY ID', ButtonType.NORMAL, -0.17, null, ButtonCallbacks.ModMenuPopup_Page3.onInviteByIDButtonClick),
        new Button({ sprite: popup.ptr }, COL_X[3], ROW_Y[1], 'FONT CHANGER', ButtonType.NORMAL, -0.17, null, ButtonCallbacks.ModMenuPopup_Page3.onFontChangerButtonClick),
        new Button({ sprite: popup.ptr }, COL_X[0], ROW_Y[2], 'URL MENU', ButtonType.NORMAL, -0.17, null, ButtonCallbacks.ModMenuPopup_Page3.onUrlMenuButtonClick),
        new Button({ sprite: popup.ptr }, COL_X[1], ROW_Y[2], 'MOD SETTINGS', ButtonType.NORMAL, -0.17, null, ButtonCallbacks.ModMenuPopup_Page3.onModSettingsButtonClick),
        new Button({ sprite: popup.ptr }, COL_X[2], ROW_Y[2], 'HELP', ButtonType.NORMAL, -0.17, null, ButtonCallbacks.ModMenuPopup_Page3.onHelpButtonClick),
        new Button({ sprite: popup.ptr }, COL_X[3], ROW_Y[2], 'OPTIMIZE GAME', Config.csvMods.optimizeGameEnabled ? ButtonType.NORMAL_SELECTED : ButtonType.NORMAL, -0.17, null, ButtonCallbacks.ModMenuPopup_Page3.onOptimizeGameButtonClick)
      ];
      const page4Buttons = [
        new Button({ sprite: popup.ptr }, COL_X[0], ROW_Y[0], 'ANTI CENSOR', Config.antiCensorModEnabled ? ButtonType.NORMAL_SELECTED : ButtonType.NORMAL, -0.17, null, ButtonCallbacks.ModMenuPopup_Page4.onAntiCensorButtonClick),
        new Button({ sprite: popup.ptr }, COL_X[1], ROW_Y[0], 'THEME CHANGER', ButtonType.NORMAL, -0.17, null, ButtonCallbacks.ModMenuPopup_Page4.onThemeChangerButtonClick),
        new Button({ sprite: popup.ptr }, COL_X[2], ROW_Y[0], 'STATIC BACKGROUND', Config.staticBackgroundEnabled ? ButtonType.NORMAL_SELECTED : ButtonType.NORMAL, -0.17, null, ButtonCallbacks.ModMenuPopup_Page4.onStaticBackgroundButtonClick),
        new Button({ sprite: popup.ptr }, COL_X[3], ROW_Y[0], 'RELOAD GAME', ButtonType.NORMAL, -0.17, null, ButtonCallbacks.ModMenuPopup_Page4.onReloadGameButtonClick),
        new Button({ sprite: popup.ptr }, COL_X[0], ROW_Y[1], 'AUTO PLAY AGAIN', Config.autoPlayAgainModEnabled ? ButtonType.NORMAL_SELECTED : ButtonType.NORMAL, -0.17, null, ButtonCallbacks.ModMenuPopup_Page4.onAutoPlayAgainButtonClick)
      ];
      this.buttons = [page1Buttons, page2Buttons, page3Buttons, page4Buttons];
      for (let i = 1; i < this.pageCount; i++) {
        this.buttons[i].forEach(btn => btn.hide());
      }
      const pageText = new Text({ sprite: popup.ptr }, -40, ROW_Y[2] + 40, `Page ${this.selectedPage}/${this.pageCount}`, 1.5);
      const nextPageBtn = new Button({ sprite: popup.ptr }, 220, ROW_Y[3] + 30, 'Next Page', ButtonType.NORMAL_SELECTED, -0.17, null, () => this.nextPage(pageText, nextPageBtn, prevPageBtn));
      const prevPageBtn = new Button({ sprite: popup.ptr }, -220, ROW_Y[3] + 30, 'Previous Page', ButtonType.NORMAL, -0.17, null, () => this.previousPage(pageText, nextPageBtn, prevPageBtn));
      return popup;
    },
    nextPage(pageText, nextBtn, prevBtn) {
      if (this.selectedPage < this.pageCount) {
        this.buttons[this.selectedPage - 1].forEach(btn => btn.hide());
        this.selectedPage++;
        this.buttons[this.selectedPage - 1].forEach(btn => btn.reveal());
        pageText.setText(`Page ${this.selectedPage}/${this.pageCount}`);
        if (this.selectedPage === this.pageCount) {
          nextBtn.hide();
        }
        prevBtn.reveal();
      }
    },
    previousPage(pageText, nextBtn, prevBtn) {
      if (this.selectedPage > 1) {
        this.buttons[this.selectedPage - 1].forEach(btn => btn.hide());
        this.selectedPage--;
        this.buttons[this.selectedPage - 1].forEach(btn => btn.reveal());
        pageText.setText(`Page ${this.selectedPage}/${this.pageCount}`);
        if (this.selectedPage === 1) {
          prevBtn.hide();
        }
        nextBtn.reveal();
      }
    }
  },
  ModSettingsPopup: {
    create() {
      const popup = new Popup(Localization.modSettings, PopupType.SMALL);
      new Button({ sprite: popup.ptr }, -135, -85, Localization.modMenuButton, ButtonType.NORMAL, 0.36, null, ButtonCallbacks.ModSettingsPopup.onModMenuButtonSettingsButtonClick);
      new Button({ sprite: popup.ptr }, 110, -85, Localization.versionInfo, ButtonType.NORMAL, 0.36, null, ButtonCallbacks.ModSettingsPopup.onVersionInfoButtonClick);
      return popup;
    }
  },
  ModMenuButtonSettingsPopup: {
    create() {
      const popup = new Popup(Localization.modMenuSettings, PopupType.SMALL);
      new Button({ sprite: popup.ptr }, -140, -95, Localization.modMenuColor, ButtonType.NORMAL, 0.36, null, ButtonCallbacks.ModSettingsPopup.ModMenuButtonSettingsPopup.onModMenuButtonSetColorButtonClick);
      new Button({ sprite: popup.ptr }, 120, -95, Localization.modMenuPosition, ButtonType.NORMAL, 0.36, null, ButtonCallbacks.ModSettingsPopup.ModMenuButtonSettingsPopup.onModMenuButtonSetPositionButtonClick);
      return popup;
    }
  },
  ModMenuButtonSetPositionPopup: {
    create() {
      const popup = new Popup(Localization.modMenuPosition, PopupType.SMALL);
      new Button({ sprite: popup.ptr }, -140, -115, Localization.topLeft, ButtonType.NORMAL, 0.45, null, ButtonCallbacks.ModSettingsPopup.ModMenuButtonSettingsPopup.ModMenuButtonSetPositionPopup.onSetPosition);
      new Button({ sprite: popup.ptr }, -140, 5, Localization.bottomLeft, ButtonType.NORMAL, 0.45, null, ButtonCallbacks.ModSettingsPopup.ModMenuButtonSettingsPopup.ModMenuButtonSetPositionPopup.onSetPosition);
      new Button({ sprite: popup.ptr }, 120, -115, Localization.topRight, ButtonType.NORMAL, 0.45, null, ButtonCallbacks.ModSettingsPopup.ModMenuButtonSettingsPopup.ModMenuButtonSetPositionPopup.onSetPosition);
      new Button({ sprite: popup.ptr }, 120, 5, Localization.bottomRight, ButtonType.NORMAL, 0.45, null, ButtonCallbacks.ModSettingsPopup.ModMenuButtonSettingsPopup.ModMenuButtonSetPositionPopup.onSetPosition);
      return popup;
    }
  },
  ModMenuButtonSetColorPopup: {
    create() {
      const popup = new Popup(Localization.modMenuColor, PopupType.BIG);
      new Text({ sprite: popup.ptr }, -20, -155, 'Red', 2.5);
      new Text({ sprite: popup.ptr }, -30, -65, 'Green', 2.5);
      new Text({ sprite: popup.ptr }, -20, 25, 'Blue', 2.5);
      const previewBtn = new Button({ sprite: popup.ptr }, 0, 160, 'MOD MENU', ButtonType.MAP_EDITOR_EXIT_BUTTON, 0.5, null);
      if (Config.modMenuColorRGB === null) {
        new Slider({ sprite: popup.ptr }, 0, -90, 255, '', true, Config.modMenuColorRGB[0] == null ? 255 : Config.modMenuColorRGB[0], function (val) { Config.modMenuColorRGB[0] = +val; IsConfigUpdated = true; previewBtn.setColor(Config.modMenuColorRGB); }, 1.2);
        new Slider({ sprite: popup.ptr }, 0, 0, 255, '', true, Config.modMenuColorRGB[1] == null ? 255 : Config.modMenuColorRGB[1], function (val) { Config.modMenuColorRGB[1] = +val; IsConfigUpdated = true; previewBtn.setColor(Config.modMenuColorRGB); }, 1.2);
        new Slider({ sprite: popup.ptr }, 0, 90, 255, '', true, Config.modMenuColorRGB[2] == null ? 255 : Config.modMenuColorRGB[2], function (val) { Config.modMenuColorRGB[2] = +val; IsConfigUpdated = true; previewBtn.setColor(Config.modMenuColorRGB); }, 1.2);
        return popup;
      }
    }
  },
  BattleServerChangerPopup_Regions: {
    create() {
      const regions = ['EU', 'NA', 'SA', 'AP', 'ME'];
      const popup = new Popup(Localization.selectRegion, PopupType.NORMAL, { type: 'remove' });
      for (let i = 0; i < regions.length; i++) {
        const x = ((i * 195) % 3) - 200;
        const y = Math.floor(i / 3) * 70 - 95;
        new Button({ sprite: popup.ptr }, x, y, regions[i], ButtonType.NORMAL, 0, null, ButtonCallbacks.BattleServerChanger.onSelectRegion);
      }
      return popup;
    }
  },
  BattleServerChangerPopup_BattleServersByRegions: {
    create(region) {
      try {
        const latencyResults = Mods.BattleServerChanger.getLatencyResults();
        const popup = new Popup(region + ' SERVERS', PopupType.BIG);
        const servers = Object.values(latencyResults)
          .filter(result => result.name.startsWith(region))
          .sort((a, b) => a.msecs - b.msecs);
        const startX = -250;
        const colStep = 165;
        const startY = -160;
        const rowStep = 70;
        new Button({ sprite: popup.ptr }, startX, startY, Localization.resetText, ButtonType.NORMAL, -0.11, null, ButtonCallbacks.BattleServerChanger.onReset);
        for (let idx = 0; idx < servers.length; idx++) {
          const btnType = Config.selectedBattleServer === servers[idx].name ? ButtonType.NORMAL_SELECTED : ButtonType.NORMAL;
          const row = idx < 3 ? 0 : Math.floor((idx - 3) / 4) + 1;
          const col = idx < 3 ? idx + 1 : (idx - 3) % 4;
          const x = startX + colStep * col;
          const y = startY + rowStep * row;
          new Button({ sprite: popup.ptr }, x, y, `${servers[idx].name} (${servers[idx].msecs}ms)`, btnType, -0.11, null, ButtonCallbacks.BattleServerChanger.onSelectServer);
        }
        return popup;
      } catch (_) {
        return;
      }
    }
  },
  ThemeChangerPopup: {
    Themes: [
      { id: 41000145, text: 'Berlin' },
      { id: 41000146, text: 'New York' },
      { id: 41000148, text: 'Brawloween 2025' },
      { id: 41000149, text: 'MoonFestival 2025' },
      { id: 41000144, text: 'Tokyo' },
      { id: 41000139, text: 'Fantasy' },
      { id: 41000151, text: 'Mina' },
      { id: 41000143, text: 'Rio' }
    ],
    create() {
      const popup = new Popup('THEME CHANGER', PopupType.NORMAL);
      new Button({ sprite: popup.ptr }, -200, -95, Localization.resetText, ButtonType.NORMAL, 0, null, ButtonCallbacks.ThemeChanger.onReset);
      for (let i = 0; i < this.Themes.length; i++) {
        const btnType = Config.selectedTheme === this.Themes[i].id ? ButtonType.NORMAL_SELECTED : ButtonType.NORMAL;
        const y = (i < 2 ? 0 : Math.floor((i - 2) / 3) + 1) * 70 - 95;
        const x = (i < 2 ? i + 1 : (i - 2) % 3) * 195 - 200;
        const btn = new Button({ sprite: popup.ptr }, x, y, this.Themes[i].text, btnType, 0, null, () => ButtonCallbacks.ThemeChanger.onSelectTheme(btn, this.Themes[i].id));
      }
      return popup;
    }
  },
  SpectatorsMenuPopup: {
    create() {
      const popup = new Popup('SPECTATORS MENU', PopupType.NORMAL);
      new Text({ sprite: popup.ptr }, -190, -110, Localization.spectatorsOnlyVisibleToYou, 1.5);
      new Button({ sprite: popup.ptr }, -200, -40, Localization.sendSpectate, ButtonType.NORMAL, 0.07, null, ButtonCallbacks.SpectatorsMenu.onSetSpectatorsButtonClick);
      if (!Config.spectateEveryMatchAsBrawltv) {
        new Button({ sprite: popup.ptr }, -5, -40, Localization.spectateEveryMatchAsBrawltv, Config.spectateEveryMatchAsBrawltv ? ButtonType.NORMAL_SELECTED : ButtonType.NORMAL, 0.07, null, ButtonCallbacks.SpectatorsMenu.onSpectateEveryMatchAsBrawltvButtonClick);
        new Button({ sprite: popup.ptr }, 190, -40, Localization.resetTextBigLetter, ButtonType.NORMAL, 0.07, null, ButtonCallbacks.SpectatorsMenu.onReset);
        return popup;
      }
    }
  },
  SetSpectatorsPopup: {
    create() {
      let count = null;
      const popup = new Popup(Localization.setSpectatorsCount, PopupType.SMALL);
      new Slider({ sprite: popup.ptr }, 0, -80, 150000, 'max', false, Mods.VisualSpectators.count, val => { count = val; }, 1);
      new Button({ sprite: popup.ptr }, 0, 10, Localization.sendSpectate, ButtonType.NORMAL, 0.07, null, () => ButtonCallbacks.SpectatorsMenu.onSetSpectators(null, count));
      return popup;
    }
  },
  StatusChangerPopup: {
    Statuses: [
      { id: 1, TID: 'TID_TEAM_MEMBER_STATUS_1' },
      { id: 2, TID: 'TID_TEAM_MEMBER_STATUS_2' },
      { id: 3, TID: 'TID_TEAM_MEMBER_STATUS_3' },
      { id: 4, TID: 'TID_TEAM_MEMBER_STATUS_4' },
      { id: 5, TID: 'TID_TEAM_MEMBER_STATUS_5' },
      { id: 16, TID: 'TID_TEAM_MEMBER_STATUS_16' },
      { id: 7, TID: 'TID_TEAM_MEMBER_STATUS_7' },
      { id: 8, TID: 'TID_TEAM_MEMBER_STATUS_8' },
      { id: 9, TID: 'TID_TEAM_MEMBER_STATUS_9' },
      { id: 10, TID: 'TID_TEAM_MEMBER_STATUS_10' },
      { id: 15, TID: 'TID_TEAM_MEMBER_STATUS_15' },
      { id: 14, TID: 'TID_TEAM_MEMBER_STATUS_14' }
    ],
    create() {
      const colX = [-220, -75, 70, 215];
      const rowY = [-95, -30, 35];
      let statusIdx = 0;
      const popup = new Popup('STATUS CHANGER', PopupType.NORMAL);
      for (let row = 0; row < rowY.length; row++) {
        let col = 0;
        while (col < colX.length) {
          if (statusIdx < this.Statuses.length) {
            const status = this.Statuses[statusIdx];
            const x = colX[col];
            const y = rowY[row];
            const label = StringUtils.getTID(status.TID).match(/<c[^>]*>(.*?)<\/c>/)[1];
            const btnType = ButtonType.NORMAL;
            const btn = new Button({ sprite: popup.ptr }, x, y, label, btnType, -0.17, null, () => ButtonCallbacks.StatusChanger.onSelectStatus(btn, status.id));
            statusIdx++;
            col++;
            continue;
          }
          break;
        }
      }
      return popup;
    }
  },
  ChatSpamPopup: {
    create() {
      const popup = new Popup('CHAT SPAM', PopupType.SMALL);
      new Button({ sprite: popup.ptr }, -120, 0, Localization.setSpamText, ButtonType.NORMAL, 0.35, null, ButtonCallbacks.ChatSpam.onSetSpamTextButtonClick);
      if (Mods.ChatSpam.IsChatSpamStarted) {
        new Button({ sprite: popup.ptr }, 125, 0, Mods.ChatSpam.IsChatSpamStarted ? Localization.chatSpamStop : Localization.chatSpamStart, Mods.ChatSpam.IsChatSpamStarted ? ButtonType.NORMAL : ButtonType.NORMAL_SELECTED, 0.35, null, ButtonCallbacks.ChatSpam.onStartOrStopButtonClick);
        return popup;
      }
    }
  },
  FontChangerPopup: {
    Fonts: [
      { url: 'Fortnite.ttf', text: 'Fortnite' },
      { url: 'Nougat.ttf', text: 'Nougat' },
      { url: 'SupercellMagic.ttf', text: 'Supercell-Magic' },
      { url: 'Minecraft.ttf', text: 'Minecraft' },
      { url: 'SquadBusters.ttf', text: 'Squad Busters' },
      { url: 'GtaSan.ttf', text: 'Gta San' }
    ],
    create() {
      const popup = new Popup('FONT CHANGER', PopupType.NORMAL);
      new Button({ sprite: popup.ptr }, -200, -95, Localization.resetText, ButtonType.NORMAL, 0, null, ButtonCallbacks.FontChanger.onReset);
      for (let i = 0; i < this.Fonts.length; i++) {
        const btnType = Config.selectedFont === this.Fonts[i].url ? ButtonType.NORMAL_SELECTED : ButtonType.NORMAL;
        const y = (i < 2 ? 0 : Math.floor((i - 2) / 3) + 1) * 70 - 95;
        const x = (i < 2 ? i + 1 : (i - 2) % 3) * 195 - 200;
        const btn = new Button({ sprite: popup.ptr }, x, y, this.Fonts[i].text, btnType, 0, null, () => ButtonCallbacks.FontChanger.onSelectFont(btn, this.Fonts[i].url));
      }
      return popup;
    }
  },
  UrlMenuPopup: {
    create() {
      const popup = new Popup('URL MENU', PopupType.NORMAL);
      new Text({ sprite: popup.ptr }, -250, -130, Localization.customUrls, 1.5);
      new Text({ sprite: popup.ptr }, -250, -20, Localization.accountStats, 1.5);
      new Button({ sprite: popup.ptr }, -190, -70, Localization.openCustomUrl, ButtonType.NORMAL, 0.1, null, ButtonCallbacks.UrlMenu.onOpenCustomUrl);
      new Button({ sprite: popup.ptr }, -210, 35, 'Brawlify', ButtonType.NORMAL, -0.12, null, ButtonCallbacks.UrlMenu.onOpenOtherUrl);
      new Button({ sprite: popup.ptr }, -55, 35, 'Brawl Stats', ButtonType.NORMAL, -0.12, null, ButtonCallbacks.UrlMenu.onOpenOtherUrl);
      new Button({ sprite: popup.ptr }, 100, 35, 'Brawl Time Ninja', ButtonType.NORMAL, -0.12, null, ButtonCallbacks.UrlMenu.onOpenOtherUrl);
      return popup;
    }
  },
  ActivationPopup: {
    create() {
      const popup = new Popup('TALE STARS+ REQUIRED', PopupType.BIG);
      new Image({ sprite: popup.ptr }, AssetsManager.getImagePath('talestarsplusdescription'), 0, 0, 160, 160);
      new Button({ sprite: popup.ptr }, 0, 200, 'BUY', ButtonType.NORMAL_SELECTED, -0.1, null, ButtonCallbacks.ActivationPopup.onBuyButtonClick);
      new Text({ sprite: popup.ptr }, -300, 160, 'Your Activation Key: ' + A.key, 1);
      new Button({ sprite: popup.ptr }, -250, 205, 'COPY', ButtonType.NORMAL, -0.3, null, ButtonCallbacks.ActivationPopup.onCopyKeyButtonClick);
      return popup;
    }
  },
  AutoDodgeConfigurationPopup: {
    buttons: {},
    popup: null,
    create() {
      const popup = new Popup('AUTO DODGE CONFIGURATION', PopupType.BRAWLPASS_REMINDER_POPUP, { type: 'remove' });
      this.popup = popup;
      new Image({ sprite: popup.ptr }, AssetsManager.getImagePath('enablementtext'), -235, -160, 110, 20);
      if (Config.autoDodgeModEnabled) {
        new Button({ sprite: popup.ptr }, -150, -290, '', ButtonType.SWITCH, 0, null, ButtonCallbacks.AutoDodgeConfigurationPopup.onEnablementButtonClick).gotoAndStopFrameIndex(Config.autoDodgeModEnabled ? 0 : 1);
        new Image({ sprite: popup.ptr }, AssetsManager.getImagePath('bannedcharacterstext'), -220, -40, 130, 25);
        new Button({ sprite: popup.ptr }, -250, 20, 'EDIT', ButtonType.NORMAL_SELECTED, 0, null, ButtonCallbacks.AutoDodgeConfigurationPopup.onBannedCharactersEditButtonClick);
        new Image({ sprite: popup.ptr }, AssetsManager.getImagePath('anglesystemtext'), -225, 90, 130, 25);
        this.buttons.oldAngleButton = new Button({ sprite: popup.ptr }, -300, 150, 'Old (v1)', Config.autoDodge.isOldAngle ? ButtonType.NORMAL_SELECTED : ButtonType.NORMAL, -0.3, null, ButtonCallbacks.AutoDodgeConfigurationPopup.onOldAngleButtonClick);
        this.buttons.newAngleButton = new Button({ sprite: popup.ptr }, -180, 150, 'New (v2)', Config.autoDodge.isOldAngle ? ButtonType.NORMAL : ButtonType.NORMAL_SELECTED, -0.3, null, ButtonCallbacks.AutoDodgeConfigurationPopup.onNewAngleButtonClick);
        new Image({ sprite: popup.ptr }, AssetsManager.getImagePath('distancetext'), 235, -160, 130, 25);
        new Slider({ sprite: popup.ptr }, 170, -100, 1500, '', false, Config.autoDodge.distance, val => { Config.autoDodge.distance = +val; IsConfigUpdated = true; }, 0.7);
        new Button({ sprite: popup.ptr }, 230, 150, 'Reset', ButtonType.NORMAL, -0.15, null, ButtonCallbacks.AutoDodgeConfigurationPopup.onResetButtonClick);
        return popup;
      }
    }
  },
  BannedCharactersPopup: {
    Characters: [
      {
        projectiles: [{ name: 'ShellyAttack', speed: 3100, radius: 0 }, { name: 'ShellyUlti', speed: 4130, radius: 50 }],
        text: 'Shelly'
      },
      {
        projectiles: [{ name: 'PrimoAttack', speed: 3261, radius: 150 }],
        text: 'El Primo'
      },
      {
        projectiles: [{ name: 'FrankAttack', speed: 5000, radius: 150 }, { name: 'FrankUlti', speed: 6000, radius: 250 }],
        text: 'Frank'
      },
      {
        projectiles: [{ name: 'EmzAttack', speed: 1500, radius: 200 }],
        text: 'Emz'
      },
      {
        projectiles: [{ name: 'RosaAttack', speed: 5000, radius: 150 }],
        text: 'Rosa'
      },
      {
        projectiles: [{ name: 'BuzzAttack', speed: 4000, radius: 250 }],
        text: 'Buzz'
      },
      {
        projectiles: [{ name: 'EdgarAttack', speed: 3500, radius: 300 }],
        text: 'Edgar'
      },
      {
        projectiles: [{ name: 'GromAttack', speed: 840, radius: 0 }],
        text: 'Grom'
      },
      {
        projectiles: [{ name: 'BullAttack', speed: 2853, radius: 0 }],
        text: 'Bull'
      }
    ],
    create() {
      const popup = new Popup('BLACKLIST CHARACTERS', PopupType.NORMAL, { type: 'remove' });
      const self = this;
      for (let i = 0; i < self.Characters.length; i++) {
        const character = self.Characters[i];
        const x = ((i * 195) % 3) - 200;
        const y = Math.floor(i / 3) * 70 - 95;
        const btnType = character.projectiles.every(proj => Config.autoDodge.blacklist.some(banned => banned.name === proj.name)) ? ButtonType.NORMAL_SELECTED : ButtonType.NORMAL;
        const btn = new Button({ sprite: popup.ptr }, x, y, character.text, btnType, 0, null, () => ButtonCallbacks.AutoDodgeConfigurationPopup.BlacklistPopup.onToggleCharacter(btn, character));
      }
      return popup;
    }
  },
  SetFPSPopup: {
    create() {
      const popup = new Popup('SET FPS', PopupType.BIG);
      new Slider({ sprite: popup.ptr }, 0, 0, 1000, '∞', false, Config.maxFps, val => { Config.maxFps = +val; Offsets.libg.FramerateManager.setFPS(Config.maxFps); IsConfigUpdated = true; }, 1.2);
      return popup;
    }
  }
};
Global.Popups = Popups;
module.exports = { Popups };
