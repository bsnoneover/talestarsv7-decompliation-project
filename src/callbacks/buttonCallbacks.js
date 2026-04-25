const ButtonCallbacks = {
  onModMenuButtonClick(button) {
    Popups.ModMenuPopup.create().show();
  },
  onSettingsButtonClick(button) {
    Popups.ModSettingsPopup.create().show();
  },
  ModSettingsPopup: {
    onModMenuButtonSettingsButtonClick(button) {
      Popups.ModMenuButtonSettingsPopup.create().show();
    },
    onVersionInfoButtonClick(button) {
      Offsets.libg.Other.NativeDialog_helper('Tale Stars Version Info', 'Current version of Tale Stars is ' + Versioning.toString(), 'OK', '', '');
    },
    ModMenuButtonSettingsPopup: {
      onModMenuButtonSetPositionButtonClick(button) {
        Popups.ModMenuButtonSetPositionPopup.create().show();
      },
      onModMenuButtonSetColorButtonClick(button) {
        Popups.ModMenuButtonSetColorPopup.create().show();
      },
      ModMenuButtonSetPositionPopup: {
        onSetPosition(button) {
          Offsets.libg.GUI.showFloater_helper(Localization.positionChanged);
          if (button.text === 'Top right') {
            Config.modMenuButtonPosition = 'top_right';
          } else if (button.text === 'Top left') {
            Config.modMenuButtonPosition = 'top_left';
          } else if (button.text === 'Bottom right') {
            Config.modMenuButtonPosition = 'bottom_right';
          } else if (button.text === 'Bottom left') {
            Config.modMenuButtonPosition = 'bottom_left';
          }
          TaleConfig.saveConfig();
        }
      }
    }
  },
  ModMenuPopup_Page1: {
    onXrayAutoshootButtonClick(button) {
      if (AppState.activated !== 0) {
        Config.xRayModEnabled = !Config.xRayModEnabled;
        TaleConfig.saveConfig();
        Mods.XrayAutoshoot.update();
        button.gotoAndStopFrameIndex(Config.xRayModEnabled ? 0 : 1);
        Offsets.libg.GUI.showFloater_helper('X-Ray Autoshoot', Config.xRayModEnabled ? Localization.anyModEnabled : Localization.anyModDisabled);
        return;
      }
      Popups.ActivationPopup.create().show();
    },
    onAimBotButtonClick(button) {
      if (AppState.activated !== 0) {
        Config.aimBotModEnabled = !Config.aimBotModEnabled;
        TaleConfig.saveConfig();
        Mods.AimBot.update();
        button.gotoAndStopFrameIndex(Config.aimBotModEnabled ? 0 : 1);
        Offsets.libg.GUI.showFloater_helper('Aim Bot', Config.aimBotModEnabled ? Localization.anyModEnabled : Localization.anyModDisabled);
        return;
      }
      Popups.ActivationPopup.create().show();
    },
    onAutoDodgeButtonClick(button) {
      if (AppState.activated !== 0) {
        Popups.AutoDodgeConfigurationPopup.create().show();
        return;
      }
      Popups.ActivationPopup.create().show();
    },
    onAutoChargeButtonClick(button) {
      if (AppState.activated !== 0) {
        Config.autoChargeModEnabled = !Config.autoChargeModEnabled;
        TaleConfig.saveConfig();
        Mods.AutoCharge.update();
        button.gotoAndStopFrameIndex(Config.autoChargeModEnabled ? 0 : 1);
        Offsets.libg.GUI.showFloater_helper('Auto Charge', Config.autoChargeModEnabled ? Localization.anyModEnabled : Localization.anyModDisabled);
        return;
      }
      Popups.ActivationPopup.create().show();
    },
    onBattleServerChangerButtonClick(button) {
      Popups.BattleServerChangerPopup_Regions.create().show();
    },
    onChromaticNameButtonClick(button) {
      Config.chromaticNameEnabled = !Config.chromaticNameEnabled;
      TaleConfig.saveConfig();
      Mods.ChromaticName.update();
      if (Config.chromaticNameEnabled) {
        button.gotoAndStopFrameIndex(Config.chromaticNameEnabled ? 0 : 1);
        Offsets.libg.GUI.showFloater_helper(Config.chromaticNameEnabled ? Localization.chromaticNameEnabled : Localization.chromaticNameDisabled);
        return;
      }
    },
    onUnlockAllEmotesButtonClick(button) {
      if (AppState.activated === 0) {
        Popups.ActivationPopup.create().show();
        return;
      }
      Config.csvMods.unlockAllEmotesModEnabled = !Config.csvMods.unlockAllEmotesModEnabled;
      TaleConfig.saveConfig();
      if (Config.csvMods.unlockAllEmotesModEnabled) {
        button.gotoAndStopFrameIndex(Config.csvMods.unlockAllEmotesModEnabled ? 0 : 1);
        Offsets.libg.GUI.showFloater_helper('Unlock All Emotes', Config.csvMods.unlockAllEmotesModEnabled ? Localization.anyModEnabled : Localization.anyModDisabled);
        return;
      }
    },
    onShowEnemyAmmoButtonClick(button) {
      Config.showEnemyAmmoModEnabled = !Config.showEnemyAmmoModEnabled;
      TaleConfig.saveConfig();
      if (Config.showEnemyAmmoModEnabled) {
        button.gotoAndStopFrameIndex(Config.showEnemyAmmoModEnabled ? 0 : 1);
        Offsets.libg.GUI.showFloater_helper('Show Enemy Ammo', Config.showEnemyAmmoModEnabled ? Localization.anyModEnabled : Localization.anyModDisabled);
        return;
      }
    },
    onNaniUltiModButtonClick(button) {
      Config.csvMods.naniUltiModEnabled = !Config.csvMods.naniUltiModEnabled;
      TaleConfig.saveConfig();
      if (Config.csvMods.naniUltiModEnabled) {
        button.gotoAndStopFrameIndex(Config.csvMods.naniUltiModEnabled ? 0 : 1);
        Offsets.libg.GUI.showFloater_helper('Nani Ulti Mod', Config.csvMods.naniUltiModEnabled ? Localization.anyModEnabled : Localization.anyModDisabled);
        return;
      }
    },
    onWillowModButtonClick(button) {
      if (AppState.activated !== 0) {
        Config.willowModEnabled = !Config.willowModEnabled;
        TaleConfig.saveConfig();
        button.gotoAndStopFrameIndex(Config.willowModEnabled ? 0 : 1);
        Offsets.libg.GUI.showFloater_helper('Willow Mod', Config.willowModEnabled ? Localization.anyModEnabled : Localization.anyModDisabled);
        return;
      }
      Popups.ActivationPopup.create().show();
    },
    onLolaModButtonClick(button) {
      if (AppState.activated !== 0) {
        Config.lolaModEnabled = !Config.lolaModEnabled;
        TaleConfig.saveConfig();
        button.gotoAndStopFrameIndex(Config.lolaModEnabled ? 0 : 1);
        Offsets.libg.GUI.showFloater_helper('Lola Mod', Config.lolaModEnabled ? Localization.anyModEnabled : Localization.anyModDisabled);
        return;
      }
      Popups.ActivationPopup.create().show();
    },
    onSkinChangerButtonClick(button) {
      new CustomInput(Localization.typeSkinName, Localization.unlock, 255, InputType.NORMAL, InputCallbacks.onUnlockSkinInput).show();
    }
  },
  ModMenuPopup_Page2: {
    onRankedModButtonClick(button) {
      Config.csvMods.rankedRanksModEnabled = !Config.csvMods.rankedRanksModEnabled;
      TaleConfig.saveConfig();
      if (Config.csvMods.rankedRanksModEnabled) {
        button.gotoAndStopFrameIndex(Config.csvMods.rankedRanksModEnabled ? 0 : 1);
        Offsets.libg.GUI.showFloater_helper('Ranked Mod', Config.csvMods.rankedRanksModEnabled ? Localization.anyModEnabled : Localization.anyModDisabled);
        return;
      }
    },
    onSetFPSButtonClick(button) {
      Popups.SetFPSPopup.create().show();
    },
    onAntiAutoSuperButtonClick(button) {
      Config.antiAutoSuperModEnabled = !Config.antiAutoSuperModEnabled;
      TaleConfig.saveConfig();
      if (Config.antiAutoSuperModEnabled) {
        button.gotoAndStopFrameIndex(Config.antiAutoSuperModEnabled ? 0 : 1);
        Offsets.libg.GUI.showFloater_helper('Anti Auto Super', Config.antiAutoSuperModEnabled ? Localization.anyModEnabled : Localization.anyModDisabled);
        return;
      }
    },
    onHideUltiAimingButtonClick(button) {
      Config.hideUltiAimingModEnabled = !Config.hideUltiAimingModEnabled;
      TaleConfig.saveConfig();
      if (Config.hideUltiAimingModEnabled) {
        button.gotoAndStopFrameIndex(Config.hideUltiAimingModEnabled ? 0 : 1);
        Offsets.libg.GUI.showFloater_helper('Hide Ulti Aiming', Config.hideUltiAimingModEnabled ? Localization.anyModEnabled : Localization.anyModDisabled);
        return;
      }
    },
    onEmptyPinButtonClick(button) {
      Config.emptyPinModEnabled = !Config.emptyPinModEnabled;
      TaleConfig.saveConfig();
      if (Config.emptyPinModEnabled) {
        button.gotoAndStopFrameIndex(Config.emptyPinModEnabled ? 0 : 1);
        Offsets.libg.GUI.showFloater_helper(Config.emptyPinModEnabled ? Localization.emptyPinModEnabled : 'Empty Pin ' + Localization.anyModDisabled);
        return;
      }
    },
    onBattleCardModButtonClick(button) {
      Config.csvMods.battleCardModEnabled = !Config.csvMods.battleCardModEnabled;
      TaleConfig.saveConfig();
      if (Config.csvMods.battleCardModEnabled) {
        button.gotoAndStopFrameIndex(Config.csvMods.battleCardModEnabled ? 0 : 1);
        Offsets.libg.GUI.showFloater_helper('Battle Card Mod', Config.csvMods.battleCardModEnabled ? Localization.anyModEnabled : Localization.anyModDisabled);
        return;
      }
    },
    onSpectatorsMenuButtonClick(button) {
      Popups.SpectatorsMenuPopup.create().show();
    },
    onSeeSelectedBrawlersButtonClick(button) {
      Config.seeSelectedBrawlersModEnabled = !Config.seeSelectedBrawlersModEnabled;
      TaleConfig.saveConfig();
      if (Config.seeSelectedBrawlersModEnabled) {
        button.gotoAndStopFrameIndex(Config.seeSelectedBrawlersModEnabled ? 0 : 1);
        Offsets.libg.GUI.showFloater_helper('See Selected Brawlers', Config.seeSelectedBrawlersModEnabled ? Localization.anyModEnabled : Localization.anyModDisabled);
        return;
      }
    },
    onStatusChangerButtonClick(button) {
      Popups.StatusChangerPopup.create().show();
    },
    onAntiAutoshootButtonClick(button) {
      Config.antiAutoshootModEnabled = !Config.antiAutoshootModEnabled;
      TaleConfig.saveConfig();
      if (Config.antiAutoshootModEnabled) {
        button.gotoAndStopFrameIndex(Config.antiAutoshootModEnabled ? 0 : 1);
        Offsets.libg.GUI.showFloater_helper('Anti Autoshoot', Config.antiAutoshootModEnabled ? Localization.anyModEnabled : Localization.anyModDisabled);
        return;
      }
    },
    onMapMakerModButtonClick(button) {
      Config.csvMods.tilesModEnabled = !Config.csvMods.tilesModEnabled;
      TaleConfig.saveConfig();
      if (Config.csvMods.tilesModEnabled) {
        button.gotoAndStopFrameIndex(Config.csvMods.tilesModEnabled ? 0 : 1);
        Offsets.libg.GUI.showFloater_helper('Map Maker Mod', Config.csvMods.tilesModEnabled ? Localization.anyModEnabled : Localization.anyModDisabled);
        return;
      }
    },
    onNameChangerButtonClick(button) {
      const nameInput = new CustomInput(Localization.changeName, Localization.changeName, 255, InputType.NORMAL, InputCallbacks.onSetNameInput);
      new Button(
        { sprite: nameInput.ptr },
        200,
        30,
        Localization.resetTextBigLetter,
        ButtonType.NORMAL,
        -0.2,
        null,
        function () {
          if (NameChanger.removeName(AccountInfo.TAG) !== 0) {
            Config.selectedName = null;
            TaleConfig.saveConfig();
          }
        }
      );
      nameInput.show();
    }
  },
  ModMenuPopup_Page3: {
    onSpectateWithIDButtonClick(button) {
      new CustomInput(Localization.spectateWithID, Localization.spectateWithIDBtn, 255, InputType.NORMAL, InputCallbacks.onSpectateWithIDInput).show();
    },
    onRandomSpraySpamButtonClick(button) {
      Config.randomSpraySpamModEnabled = !Config.randomSpraySpamModEnabled;
      Mods.RandomSpraySpam.update();
      TaleConfig.saveConfig();
      if (Config.randomSpraySpamModEnabled) {
        button.gotoAndStopFrameIndex(Config.randomSpraySpamModEnabled ? 0 : 1);
        Offsets.libg.GUI.showFloater_helper('Random Spray Spam', Config.randomSpraySpamModEnabled ? Localization.anyModEnabled : Localization.anyModDisabled);
        return;
      }
    },
    onChatSpamButtonClick(button) {
      Popups.ChatSpamPopup.create().show();
    },
    onDecreasedCooldownButtonClick(button) {
      Config.csvMods.decreasedCooldownModEnabled = !Config.csvMods.decreasedCooldownModEnabled;
      TaleConfig.saveConfig();
      if (Config.csvMods.decreasedCooldownModEnabled) {
        button.gotoAndStopFrameIndex(Config.csvMods.decreasedCooldownModEnabled ? 0 : 1);
        Offsets.libg.GUI.showFloater_helper('Decreased Cooldown', Config.csvMods.decreasedCooldownModEnabled ? Localization.anyModEnabled : Localization.anyModDisabled);
        return;
      }
    },
    onAntiAFKButtonClick(button) {
      Config.antiAfkModEnabled = !Config.antiAfkModEnabled;
      TaleConfig.saveConfig();
      if (Config.antiAfkModEnabled) {
        button.gotoAndStopFrameIndex(Config.antiAfkModEnabled ? 0 : 1);
        Offsets.libg.GUI.showFloater_helper('Anti AFK', Config.antiAfkModEnabled ? Localization.anyModEnabled : Localization.anyModDisabled);
        return;
      }
    },
    onRemoveBlackBordersButtonClick(button) {
      Config.removeBlackbordersModEnabled = !Config.removeBlackbordersModEnabled;
      TaleConfig.saveConfig();
      if (Config.removeBlackbordersModEnabled) {
        button.gotoAndStopFrameIndex(Config.removeBlackbordersModEnabled ? 0 : 1);
        Offsets.libg.GUI.showFloater_helper('Remove Black Borders', Config.removeBlackbordersModEnabled ? Localization.anyModEnabled : Localization.anyModDisabled);
        return;
      }
    },
    onInviteByIDButtonClick(button) {
      new CustomInput(Localization.inviteById, Localization.inviteByIdOkeyBtn, 255, InputType.NORMAL, InputCallbacks.onInviteByIDInput).show();
    },
    onFontChangerButtonClick(button) {
      Popups.FontChangerPopup.create().show();
    },
    onUrlMenuButtonClick(button) {
      Popups.UrlMenuPopup.create().show();
    },
    onModSettingsButtonClick(button) {
      Popups.ModSettingsPopup.create().show();
    },
    onHelpButtonClick(button) { },
    onOptimizeGameButtonClick(button) {
      Config.csvMods.optimizeGameEnabled = !Config.csvMods.optimizeGameEnabled;
      TaleConfig.saveConfig();
      if (Config.csvMods.optimizeGameEnabled) {
        button.gotoAndStopFrameIndex(Config.csvMods.optimizeGameEnabled ? 0 : 1);
        Offsets.libg.GUI.showFloater_helper('Optimize Game', Config.csvMods.optimizeGameEnabled ? Localization.anyModEnabled : Localization.anyModDisabled);
        return;
      }
    }
  },
  ModMenuPopup_Page4: {
    onAntiCensorButtonClick(button) {
      Config.antiCensorModEnabled = !Config.antiCensorModEnabled;
      TaleConfig.saveConfig();
      if (Config.antiCensorModEnabled) {
        button.gotoAndStopFrameIndex(Config.antiCensorModEnabled ? 0 : 1);
        Offsets.libg.GUI.showFloater_helper(Config.antiCensorModEnabled ? Localization.antiCensorEnabled : Localization.antiCensorDisabled);
        return;
      }
    },
    onThemeChangerButtonClick(button) {
      Popups.ThemeChangerPopup.create().show();
    },
    onStaticBackgroundButtonClick(button) {
      Config.staticBackgroundEnabled = !Config.staticBackgroundEnabled;
      TaleConfig.saveConfig();
      if (Config.staticBackgroundEnabled) {
        button.gotoAndStopFrameIndex(Config.staticBackgroundEnabled ? 0 : 1);
        Offsets.libg.GUI.showFloater_helper('Static Background', Config.staticBackgroundEnabled ? Localization.anyModEnabled : Localization.anyModDisabled);
        return;
      }
    },
    onReloadGameButtonClick(button) {
      Offsets.libg.GameMain.reload();
    },
    onAutoPlayAgainButtonClick(button) {
      Config.autoPlayAgainModEnabled = !Config.autoPlayAgainModEnabled;
      TaleConfig.saveConfig();
      if (Config.autoPlayAgainModEnabled) {
        button.gotoAndStopFrameIndex(Config.autoPlayAgainModEnabled ? 0 : 1);
        Offsets.libg.GUI.showFloater_helper('Auto Play Again', Config.autoPlayAgainModEnabled ? Localization.anyModEnabled : Localization.anyModDisabled);
        return;
      }
    }
  },
  CopyPlayerTag: {
    onTagClick(button, tag) {
      Offsets.libg.Application.copyString_helper(tag);
      Offsets.libg.GUI.showFloater_helper(Localization.copiedTag + tag);
    }
  },
  BattleServerChanger: {
    onSelectRegion(button) {
      Popups.BattleServerChangerPopup_BattleServersByRegions.create(button.text).show();
    },
    onSelectServer(button) {
      const serverName = button.text.replace(new RegExp('\\s*\\(.*?\\)\\s*', 'g'), '').trim();
      Config.selectedBattleServer = serverName;
      TaleConfig.saveConfig();
      Mods.BattleServerChanger.spoofBattleServer(serverName);
      if (Mods.BattleServerChanger.lastServerButton === null) {
        Mods.BattleServerChanger.lastServerButton = button;
        button.gotoAndStopFrameIndex(0);
        return;
      }
    },
    onReset(button) {
      Config.selectedBattleServer = null;
      TaleConfig.saveConfig();
      Mods.BattleServerChanger.sendLatencyTest();
      Offsets.libg.GUI.showFloater_helper(Localization.battleServerReset);
    }
  },
  ThemeChanger: {
    onSelectTheme(button, theme) {
      Config.selectedTheme = theme;
      TaleConfig.saveConfig();
      Offsets.libg.GameMain.reload();
    },
    onReset(button) {
      Config.selectedTheme = null;
      TaleConfig.saveConfig();
      Offsets.libg.GameMain.reload();
    }
  },
  SpectatorsMenu: {
    onSetSpectatorsButtonClick(button) {
      Popups.SetSpectatorsPopup.create().show();
    },
    onSetSpectators(button, count) {
      Mods.VisualSpectators.count = count;
      Offsets.libg.GUI.showFloater_helper(Localization.spectatorsSentSuccesfully);
    },
    onReset(button) {
      Mods.VisualSpectators.count = null;
      Offsets.libg.GUI.showFloater_helper(Localization.spectatorsReset);
    },
    onSpectateEveryMatchAsBrawltvButtonClick(button) {
      Config.spectateEveryMatchAsBrawltv = !Config.spectateEveryMatchAsBrawltv;
      TaleConfig.saveConfig();
      if (Config.spectateEveryMatchAsBrawltv) {
        button.gotoAndStopFrameIndex(Config.spectateEveryMatchAsBrawltv ? 0 : 1);
        Offsets.libg.GUI.showFloater_helper('Spectate Every Match as BrawlTV', Config.spectateEveryMatchAsBrawltv ? Localization.anyModEnabled : Localization.anyModDisabled);
        return;
      }
    }
  },
  StatusChanger: {
    onSelectStatus(button, status) {
      if (IsInTeam) {
        const msg = malloc(200);
        Offsets.libg.Messages.TeamMemberStatusMessage(msg, status);
        Offsets.libg.MessageManager.sendMessage(
          Offsets.libg.MessageManager.instance.readPointer(),
          msg
        );
        Offsets.libg.GUI.showFloater_helper(Localization.statusSet, button.text);
        return;
      }
      Offsets.libg.GUI.showFloater_helper(Localization.statusSetFailed);
    }
  },
  NameChanger: {
    onResetButtonClick(button) {
      Config.selectedName = null;
      Offsets.libg.GameMain.reload();
    },
    onChangeNameButtonClick(button) {
      new CustomInput(Localization.nameChanger, Localization.nameChangerBtn, 255, InputType.NORMAL, InputCallbacks.onSetNameInput).show();
    }
  },
  SetNameType: {
    onNormalButtonClick(button) {
      TaleConfig.saveConfig();
      Offsets.libg.GameMain.reload();
    }
  },
  ChatSpam: {
    onSetSpamTextButtonClick(button) {
      new CustomInput(Localization.setSpamText, Localization.setSpamTextBtn, 255, InputType.NORMAL, InputCallbacks.onSetSpamTextInput).show();
    },
    onStartOrStopButtonClick(button) {
      if (button.text === Localization.chatSpamStop) {
        Mods.ChatSpam.stop();
        button.text = Localization.chatSpamStart;
        button.setText(Localization.chatSpamStart);
        button.gotoAndStopFrameIndex(0);
        return;
      }
      if (button.text === Localization.chatSpamStart) {
        Mods.ChatSpam.start();
        if (Mods.ChatSpam.ChatSpamText !== null) {
          button.text = Localization.chatSpamStop;
          button.setText(Localization.chatSpamStop);
          button.gotoAndStopFrameIndex(1);
          return;
        }
      }
    }
  },
  FontChanger: {
    onReset(button) {
      Offsets.libg.GUI.showFloater_helper(Localization.gameClosing);
      setTimeout(function () {
        TaleUtils.Network.downloadFileAndMoveFromUrl('http://api.talemods.com/TaleStars/Fonts/Default.ttf', AssetsManager.Files.Paths.defaultFontPath, function () {
          Offsets.native.kill();
        });
      }, 500);
    },
    onSelectFont(button, fontName) {
      Offsets.libg.GUI.showFloater_helper(Localization.gameClosing);
      setTimeout(function () {
        TaleUtils.Network.downloadFileAndMoveFromUrl('http://api.talemods.com/TaleStars/Fonts/' + fontName, AssetsManager.Files.Paths.defaultFontPath, function () {
          Offsets.native.kill();
        });
      }, 500);
    }
  },
  UrlMenu: {
    onOpenCustomUrl(button) {
      new CustomInput(Localization.openCustomUrl, Localization.openUrl, 255, InputType.NORMAL, InputCallbacks.onOpenCustomUrlInput).show();
    },
    onOpenOtherUrl(button) {
      if (button.text === 'Brawlify') {
        Offsets.libg.SimpleWebView.showSimpleWebView('https://brawlify.com/stats/profile/#' + AccountInfo.TAG, 'BRAWLIFY');
        return;
      }
      if (button.text === 'Brawl Stats') {
        Offsets.libg.SimpleWebView.showSimpleWebView('https://brawlstats.com/profile/' + AccountInfo.TAG, 'BRAWL STATS');
        return;
      }
      if (button.text === 'Brawl Time Ninja') {
        Offsets.libg.SimpleWebView.showSimpleWebView('https://www.brawltime.ninja/profile/' + AccountInfo.TAG, 'BRAWL TIME NINJA');
      }
    }
  },
  ActivationPopup: {
    onBuyButtonClick(button) {
      try {
        const config = JSON.parse(TaleUtils.File.readFromAssets('tale/config.json'));
        if (config.referral !== '') {
          Offsets.libg.Application.openUrl_helper('https://t.me/talepaybot?start=' + config.referral);
        } else {
          Offsets.libg.Application.openUrl_helper('https://t.me/talepaybot');
        }
      } catch (_) {
        Logger.clog('Failed to parse activation config');
        Offsets.libg.Application.openUrl_helper('https://t.me/talepaybot');
      }
    },
    onCopyKeyButtonClick(button) {
      Offsets.libg.GUI.showFloater_helper(Localization.keyCopiedToClipboard);
      Offsets.libg.Application.copyString_helper(AppState.key);
    }
  },
  AutoDodgeConfigurationPopup: {
    BlacklistPopup: {
      onToggleCharacter(button, characterData) {
        const isAllBlacklisted = characterData.projectiles.every(function (projectile) {
          return Config.autoDodge.blacklist.some(function (blacklisted) {
            return blacklisted.name === projectile.name;
          });
        });

        if (isAllBlacklisted) {
          const projectileNames = characterData.projectiles.map(function (projectile) {
            return projectile.name;
          });
          Config.autoDodge.blacklist = Config.autoDodge.blacklist.filter(function (blacklisted) {
            return !projectileNames.includes(blacklisted.name);
          });
          button.gotoAndStopFrameIndex(1);
          Offsets.libg.GUI.showFloater_helper(characterData.text, Localization.removedFromBlacklist);
        } else {
          characterData.projectiles.forEach(function (projectile) {
            const alreadyInBlacklist = Config.autoDodge.blacklist.some(function (blacklisted) {
              return (
                blacklisted.name === projectile.name &&
                blacklisted.speed === projectile.speed &&
                blacklisted.radius === projectile.radius
              );
            });
            if (alreadyInBlacklist) {
              return;
            }
            Config.autoDodge.blacklist.push(projectile);
          });
          button.gotoAndStopFrameIndex(0);
          Offsets.libg.GUI.showFloater_helper(characterData.text, Localization.addedToBlacklist);
        }
        TaleConfig.saveConfig();
      }
    },
    onEnablementButtonClick(button) {
      Config.autoDodgeModEnabled = !Config.autoDodgeModEnabled;
      TaleConfig.saveConfig();
      Mods.AutoDodge.update();
      if (Config.autoDodgeModEnabled) {
        Popups.ModMenuPopup.buttons[0][2].gotoAndStopFrameIndex(Config.autoDodgeModEnabled ? 0 : 1);
        Offsets.libg.GUI.showFloater_helper('Auto Dodge', Config.autoDodgeModEnabled ? Localization.anyModEnabled : Localization.anyModDisabled);
        button.gotoAndStopFrameIndex(Config.autoDodgeModEnabled ? 0 : 1);
        return;
      }
    },
    onBannedCharactersEditButtonClick(button) {
      Popups.BannedCharactersPopup.create().show();
    },
    onOldAngleButtonClick(button) {
      Config.autoDodge.isOldAngle = true;
      TaleConfig.saveConfig();
      Popups.AutoDodgeConfigurationPopup.buttons.oldAngleButton.gotoAndStopFrameIndex(0);
      Popups.AutoDodgeConfigurationPopup.buttons.newAngleButton.gotoAndStopFrameIndex(1);
    },
    onNewAngleButtonClick(button) {
      Config.autoDodge.isOldAngle = false;
      TaleConfig.saveConfig();
      Popups.AutoDodgeConfigurationPopup.buttons.oldAngleButton.gotoAndStopFrameIndex(1);
      Popups.AutoDodgeConfigurationPopup.buttons.newAngleButton.gotoAndStopFrameIndex(0);
    },
    onResetButtonClick(button) {
      Config.autoDodge.isOldAngle = false;
      Config.autoDodge.distance = 400;
      Config.autoDodge.cooldown = 50;
      TaleConfig.saveConfig();
      Offsets.libg.GenericPopup.onHudCloseButton(Popups.AutoDodgeConfigurationPopup.popup.ptr);
      Offsets.libg.GUI.showFloater_helper(Localization.configResetSuccesfully);
      Popups.AutoDodgeConfigurationPopup.create().show();
    }
  },
  QuickMenu: {
    onQuickMenuButtonClick() {
      if (QuickMenu.isOpen) {
        QuickMenu.removeMenu();
        return;
      }
      QuickMenu.createMenu();
    },
    Mods: {
      onXrayAutoshootButtonClick(button) {
        Config.xRayModEnabled = !Config.xRayModEnabled;
        TaleConfig.saveConfig();
        Mods.XrayAutoshoot.update();
        if (Config.xRayModEnabled) {
          button.decorate = {
            name: Config.xRayModEnabled ? 'Name1' : 'DefaultName'
          };
          Offsets.libg.GUI.showFloater_helper('X-Ray Autoshoot', Config.xRayModEnabled ? Localization.anyModEnabled : Localization.anyModDisabled);
          return;
        }
      },
      onAimBotButtonClick(button) {
        Config.aimBotModEnabled = !Config.aimBotModEnabled;
        TaleConfig.saveConfig();
        Mods.AimBot.update();
        if (Config.aimBotModEnabled) {
          button.decorate = {
            name: Config.aimBotModEnabled ? 'Name1' : 'DefaultName'
          };
          Offsets.libg.GUI.showFloater_helper('Aim Bot', Config.aimBotModEnabled ? Localization.anyModEnabled : Localization.anyModDisabled);
          return;
        }
      },
      onAutoDodgeButtonClick(button) {
        Config.autoDodgeModEnabled = !Config.autoDodgeModEnabled;
        TaleConfig.saveConfig();
        Mods.AutoDodge.update();
        if (Config.autoDodgeModEnabled) {
          button.decorate = {
            name: Config.autoDodgeModEnabled ? 'Name1' : 'DefaultName'
          };
          Offsets.libg.GUI.showFloater_helper('Auto Dodge', Config.autoDodgeModEnabled ? Localization.anyModEnabled : Localization.anyModDisabled);
          return;
        }
      },
      onAutoChargeButtonClick(button) {
        Config.autoChargeModEnabled = !Config.autoChargeModEnabled;
        TaleConfig.saveConfig();
        Mods.AutoCharge.update();
        if (Config.autoChargeModEnabled) {
          button.decorate = {
            name: Config.autoChargeModEnabled ? 'Name1' : 'DefaultName'
          };
          Offsets.libg.GUI.showFloater_helper('Auto Charge', Config.autoChargeModEnabled ? Localization.anyModEnabled : Localization.anyModDisabled);
          return;
        }
      },
      onAutoSpinnerButtonClick(button) {
        const mode = Mods.AutoSpinner.modeOrder[Mods.AutoSpinner.currentModIndex];
        Mods.AutoSpinner.toggle(mode);
        let decorateName = Mods.AutoSpinner.modeDecorateNames[Mods.AutoSpinner.currentModIndex];
        button.decorate = {
          name: decorateName
        };
        if (mode === 'off') {
          Offsets.libg.GUI.showFloater_helper('Auto Spinner', mode !== 'off' ? 'Mode: ' + mode : 'Mode: off');
          Mods.AutoSpinner.currentModIndex =
            (Mods.AutoSpinner.currentModIndex + 1) % Mods.AutoSpinner.modeOrder.length;
          return;
        }
      },
      onFollowClosestAllyButtonClick(button) {
        const isStarted = !Mods.FollowClosestAlly.isStarted;
        button.decorate = {
          name: isStarted ? 'Name1' : 'DefaultName'
        };
        if (isStarted) {
          Offsets.libg.GUI.showFloater_helper('Follow Closest Ally', isStarted ? Localization.anyModEnabled : Localization.anyModDisabled);
          return;
        }
      }
    }
  }
};
Global.ButtonCallbacks = ButtonCallbacks;

module.exports = { ButtonCallbacks };
