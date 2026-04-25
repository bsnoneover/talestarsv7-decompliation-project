function init() {
  Global.Offsets = {
    libg: {
      String: {
        ctor: new NativeFunction(libg.offset(0xB27390, 0xB8632C), 'pointer', ['pointer', 'pointer']),
        equals: new NativeFunction(libg.offset(0xB27CEC, 0x3F41BC), 'pointer', ['pointer', 'pointer'])
      },
      NativeFont: {
        formatString: libg.offset(0x9460E8, 0x119548)
      },
      StringTable: {
        getString: new NativeFunction(libg.offset(0x903B68, 0x381A94), 'pointer', ['pointer']),
        getCurrentLanguageCode: new NativeFunction(libg.offset(0x903F50, 0x381D7C), 'pointer', [])
      },
      GUI: {
        showPopup: new NativeFunction(libg.offset(0x5653D4, 0xAA2E4), 'void', ['pointer', 'pointer', 'int', 'int', 'int']),
        closePopup: new NativeFunction(libg.offset(0x67FB40, 0x184A8C), 'void', ['pointer', 'int', 'int']),
        getInstance: new NativeFunction(libg.offset(0x563DE4, 0xA9288), 'pointer', []),
        showFloater: new NativeFunction(libg.offset(0x56488C, 0xA9BCC), 'void', ['pointer', 'pointer', 'float', 'int']),
        showFloater_helper(text) {
          const message = text.toString();
          this.showFloater(this.getInstance(), StringUtils.getScPtr(message), 0, -1);
        }
      },
      LoadingScreen: {
        exit: libg.offset(0x8FCEB0, 0x9A48E4),
        enter: libg.offset(0x6891A8, 0x208140)
      },
      GenericPopup: {
        ctor: new NativeFunction(libg.offset(0x67F530, 0x184938), 'void', ['pointer', 'pointer', 'int', 'int', 'pointer', 'pointer', 'pointer', 'pointer', 'pointer']),
        addButton: new NativeFunction(libg.offset(0x680090, 0x184E84), 'pointer', ['pointer', 'pointer', 'int']),
        addButton2: new NativeFunction(libg.offset(0x680160, 0x184F20), 'void', ['pointer', 'pointer', 'int', 'pointer']),
        setTitle: new NativeFunction(libg.offset(0x67F9E8, 0x1849E0), 'void', ['pointer', 'pointer']),
        onHudCloseButton: new NativeFunction(libg.offset(0x6805A8, 0x114738), 'void', ['pointer'])
      },
      ResourceManager: {
        getMovieClip: new NativeFunction(libg.offset(0x94AD5C, 0x98B2F0), 'pointer', ['pointer', 'pointer']),
        getMovieClip_helper(t, e) {
          return this.getMovieClip(StringUtils.getStrPtr(t), StringUtils.getStrPtr(e));
        }
      },
      MovieClip: {
        gotoAndStopFrameIndex: new NativeFunction(libg.offset(0x9724D4, 0x9CE5B4), 'void', ['pointer', 'int']),
        setText: new NativeFunction(libg.offset(0x9A5750, 0x9FE690), 'void', ['pointer', 'pointer', 'pointer']),
        setTextAndScaleIfNecessary: new NativeFunction(libg.offset(0x927CFC, 0x396630), 'pointer', ['pointer', 'pointer', 'int', 'int']),
        getMovieClipByName: new NativeFunction(libg.offset(0x973108, 0x9CF1E0), 'pointer', ['pointer', 'pointer']),
        getMovieClipByName_helper(t, e) {
          return this.getMovieClipByName(t, StringUtils.getStrPtr(e));
        },
        getChildByName: new NativeFunction(libg.offset(0x971FCC, 0x9CE084), 'pointer', ['pointer', 'pointer']),
        getChildByName_helper(t, e) {
          return this.getChildByName(t, StringUtils.getStrPtr(e));
        },
        getTextFieldByName: new NativeFunction(libg.offset(0x973368, 0x9CF4E8), 'pointer', ['pointer', 'pointer']),
        getTextFieldByName_helper(t, e) {
          return this.getTextFieldByName(t, StringUtils.getStrPtr(e));
        },
        playOnce: new NativeFunction(libg.offset(0x83B3A8, 0x9CFAE0), 'void', ['pointer']),
        setChildVisible: new NativeFunction(libg.offset(0x973900, 0x9CFA5C), 'void', ['pointer', 'pointer', 'int'])
      },
      GameButton: {
        ctor: new NativeFunction(libg.offset(0x56A8B0, 0xAC984), 'void', ['pointer']),
        buttonPressed: new NativeFunction(libg.offset(0x9A498C, 0x9FD85C), 'void', ['pointer'])
      },
      Sprite: {
        ctor: new NativeFunction(libg.offset(0x982794, 0x9DF224), 'void', ['pointer', 'int']),
        addChild: new NativeFunction(libg.offset(0x9829D4, 0x9DF4A0), 'pointer', ['pointer', 'pointer'])
      },
      PopupBase: {
        ctor: new NativeFunction(libg.offset(0x6B191C, 0x1ADD08), 'void', ['pointer', 'pointer', 'pointer', 'int', 'int', 'pointer', 'pointer', 'pointer', 'pointer']),
        addCloseButton: new NativeFunction(libg.offset(0x6B25B4, 0x1AEA84), 'pointer', ['pointer'])
      },
      GameMain: {
        getAccountIdCtor: new NativeFunction(libg.offset(0x491FE0, 0x992C), 'pointer', ['pointer']),
        getInstanceCtor: new NativeFunction(libg.offset(0x48B8A4, 0x4040), 'pointer', []),
        reloadGame: new NativeFunction(libg.offset(0x49093C, 0xA1E8), 'void', ['pointer']),
        reloadGameAfterContentUpdate: new NativeFunction(libg.offset(0x4909BC, 0x86B8), 'void', ['pointer']),
        getStaticVideoAdListener: new NativeFunction(libg.offset(0x48B8A4, 0xB97A20), 'pointer', ['pointer']),
        getFps() {
          try {
            let staticVideoAdListener = new NativePointer(this.getStaticVideoAdListener(libg.offset(0x115E610, 0xEDB0B8)));
            let frameCount = staticVideoAdListener.add(688).readS32();
            let fps = parseInt(staticVideoAdListener.add(684).readFloat() / frameCount);
            return fps;
          } catch {
            return -1;
          }
        },
        reload() {
          this.reloadGame(this.getInstanceCtor());
        },
        reloadFast() {
          this.reloadGameAfterContentUpdate(this.getInstanceCtor());
        },
        update: libg.offset(0x48EE10, 0x6C04),
        draw: new NativeFunction(libg.offset(0x490600, 0x83C8), 'pointer', ['pointer', 'float'])
      },
      Stage: {
        addChild: new NativeFunction(libg.offset(0x98B3F0, 0x49BEC8), 'pointer', ['pointer', 'pointer']),
        instance: libg.offset(0x1160FD8, 0xF1ABC8),
        addToStage(t) {
          if (LogicDefines.isPlatformiOS()) {
            Offsets.libg.Sprite.addChild(Offsets.libg.Stage.instance.readPointer().add(6944).readPointer(), t);
            return;
          }
          Offsets.libg.Stage.addChild(Offsets.libg.Stage.instance.readPointer(), t);
        }
      },
      CountryItem: {
        ctor: new NativeFunction(libg.offset(0x5B3B98, 0x2CE4D0), 'pointer', ['pointer', 'pointer', 'pointer'])
      },
      DisplayObject: {
        setXY: new NativeFunction(libg.offset(0xC82114, 0x9C9B24), 'void', ['pointer', 'float', 'float']),
        setPixelSnappedXY: new NativeFunction(libg.offset(0x96D948, 0x9C9B40), 'pointer', ['pointer', 'float', 'float'])
      },
      TextField: {
        setText: new NativeFunction(libg.offset(0x56AF00, 0xACD20), 'pointer', ['pointer', 'pointer', 'bool']),
        fetchFont: new NativeFunction(libg.offset(0x9A02C4, 0x9F9DE8), 'pointer', ['pointer'])
      },
      DecoratedTextField: {
        setupDecoratedTextField: new NativeFunction(libg.offset(0x560D94, 0xA6B70), 'pointer', ['pointer', 'pointer', 'pointer'])
      },
      TeamSearchPopup: {
        customButtonTapped: new NativeFunction(libg.offset(0x72122C, 0xE4FEC), 'pointer', ['pointer', 'pointer', 'int'])
      },
      GameInputField: {
        ctor: new NativeFunction(libg.offset(0x56CEA4, 0xAE084), 'void', ['pointer', 'pointer', 'pointer']),
        setScaleTextIfNeeded: new NativeFunction(libg.offset(0x56D1F4, 0xAE348), 'void', ['pointer', 'bool'])
      },
      TextInput: {
        setMaxTextLength: new NativeFunction(libg.offset(0xB68F94, 0xBA0EE8), 'void', ['pointer', 'int'])
      },
      InputField: {
        getInputText: new NativeFunction(libg.offset(0xB298A0, 0x2EDB4), 'pointer', ['pointer'])
      },
      CustomButton: {
        setButtonListener: new NativeFunction(libg.offset(0x812B14, 0x22240), 'void', ['pointer', 'pointer'])
      },
      GameSliderComponent: {
        ctor: new NativeFunction(libg.offset(0x56EE54, 0xAFBFC), 'void', ['pointer', 'pointer', 'pointer', 'pointer', 'bool']),
        setValueBounds: new NativeFunction(libg.offset(0x56F658, 0xB0320), 'void', ['pointer', 'int', 'int']),
        setMaxValueLabel: new NativeFunction(libg.offset(0x56F660, 0xC276C), 'void', ['pointer', 'pointer'])
      },
      DropGUIContainer: {
        ctor: libg.offset(0x56BD18, 0xAD6F0),
        addGameButton: new NativeFunction(libg.offset(0x56C4C8, 0xAD8AC), 'pointer', ['pointer', 'pointer', 'int'])
      },
      ResourceListener: {
        addFile: new NativeFunction(libg.offset(0x9EF38C, 0xA66374), 'void', ['pointer', 'pointer', 'pointer'])
      },
      HomeMode: {
        enter: libg.offset(0x624300, 0x363B0C),
        getPlayerName: new NativeFunction(libg.offset(0xBD22A4, 0x2A5B8), 'pointer', ['pointer'])
      },
      LogicDailyData: {
        isBrawlPassPremiumUnlocked: new NativeFunction(libg.offset(0xD4112C, 0x4C360C), 'int', ['pointer'])
      },
      LogicDataTables: {
        getColorGradientByName: new NativeFunction(libg.offset(0xC51D2C, 0x40AE64), 'pointer', ['pointer', 'pointer'])
      },
      Application: {
        copyString: new NativeFunction(libg.offset(0xB8F51C, 0xB90640), 'void', ['pointer']),
        copyString_helper(t) {
          this.copyString(StringUtils.getScPtr(t));
        },
        openUrl: new NativeFunction(libg.offset(0xB2DDA0, 0xB8DCB4), 'pointer', ['pointer']),
        openUrl_helper(t) {
          this.openUrl(StringUtils.getScPtr(t));
        }
      },
      PlayerInfo: {
        refreshPlayerHeader: new NativeFunction(libg.offset(0x5A5A9C, 0xDCA9C), 'void', ['pointer'])
      },
      HashTagCodeGenerator: {
        toCode: new NativeFunction(libg.offset(0xDACD50, 0x5040B0), 'pointer', ['pointer', 'pointer'])
      },
      BandMailPopup: {
        ctor: libg.offset(0xC75BA4, 0x15958C)
      },
      BattleScreen: {
        activateSkill: libg.offset(0x7A237C, 0x2689A0),
        getClosestTargetForAutoshoot: libg.offset(0x7B2844, 0x2775E8),
        update: libg.offset(0x7A26D4, 0x268E3C),
        isAfk: new NativeFunction(libg.offset(0x7ADCD8, 0x6079FC), 'bool', ['pointer']),
        enter: libg.offset(0x79E10C, 0xB9EB0),
        exit: libg.offset(0x7A0164, 0x282F74),
        getInstance: new NativeFunction(libg.offset(0x7ADD7C, 0x272E84), 'pointer', []),
        updateCameraParameters: new NativeFunction(libg.offset(0x79F5DC, 0x465EAC), 'void', ['pointer', 'float'])
      },
      BattleMode: {
        getInstance: new NativeFunction(libg.offset(0x8EBCF8, 0x371160), 'pointer', ['pointer']),
        getInstance2: new NativeFunction(libg.offset(0x8EBCF8, 0x371160), 'pointer', []),
        enter: libg.offset(0x8ED2F0, 0x2DF768),
        exit: libg.offset(0x8FEB2C, 0x3815D0),
        update: libg.offset(0x8F2C8C, 0xF24318)
      },
      LogicBattleModeClient: {
        getOwnCharacter: new NativeFunction(libg.offset(0xD685AC, 0x4E0B14), 'pointer', ['pointer']),
        update: libg.offset(0xD66B98, 0x4DF4E4),
        setClientPredictionMoveTo: new NativeFunction(libg.offset(0xD68710, 0x4E0C34), 'pointer', ['pointer', 'int', 'int', 'bool']),
        getOwnPlayerTeam: new NativeFunction(libg.offset(0xD682A0, 0x49F48C), 'uint32', ['pointer']),
        getTileMap: new NativeFunction(libg.offset(0xD6852C, 0x3F436C), 'pointer', ['pointer'])
      },
      LogicGameObjectClient: {
        getX: new NativeFunction(libg.offset(0xCD090C, 0x239D4), 'uint32', ['pointer']),
        getY: new NativeFunction(libg.offset(0xCD0914, 0x46B984), 'uint32', ['pointer']),
        getGlobalID: new NativeFunction(libg.offset(0xCD08B8, 0x46B930), 'uint32', ['pointer']),
        getData: new NativeFunction(libg.offset(0xCD0660, 0x3FDD0), 'pointer', ['pointer']),
        getTileX: new NativeFunction(libg.offset(0xCD08E0, 0x46B958), 'int', ['pointer'])
      },
      LogicProjectileData: {
        getSpeed: new NativeFunction(libg.offset(0xC754F4, 0xC42BC), 'uint32', ['pointer']),
        getRadius: new NativeFunction(libg.offset(0xC7556C, 0xB0310), 'uint32', ['pointer'])
      },
      LogicCharacterClient: {
        getCharacterData: new NativeFunction(libg.offset(0xC9AE1C, 0x3481C), 'pointer', ['pointer'])
      },
      LogicCharacterData: {
        getCollisionRadius: new NativeFunction(libg.offset(0xC2BA1C, 0x3F4374), 'uint32', ['pointer'])
      },
      LogicData: {
        getName: new NativeFunction(libg.offset(0xC34604, 0x400324), 'pointer', ['pointer'])
      },
      LogicConfData: {
        getIntValue: new NativeFunction(libg.offset(0xD3A48C, 0x185280), 'int', ['pointer', 'int', 'int'])
      },
      LogicLong: {
        getHigherInt: new NativeFunction(libg.offset(0x9BDACC, 0x509840), 'int', ['pointer']),
        getLowerInt: new NativeFunction(libg.offset(0x9BDAD4, 0xD7390), 'int', ['pointer'])
      },
      LogicClientAvatar: {
        isTutorialState: new NativeFunction(libg.offset(0xBD4360, 0x9C8910), 'int', ['pointer'])
      },
      ClientInput: {
        ctor: new NativeFunction(libg.offset(0xD2D5E4, 0x4B5A4C), 'pointer', ['pointer', 'int'])
      },
      ClientInputManager: {
        addInput: new NativeFunction(libg.offset(0x746044, 0x22261C), 'pointer', ['pointer', 'pointer'])
      },
      MessageManager: {
        receiveMessage: new NativeFunction(libg.offset(0x76229C, 0x237C80), 'pointer', ['pointer', 'pointer']),
        sendMessage: new NativeFunction(libg.offset(0x7621B4, 0x237BD4), 'pointer', ['pointer', 'pointer']),
        instance: libg.offset(0x115E1E0, 0xEDAEE0)
      },
      TeamJoinRequestPopup: {
        ctor: libg.offset(0x720D60, 0x102444)
      },
      StartLoadingMessage: {
        ctor: libg.offset(0xD12084, 0x4A6A78)
      },
      SimpleWebView: {
        ctor: new NativeFunction(libg.offset(0x83A5E4, 0x2E54E4), 'pointer', ['pointer']),
        loadURL: new NativeFunction(libg.offset(0x83A9C4, 0x2E58E0), 'void', ['pointer', 'pointer']),
        showSimpleWebView(t, e) {
          let n = malloc(544);
          Offsets.libg.SimpleWebView.ctor(n);
          Offsets.libg.SimpleWebView.loadURL(n, StringUtils.getScPtr(t));
          Offsets.libg.GenericPopup.setTitle(n, StringUtils.getScPtr(e));
          Offsets.libg.GUI.showPopup(Offsets.libg.GUI.getInstance(), n, 0, 1, 1);
        }
      },
      TeamMemberItem: {
        setMember: new NativeFunction(libg.offset(0x71CB88, 0xF241B8), 'void', ['pointer', 'pointer', 'pointer', 'pointer', 'pointer', 'int', 'int', 'int'])
      },
      HomePage: {
        ctor: libg.offset(0x88BDB8, 0x326240)
      },
      GameScreen: {
        getLogicBattle: new NativeFunction(libg.offset(0x7B6188, 0x2798AC), 'pointer', ['pointer'])
      },
      GameObject: {
        getTileX: new NativeFunction(libg.offset(0x4E0ECC, 0x40854), 'int', ['pointer']),
        getTileY: new NativeFunction(libg.offset(0x4E0EDC, 0x40864), 'int', ['pointer']),
        getTileZ: new NativeFunction(libg.offset(0x4E0EEC, 0x40874), 'int', ['pointer']),
        getLogic: new NativeFunction(libg.offset(0x4DFF18, 0x3FDD0), 'pointer', ['pointer'])
      },
      LogicTileData: {
        getBaseExportName: new NativeFunction(libg.offset(0xC94D00, 0x4406F0), 'pointer', ['pointer'])
      },
      LogicTileMap: {
        getTile: new NativeFunction(libg.offset(0xBDC788, 0x3B2DF8), 'pointer', ['pointer', 'int']),
        getTile2: new NativeFunction(libg.offset(0xBDA114, 0x3B14D0), 'pointer', ['pointer', 'int', 'int'])
      },
      LogicGameObjectManagerClient: {
        getGameObjects: new NativeFunction(libg.offset(0xCD103C, 0xBF421C), 'pointer', ['pointer'])
      },
      RenderSystem: {
        destroyTile: new NativeFunction(libg.offset(0x4F1720, 0x9A3F48), 'pointer', ['pointer', 'int', 'int', 'bool', 'bool', 'bool'])
      },
      Projectile: {
        getAngle: new NativeFunction(libg.offset(0x4E8C8C, 0x47A4C), 'float', ['pointer']),
        update: new NativeFunction(libg.offset(0x4E73B4, 0x46528), 'pointer', ['pointer', 'float'])
      },
      GameStateManager: {
        getInstance: new NativeFunction(libg.offset(0x8F39B0, 0x377CD0), 'pointer', [])
      },
      TeamManager: {
        onTeamMessage: new NativeFunction(libg.offset(0x5ADF4C, 0xE9608), 'void', ['pointer', 'pointer']),
        onTeamLeftMessage: new NativeFunction(libg.offset(0x5AD7C8, 0x9B7D64), 'void', ['pointer', 'pointer']),
        getInstance: new NativeFunction(libg.offset(0x4C8DA4, 0x7518), 'pointer', [])
      },
      PlayerNameColorPopup: {
        ctor: libg.offset(0x6AD9A8, 0xE89E4)
      },
      DownloadedImage: {
        ctor: new NativeFunction(libg.offset(0x5610D0, 0xA6EB0), 'pointer', ['pointer', 'pointer', 'pointer', 'int', 'int', 'int', 'int']),
        createFromLocalFile: new NativeFunction(libg.offset(0x561430, 0xA71F4), 'pointer', ['pointer', 'pointer', 'pointer'])
      },
      ScrollArea: {
        ctor: new NativeFunction(libg.offset(0x9A61AC, 0x2CE438), 'void', ['pointer', 'pointer', 'int']),
        enablePinching: new NativeFunction(libg.offset(0x5906F8, 0x9FFB4C), 'pointer', ['pointer', 'int']),
        enableHorizontalDrag: new NativeFunction(libg.offset(0xCFB16C, 0x9FFBD4), 'pointer', ['pointer', 'int']),
        enableVerticalDrag: new NativeFunction(libg.offset(0xCF15B8, 0x9FFBC8), 'pointer', ['pointer', 'int']),
        setAlignment: new NativeFunction(libg.offset(0x5676D0, 0x9FFFB8), 'pointer', ['pointer', 'int']),
        addContent: new NativeFunction(libg.offset(0x9A661C, 0x1A98A8), 'pointer', ['pointer', 'pointer', 'double'])
      },
      AboutScreen: {
        ctor: libg.offset(0x7518CC, 0x22A420)
      },
      CombatHUD: {
        ctor: libg.offset(0x531530, 0xF2402C)
      },
      Character: {
        update: libg.offset(0x4D412C, 0x98794),
        updateHealthBar: new NativeFunction(libg.offset(0x4D9C50, 0x3A330), 'void', ['pointer', 'float'])
      },
      FramerateManager: {
        setSegment: new NativeFunction(libg.offset(0xB32968, 0xB9805C), 'void', ['pointer', 'int']),
        sm_pInstance: libg.offset(0x115ED88, 0xEDC068),
        setFPS(t) {
          this.sm_pInstance.writeDouble(t);
        }
      },
      LogicPlayer: {
        decode: new NativeFunction(libg.offset(0xB09FB0, 0x9AEE78), 'void', ['pointer', 'pointer'])
      },
      TeamMemberEntry: {
        decode: new NativeFunction(libg.offset(0xD1BBE4, 0x4A7DFC), 'void', ['pointer', 'pointer'])
      },
      BattleLogPlayerEntry: {
        ctor: new NativeFunction(libg.offset(0xD24C68, 0x4A9F54), 'void', ['pointer', 'pointer'])
      },
      FriendEntry: {
        decode: new NativeFunction(libg.offset(0xD307C0, 0xFB504), 'void', ['pointer', 'pointer'])
      },
      PlayerProfile: {
        decode: new NativeFunction(libg.offset(0xD49260, 0x4C80B0), 'void', ['pointer', 'pointer'])
      },
      AllianceMemberEntry: {
        decode: new NativeFunction(libg.offset(0xD13CA8, 0x4A1838), 'void', ['pointer', 'pointer'])
      },
      Messages: {
        ClientHelloMessage: new NativeFunction(libg.offset(0xD119C4, 0x49CE5C), 'pointer', ['pointer']),
        LoginMessage: new NativeFunction(libg.offset(0xD0F944, 0x49DFA8), 'pointer', ['pointer']),
        TeamMemberStatusMessage: new NativeFunction(libg.offset(0xD4C1C4, 0x70440C), 'pointer', ['pointer', 'int']),
        PlayAgainMessage_PlayAgainMessage: new NativeFunction(libg.offset(0xD26648, 0x4DD950), 'pointer', ['pointer', 'bool', 'bool']),
        TeamChatMessage_encode: new NativeFunction(libg.offset(0xD19BDC, 0x4A6180), 'pointer', ['int']),
        TeamChatMessage: new NativeFunction(libg.offset(0xD19BA4, 0x4A6144), 'pointer', ['pointer']),
        TeamInviteMessage: new NativeFunction(libg.offset(0xD1AD34, 0x948E18), 'void', ['pointer', 'int', 'int', 'int', 'int']),
        TeamAllianceMemberInviteMessage: new NativeFunction(libg.offset(0xD19564, 0xBEF3C0), 'void', ['pointer', 'int', 'int', 'int']),
        StartSpectateMessage: new NativeFunction(libg.offset(0xD4D694, 0xBCBE8C), 'pointer', ['pointer', 'pointer', 'bool']),
        PlayerStatusMessage: new NativeFunction(libg.offset(0xAC533C, 0x6FD670), 'pointer', ['pointer', 'int', 'int']),
        LatencyTestMessage: new NativeFunction(libg.offset(0x9BF894, 0x49BC80), 'void', ['pointer', 'bool', 'int', 'int']),
        SendLatencyTestResultsMessage: libg.offset(0x9BF480, 0xA19A20)
      },
      Other: {
        ModifierOffset: libg.offset(0x6A35A0, 0x1BF83C),
        EmojiAnimations: new NativeFunction(libg.offset(0x7EC788, 0x299130), 'void', ['pointer', 'int', 'int', 'float']),
        unknownStringOffset: libg.offset(0x9A1224, 0x9FAE9C),
        onclickMultiLineInputOkFunc: new NativeFunction(libg.offset(0x5D5C34, 0x102798), 'pointer', ['pointer', 'pointer', 'int']),
        onclickInputOkFunc: new NativeFunction(libg.offset(0x72122C, 0xE4FEC), 'pointer', ['pointer', 'pointer', 'int']),
        BattleEndScreen_enterAddr: libg.offset(0x5D7988, 0x120224),
        NativeDialog: new NativeFunction(libg.offset(0xB37550, 0xB9C350), 'pointer', ['pointer', 'pointer', 'pointer', 'pointer', 'pointer', 'pointer']),
        NativeDialog_helper(t, e, n, o, i) {
          this.NativeDialog(
            ptr(0),
            StringUtils.getScPtr(t),
            StringUtils.getScPtr(e),
            StringUtils.getScPtr(n),
            StringUtils.getScPtr(i),
            StringUtils.getScPtr(o)
          );
        },
        CustomInputOffset1: libg.offset(0x105C3C0, 0xD89A70),
        CustomInputOffset2: libg.offset(0x105C6A8, 0xD89D58),
        SpectateWithIDOffset1: libg.offset(0xDACCCC, 0x504030),
        SpectateWithIDOffset2: libg.offset(0xDACD58, 0x261144)
      }
    },
    native: {
      access: new NativeFunction(LogicDefines.modules.libc.getExportByName('access'), 'int', ['pointer', 'int']),
      malloc: new NativeFunction(LogicDefines.modules.libc.getExportByName('malloc'), 'pointer', ['uint']),
      free: new NativeFunction(LogicDefines.modules.libc.getExportByName('free'), 'void', ['pointer']),
      mkdir: new NativeFunction(LogicDefines.modules.libc.getExportByName('mkdir'), 'int', ['pointer', 'uint']),
      fread: new NativeFunction(LogicDefines.modules.libc.getExportByName('fread'), 'int', ['pointer', 'int', 'int', 'pointer']),
      fopen: new NativeFunction(LogicDefines.modules.libc.getExportByName('fopen'), 'pointer', ['pointer', 'pointer']),
      fclose: new NativeFunction(LogicDefines.modules.libc.getExportByName('fclose'), 'int', ['pointer']),
      ftell: new NativeFunction(LogicDefines.modules.libc.getExportByName('ftell'), 'int', ['pointer']),
      fseek: new NativeFunction(LogicDefines.modules.libc.getExportByName('fseek'), 'int', ['pointer', 'int', 'int']),
      rewind: new NativeFunction(LogicDefines.modules.libc.getExportByName('rewind'), 'void', ['pointer']),
      chmod: new NativeFunction(LogicDefines.modules.libc.getExportByName('chmod'), 'int', ['pointer', 'int']),
      stat: new NativeFunction(LogicDefines.modules.libc.getExportByName('stat'), 'int', ['pointer', 'pointer']),
      unlink: new NativeFunction(LogicDefines.modules.libc.getExportByName('unlink'), 'int', ['pointer']),
      inet_addr: new NativeFunction(LogicDefines.modules.libc.findExportByName('inet_addr'), 'int', ['pointer']),
      connectFunc: new NativeFunction(LogicDefines.modules.libc.findExportByName('connect'), 'int', ['int', 'pointer', 'int']),
      closeFunc: new NativeFunction(LogicDefines.modules.libc.findExportByName('close'), 'int', ['int']),
      sendFunc: new NativeFunction(LogicDefines.modules.libc.findExportByName('send'), 'int', ['int', 'pointer', 'int', 'int']),
      socketFunc: new NativeFunction(LogicDefines.modules.libc.findExportByName('socket'), 'int', ['int', 'int', 'int']),
      recvFunc: new NativeFunction(LogicDefines.modules.libc.findExportByName('recv'), 'int', ['int', 'pointer', 'int', 'int']),
      getHostByName: new NativeFunction(LogicDefines.modules.libc.findExportByName('gethostbyname'), 'pointer', ['pointer']),
      setSockopt: new NativeFunction(LogicDefines.modules.libc.findExportByName('setsockopt'), 'int', ['int', 'int', 'int', 'pointer', 'int']),
      kill() {
        new NativeFunction(Module.findGlobalExportByName('kill'), 'int', ['int', 'int'])(Process.id, 9);
      }
    }
  };
  const AF_INET = 2;
  const SOCK_STREAM = 1;
  const IPPROTO_TCP = 6;
  const SOL_SOCKET = 1;
  const SO_SNDBUF = 7;
  const SO_RCVBUF = 8;
  const TCP_NODELAY = 1;
  const F_OK = 0;

  const libandroid = Process.findModuleByName('libandroid.so');
  const AAssetManager_open = new NativeFunction(libandroid.getExportByName('AAssetManager_open'), 'pointer', ['pointer', 'pointer', 'int']);
  const AAsset_getLength = new NativeFunction(libandroid.getExportByName('AAsset_getLength'), 'int', ['pointer']);
  const AAsset_read = new NativeFunction(libandroid.getExportByName('AAsset_read'), 'int', ['pointer', 'pointer', 'int']);
  const AAsset_close = new NativeFunction(libandroid.getExportByName('AAsset_close'), 'void', ['pointer']);
  const nativeAccess = new NativeFunction(Offsets.native.access, 'int', ['pointer', 'int']);

  Global.malloc = Offsets.native.malloc;
  Global.TaleUtils = {
    Directory: {
      exists(path) {
        const buf = malloc(256);
        const pathPtr = Memory.allocUtf8String(path);
        return Offsets.native.stat(pathPtr, buf) === 0 && (buf.readU32() & 0o170000) === 0o040000;
      },
      create(path, mode = 0o755) {
        return Offsets.native.mkdir(Memory.allocUtf8String(path), mode);
      }
    },
    File: {
      exists(path) {
        return nativeAccess(Memory.allocUtf8String(path), F_OK) === 0;
      },
      setAAssetManagerPtr(ptr) {
        St = ptr;
      },
      readFromAssets(filename) {
        if (LogicDefines.isPlatformiOS()) {
          const fullPath = ObjC.classes.NSBundle.mainBundle().bundlePath().toString() + '/res/' + filename;
          const content = ObjC.classes.NSString.stringWithContentsOfFile_encoding_error_(fullPath, 4, NULL);
          return content ? content.toString() : null;
        }
        if (!St) return null;
        const asset = AAssetManager_open(St, StringUtils.getStrPtr(filename), 2);
        if (asset.isNull()) return null;
        const len = AAsset_getLength(asset);
        const buf = malloc(len);
        AAsset_read(asset, buf, len);
        AAsset_close(asset);
        return buf.readUtf8String(len);
      },
      read(path, mode) {
        return mode === 'rb' ? File.readAllBytes(path) : File.readAllText(path);
      },
      delete(path) {
        Offsets.native.unlink(Memory.allocUtf8String(path));
      },
      write(path, data, mode = 'w+') {
        const f = new File(path, mode);
        f.write(data);
        f.close();
      }
    },
    Network: {
      downloadBinaryHttp(url, callbacks) {
        const match = url.match(/^https?:\/\/([^\/]+)(\/.*)?$/);
        if (!match) throw new Error('Invalid URL');
        const host = match[1];
        const path = match[2] || '/';
        const port = 80;

        const hostPtr = Memory.allocUtf8String(host);
        const addr = Offsets.native.getHostByName(hostPtr).add(24).readPointer().readPointer().readByteArray(4);

        const sock = Offsets.native.socketFunc(AF_INET, SOCK_STREAM, IPPROTO_TCP);
        if (sock < 0) throw new Error('Failed to create socket');

        const bufSizePtr = Offsets.native.malloc(4);
        bufSizePtr.writeInt(262144);
        Offsets.native.setSockopt(sock, SOL_SOCKET, SO_SNDBUF, bufSizePtr, 4);
        Offsets.native.setSockopt(sock, SOL_SOCKET, SO_RCVBUF, bufSizePtr, 4);

        const nodelayPtr = Offsets.native.malloc(4);
        nodelayPtr.writeInt(1);
        Offsets.native.setSockopt(sock, IPPROTO_TCP, TCP_NODELAY, nodelayPtr, 4);

        const sockaddr = Offsets.native.malloc(16);
        const htons = (x) => ((x << 8) & 255) | ((x >> 8) & 255);
        sockaddr.writeU16(AF_INET);
        sockaddr.add(2).writeU16(htons(port));
        sockaddr.add(4).writeByteArray(addr);
        sockaddr.add(8).writeByteArray(new Array(8).fill(0));

        if (Offsets.native.connectFunc(sock, sockaddr, 16) !== 0) {
          Offsets.native.closeFunc(sock);
          throw new Error('Connect failed');
        }

        const request = `GET ${path} HTTP/1.1\r\nHost: ${host}\r\nConnection: close\r\n\r\n`;
        const reqPtr = Memory.allocUtf8String(request);
        if (Offsets.native.sendFunc(sock, reqPtr, request.length, 0) < 0) {
          Offsets.native.closeFunc(sock);
          throw new Error('Failed to send request');
        }

        const chunkSize = 65536;
        const chunkBuf = Offsets.native.malloc(chunkSize);
        const chunks = [];
        let totalSize = 0;
        let bytesRead = Offsets.native.recvFunc(sock, chunkBuf, chunkSize, 0);
        while (bytesRead > 0) {
          chunks.push(new Uint8Array(chunkBuf.readByteArray(bytesRead)));
          totalSize += bytesRead;
          bytesRead = Offsets.native.recvFunc(sock, chunkBuf, chunkSize, 0);
        }
        Offsets.native.closeFunc(sock);
        Offsets.native.free(chunkBuf);

        const result = new Uint8Array(totalSize);
        let offset = 0;
        for (const chunk of chunks) {
          result.set(chunk, offset);
          offset += chunk.length;
        }

        let headerEnd = -1;
        const searchLimit = Math.min(8192, totalSize);
        for (let i = 0; i < searchLimit - 3; i++) {
          if (result[i] === 13 && result[i + 1] === 10 && result[i + 2] === 13 && result[i + 3] === 10) {
            headerEnd = i;
            break;
          }
        }
        if (headerEnd === -1) throw new Error('Invalid HTTP response');

        callbacks.onComplete(result.slice(headerEnd + 4).buffer);
      },
      downloadFileAndMoveFromUrl(url, destPath, callback) {
        TaleUtils.Network.downloadBinaryHttp(url, {
          onComplete(data) {
            TaleUtils.File.write(destPath, data, 'wb');
            callback(data);
          }
        });
      }
    }
  };
  const HEADER_TEXT = 'hi whale, why are you here? theres nothing important here\n';

  Global.TaleConfig = {
    configPath: LogicDefines.appPath + '/save/tale.dll',

    write(path, data) {
      let content = '';
      for (const key in data) {
        const val = data[key];
        content += val === null
          ? `${key}=null\n`
          : typeof val === 'object'
            ? `${key}=${JSON.stringify(val)}\n`
            : `${key}=${val}\n`;
      }
      const encrypted = Bt.encrypt(content);
      const out = new Uint8Array(HEADER_TEXT.length + encrypted.length);
      for (let i = 0; i < HEADER_TEXT.length; i++) {
        out[i] = HEADER_TEXT.charCodeAt(i);
      }
      out.set(encrypted, HEADER_TEXT.length);

      const dir = this.configPath.match(/.*\/save\//)[0];
      if (!TaleUtils.Directory.exists(dir)) {
        TaleUtils.Directory.create(dir);
      }
      TaleUtils.File.write(path, out, 'wb');
    },

    read(path) {
      try {
        const raw = TaleUtils.File.read(path, 'rb');
        const data = new Uint8Array(raw);
        let headerLen = 0;
        while (headerLen < data.length && data[headerLen] !== 10) headerLen++;
        headerLen++;

        const result = {};
        const lines = Bt.decrypt(data.subarray(headerLen)).split('\n');
        for (const line of lines) {
          const eq = line.indexOf('=');
          if (eq === -1) continue;
          const key = line.slice(0, eq);
          const val = line.slice(eq + 1);

          if (val === 'null') {
            result[key] = null;
          } else if (val === 'true' || val === 'false') {
            result[key] = val === 'true';
          } else if (val.startsWith('{') || val.startsWith('[')) {
            try {
              result[key] = JSON.parse(val);
            } catch {
              result[key] = val;
            }
          } else if (isNaN(val)) {
            result[key] = val;
          } else {
            result[key] = Number(val);
          }
        }
        return result;
      } catch {
        this.saveConfig();
        return Config;
      }
    },

    saveConfig() {
      this.write(this.configPath, Config);
    },

    mergeConfig(target, source) {
      const result = JSON.parse(JSON.stringify(target));
      for (const key in source) {
        if (!(key in result)) continue;
        const targetVal = result[key];
        const sourceVal = source[key];
        if (
          typeof targetVal !== 'object' ||
          targetVal === null ||
          typeof sourceVal !== 'object' ||
          sourceVal === null ||
          Array.isArray(targetVal)
        ) {
          result[key] = sourceVal;
        } else {
          result[key] = this.mergeConfig(targetVal, sourceVal);
        }
      }
      return result;
    },

    loadConfig() {
      const defaults = JSON.parse(JSON.stringify(Config));
      if (!TaleUtils.File.exists(this.configPath)) return;
      const saved = this.read(this.configPath);
      Config = this.mergeConfig(defaults, saved);
      TemporaryConfig = JSON.parse(JSON.stringify(Config));
      this.saveConfig();
      return Config;
    }
  };
  if (A.isInEarlyAccess !== 0) {
    initTaleServer();
    Mt();
    return;
  }
}

function tryInit() {
  const mod = Process.findModuleByName(t.name);
  if (!mod) return false;
  t.base = mod.base;
  t.size = mod.size;
  init();
  return true;
}

if (!tryInit()) tryInit();

module.exports = {
  Offsets: Global.Offsets,
  TaleUtils: Global.TaleUtils,
  TaleConfig: Global.TaleConfig,
  init
};
