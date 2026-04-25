const GlobalTextData = {
  telegramText: ColorUtils.colorize('t.me/talebrawl', 'red', 'purple', 'blue'),
  telegramTextShort: ColorUtils.colorize('@talebrawl', 'red', 'purple', 'blue'),
  creditsText: `
╔═══════════════════════════════════╗
▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂

𝐓𝐚𝐥𝐞 𝐒𝐭𝐚𝐫𝐬 | ${Versioning.baseWithEnv()}
t.me/talebrawl

${ColorUtils.colorize('𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐫𝐬', 'cyan', 'white', 'cyan')}

${ColorUtils.colorize('MetricsectDev (DC: metricsectdev)', 'red', 'purple', 'blue')}
${ColorUtils.colorize('Gud (DC: libgud)', 'red', 'purple', 'blue')}
${ColorUtils.colorize('Hazard (DC: hazaardw)', 'red', 'purple', 'blue')}
${ColorUtils.colorize('Squeak (DC: squleak)', 'red', 'purple', 'blue')}
${ColorUtils.colorize('Efee (DC: efqp)', 'red', 'purple', 'blue')}
${ColorUtils.colorize('Exsa (DC: exsa02)', 'red', 'purple', 'blue')}

▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂
╚════════════════════════════════════╝
`,
  lobbyInfoText:
    'Tale Stars-' +
    LogicDefines.platformBigLetter +
    ' ' +
    Versioning.toString() +
    '\nt.me/talebrawl\ndiscord.gg/tsmod'
};
const Localization = {
  error: 'Error',
  chromaticNameEnabled:
    'Chromatic name enabled.\nRestart the game or change the color of your player name.',
  chromaticNameDisabled:
    'Chromatic name disabled.\nRestart the game or change the color of your player name.',
  skinUnlocked: 'Skin unlocked: ',
  invalidSkin: 'Invalid skin name provided.',
  themeSet: 'Theme is set.',
  themeReset: 'Theme has been reset.',
  typeSkinName: 'TYPE SKIN NAME',
  skinName: 'SKIN NAME',
  unlock: 'UNLOCK',
  unlockAllEmotes: 'All emojis unlocked.',
  rankedRanks: 'Level 1 pick mod has been enabled in Ranked.',
  anyModDisabled: '<cff0900>disabled!</c>',
  anyModEnabled: '<c00f900>enabled!</c>',
  copiedTag: 'Tag copied: ',
  gameClosing: '<cff0000>Game is closing to save changes, please reopen.</c>',
  statusSet: 'Status set to: ',
  statusSetFailed: 'You need to join a team to change status.',
  emptyPinModEnabled: 'Empty pin is enabled. Send 5th emote to send empty pin.',
  seeSelectedBrawlersModEnabled: 'Mod is enabled. If you are in a team, exit and rejoin.',
  chatSpamFailed: 'You need to join a team to chat spam.',
  chatSpamStart: 'START',
  chatSpamStop: 'STOP',
  chatSpamStopped: 'Chat spam stopped.',
  chatSpamStarted: 'Chat spam started.',
  setSpamText: 'SET SPAM TEXT',
  setSpamTextBtn: 'SET TEXT',
  setSpamTextSuccesfully: 'Spam text set successfully.',
  setSpamTextFailed: 'The text to be spammed must be maximum 128 characters/minimum 1 character.',
  inviteById: 'INVITE BY ID',
  inviteByIdOkeyBtn: 'INVITE',
  inviteByIdFailed: 'You need to join a team to invite by ID.',
  spectateWithID: 'SPECTATE WITH ID',
  spectateWithIDBtn: 'SPECTATE',
  spectateEveryMatchAsBrawltv: 'SPECTATE EVERY MATCH AS BRAWLTV',
  sendSpectate: 'SET SPECTATORS',
  setSpectatorsCount: 'SET SPECTATORS COUNT',
  spectatorsSentSuccesfully: 'Spectators set succesfully.',
  spectatorsSentFailed: 'The number must be at least 1/at most 1000000.',
  spectatorsOnlyVisibleToYou: 'The spectators you sent will be <cff2600>only visible to you</c>',
  fontChanged: 'Font changed.',
  helpTitle: 'HELP',
  welcomeTitle: 'WELCOME TO TALE STARS',
  welcomeText1: 'Thanks for downloading <cff0084>Tale Stars!</c>',
  welcomeText2: 'Click EXPLORE MODS button to learn the features.',
  modFeatures: {
    xrayAutoshootDescription:
      'When you autoshoot with an enemy visible,\nyour brawler auto-targets and attacks\nthem, continuing to track them unless\nyou switch targets.',
    aimBotDescription:
      'Auto aims at enemies and gives them an 85%\nchance of being hit by a bullet.',
    autoDodgeDescription: 'Automatically dodges enemy bullets',
    autoChargeDescription: "Auto charging janet, hank, and angelo's\nrange to max range",
    battleServerChangerDescription: 'Allows you to change Battle Server',
    chromaticNameDescription:
      'Allows you to choose a chromatic name\neven if you dont have Brawl Pass',
    unlockAllEmotesDescription:
      'Allows you to unlock all matcherino\nworld finals and all skin pins',
    rankedModDescription: 'Allows you to play any power level brawler 1-11\nin Ranked',
    naniUltiModDescription: 'Lets you control Nani instead of Peep during\nher super.',
    oldRankSystemDescription: 'Changes old ranking system tier 1-50 to rank\n1-35.',
    themeChangerDescription:
      'Allows you change the main menu theme and\nloading screen with an older one.',
    skinChangerDescription: 'Allows you to change the skin of any brawler.',
    spectatorsMenuDescription: 'Allows you 1-1,000,000 normal or\nbrawltv spectators to ur match.',
    reloadGameDescription: 'Reloads game... 🐬🥀',
    antiAutoSuperDescription: 'Disables Auto Super, needing manual aim\nto use super.',
    hideUltiAimingDescription: 'Hides super aiming so other cant see\nwhen your aiming your super.',
    emptyPinDescription: 'When you send the 5th pin in a match it sends\na blank pin.',
    battleCardModDescription: 'Changes your battle card to Old Master\nor Pro Rank.',
    autoPlayAgainDescription: 'Automatically clicks "Play Again" after a\nmatch ends.',
    seeSelectedBrawlersDescription:
      "Have the ability to see opponent's brawlers\nin friendly matches.",
    statusChangerDescription: 'Lets you fake your status while in a team.',
    antiAutoshootDescription: 'Disables Auto Shoot, needing manual aim\nto attack.',
    mapMakerModDescription: 'Unlocks hidden items you can place in your\nmap maker maps.',
    nameChangerDescription: 'Allows you to change your name visually.',
    spectateWithIDDescription:
      'Allows you to spectate players directly\nby entering their player tag. (e.g., #2PP.)',
    randomSpraySpamDescription:
      'Automatically sprays emotes in random\ndirections around your brawler.',
    chatSpamDescription: 'Flood the chat by spamming a message you can\nset.',
    decreasedCooldownDescription: 'Reduces ping during matches.',
    antiAfkDescription: 'Prevents being AFK in matches.',
    removeBlackBordersDescription: 'Removes black borders in matches.',
    inviteByIdDescription:
      'Lets you invite friends to friendly matches\nby their tag even if you’re not the team leader.',
    fontChangerDescription: 'Changes the in-game font to custom fonts.',
    urlMenuDescription: 'Allows you to open URLs from within game.',
    modSettingsDescription: 'Allows you to change general settings related to the mod.',
    helpDescription: '🥀...',
    optimizeGameDescription: 'Allows you to optimize game.'
  },
  resetText: 'Reset',
  resetTextBigLetter: 'RESET',
  openCustomUrl: 'OPEN CUSTOM URL',
  openUrl: 'OPEN URL',
  customUrls: 'Custom URLs',
  accountStats: 'Account Stats',
  settingsSaved: 'Settings saved',
  modSettings: 'MOD SETTINGS',
  modMenuButton: 'MOD MENU BUTTON',
  modMenuColor: 'SET COLOR',
  modMenuPosition: 'SET POSITION',
  modMenuSettings: 'MOD MENU BUTTON SETTINGS',
  creditText: 'CREDIT TEXT',
  topLeft: 'Top left',
  topRight: 'Top right',
  bottomLeft: 'Bottom left',
  bottomRight: 'Bottom right',
  positionChanged: 'Position changed successfully.',
  wait: '<ca8bd00>Please wait, server is changing!</c>',
  serverIsChanged: '<c00f900>Server succesfully changed to <SERVER></c>',
  battleServerReset: 'Server reset succesfully.',
  selectRegion: 'SELECT REGION',
  nameChanger: 'NAME CHANGER',
  nameChangerBtn: 'SET',
  gradient: 'GRADIENT',
  normal: 'NORMAL',
  changeName: 'CHANGE NAME',
  setNameFailed: 'Name must be at least 3 characters',
  updateTitle: 'Join t.me/talebrawl for new Tale Stars update!',
  updateDescription: 'Join t.me/talebrawl for about new Tale Stars update!',
  updateButton: 'OUR TELEGRAM (t.me/talebrawl)',
  pleaseGoToLobby: 'Please go to lobby and try again.',
  setCustomGradientColor: 'SET CUSTOM GRADIENT COLOR',
  clickOnTheMod: 'Click on the mod you want to get information about',
  versionInfo: 'VERSION INFO',
  spectatorsReset: 'Spectators reset.',
  talePlusNotActive: '<cff2600>[-] Tale+ is not active!</c>',
  talePlusActive:
    '<c00fe1f>[<c00fe3f>+<c00fe5f>]<c00fe7f> <c00fd9f>T<c00fdbf>a<c00fddf>l<c00fdff>e<c00fcdf>+<c00fcbf> <c00fb9f>a<c00fb7f>c<c00fa5f>t<c00fa3f>i<c00f91f>v<c00f900>e</c>',
  keyCopiedToClipboard:
    '<c00f900>Key copied to clipboard!</c>\nIf you have purchased Tale Stars, you can activate it with /activate command',
  antiCensorEnabled:
    'Anti Censor enabled.\n<cff0900>WARNING: If users report you, there is a ban risk</c>',
  antiCensorDisabled: 'Anti Censor disabled.',
  xrayTargetSelected: '<c929292>[X-Ray]</c> Target player set.',
  configResetSuccesfully: 'Config reset succesfully.',
  addedToBlacklist: 'added to blacklist',
  removedFromBlacklist: 'removed from blacklist'
};
Global.AccountInfo = {
  ID: null,
  TAG: null
};
Global.LocalizationStatic = t;
Global.Localization = e;
Global.Config = {
  xRayModEnabled: false,
  aimBotModEnabled: false,
  autoDodgeModEnabled: false,
  chromaticNameEnabled: false,
  willowModEnabled: false,
  lolaModEnabled: false,
  antiAutoSuperModEnabled: false,
  hideUltiAimingModEnabled: false,
  emptyPinModEnabled: false,
  autoPlayAgainModEnabled: false,
  seeSelectedBrawlersModEnabled: false,
  antiAutoshootModEnabled: false,
  antiAfkModEnabled: false,
  removeBlackbordersModEnabled: false,
  spectateEveryMatchAsBrawltv: false,
  randomSpraySpamModEnabled: false,
  welcomePopupClosed: false,
  selectedTheme: null,
  hideBattleStatusModEnabled: false,
  modMenuColorRGB: [255, 255, 255],
  textStyle: 2,
  modMenuButtonPosition: 'bottom_left',
  showBattleIp: false,
  selectedBattleServer: null,
  selectedName: null,
  autoChargeModEnabled: false,
  antiCensorModEnabled: false,
  staticBackgroundEnabled: false,
  error: null,
  maxFps: 1000,
  showEnemyAmmoModEnabled: false,
  autoDodge: {
    isOldAngle: false,
    distance: 400,
    cooldown: 50,
    blacklist: [
      {
        name: 'ShellyAttack',
        speed: 3100,
        radius: 0
      },
      {
        name: 'ShellyUlti',
        speed: 4130,
        radius: 50
      },
      {
        name: 'PrimoAttack',
        speed: 3261,
        radius: 150
      },
      {
        name: 'FrankAttack',
        speed: 5000,
        radius: 150
      },
      {
        name: 'FrankUlti',
        speed: 6000,
        radius: 250
      },
      {
        name: 'EmzAttack',
        speed: 1500,
        radius: 200
      },
      {
        name: 'RosaAttack',
        speed: 5000,
        radius: 150
      },
      {
        name: 'BuzzAttack',
        speed: 4000,
        radius: 250
      },
      {
        name: 'EdgarAttack',
        speed: 3500,
        radius: 300
      },
      {
        name: 'GromAttack',
        speed: 840,
        radius: 0
      },
      {
        name: 'BullAttack',
        speed: 2853,
        radius: 0
      }
    ]
  },
  csvMods: {
    naniUltiModEnabled: false,
    unlockAllEmotesModEnabled: false,
    rankedRanksModEnabled: false,
    optimizeGameEnabled: false,
    battleCardModEnabled: false,
    tilesModEnabled: false,
    decreasedCooldownModEnabled: false
  }
};
Global.TemporaryConfig = null;
Global.IsInTeam = false;
Global.IsInBattle = false;
Global.IsConfigUpdated = false;
Global.DataTables = {
  Theme: {
    Id: null,
    FileName: null,
    ExportName: null
  }
};
const CameraSettings = {
  Mode: 0,
  X: 0,
  Y: 0
};

Global.GlobalTextData = GlobalTextData;
Global.Localization = Localization;
module.exports = { GlobalTextData, Localization };
