const appPath = LogicDefines.appPath;
const updatePath = appPath + (Global.Platform === 'ios' ? '/updated' : '/update');

const AssetsManager = {
  Files: {
    Paths: {
      csvLogicFolderPath: updatePath + '/csv_logic',
      csvClientFolderPath: updatePath + '/csv_client',
      fontFolderPath: updatePath + '/font/',
      defaultFontPath: updatePath + '/font/LilitaOne-Regular.ttf',
      skinsCsvPath: updatePath + '/csv_logic/skins.csv',
      skinConfsCsvPath: updatePath + '/csv_logic/skin_confs.csv',
      projectilesSkinCsvPath: updatePath + '/csv_logic/projectiles_skin.csv',
      emotesCsvPath: updatePath + '/csv_logic/emotes.csv',
      rankedRanksCsvPath: updatePath + '/csv_logic/ranked_ranks.csv',
      clientGlobalsCsvPath: updatePath + '/csv_logic/client_globals.csv',
      playerFramesCsvPath: updatePath + '/csv_logic/player_frames.csv',
      tilesCsvPath: updatePath + '/csv_logic/tiles.csv',
      skillsCsvPath: updatePath + '/csv_logic/skills.csv',
      colorGradientsCsvPath: updatePath + '/csv_client/color_gradients.csv',
      themesCsvPath: updatePath + '/csv_logic/themes.csv'
    },
    Contents: {
      projectilesSkinCsvContent: null,
      emotesCsvContent: null,
      rankedRanksCsvContent: null,
      clientGlobalsCsvContent: null,
      playerFramesCsvContent: null,
      tilesCsvContent: null,
      skillsCsvContent: null
    }
  },
  SkinMappings: null,
  ImageList: [
    {
      name: 'talestarsplus',
      filePath: t + '/save/taleImages/talestarsplus.png',
      url: 'http://api.talemods.com/TaleStars/Images/talestarsplus.png'
    },
    {
      name: 'talestarsv65icon',
      filePath: t + '/save/taleImages/talestarsv65icon.png',
      url: 'http://api.talemods.com/TaleStars/Images/talestarsv65.png'
    },
    {
      name: 'telegramicon',
      filePath: t + '/save/taleImages/telegramicon.png',
      url: 'http://api.talemods.com/TaleStars/Images/telegramicon.png'
    },
    {
      name: 'discordicon',
      filePath: t + '/save/taleImages/discordicon.png',
      url: 'http://api.talemods.com/TaleStars/Images/discordicon.png'
    },
    {
      name: 'enablementtext',
      filePath: t + '/save/taleImages/enablementtext.png',
      url: 'http://api.talemods.com/TaleStars/Images/enablementtext.png'
    },
    {
      name: 'bannedcharacterstext',
      filePath: t + '/save/taleImages/bannedcharacterstext.png',
      url: 'http://api.talemods.com/TaleStars/Images/bannedcharacterstext.png'
    },
    {
      name: 'anglesystemtext',
      filePath: t + '/save/taleImages/anglesystemtext.png',
      url: 'http://api.talemods.com/TaleStars/Images/anglesystemtext.png'
    },
    {
      name: 'distancetext',
      filePath: t + '/save/taleImages/distancetext.png',
      url: 'http://api.talemods.com/TaleStars/Images/distancetext.png'
    },
    {
      name: 'talestarsplusdescription',
      filePath: t + '/save/taleImages/talestarsplusdescription.png',
      url: 'http://api.talemods.com/TaleStars/Images/talestarsplusdescription.png'
    }
  ],
  getImagePath(t) {
    const image = this.ImageList.find(function (image) {
      return image.name === t;
    });
    if (image) {
      return image.filePath;
    }
    return null;
  },
  initCsvs() {
    this.Files.Contents.projectilesSkinCsvContent = TaleUtils.File.readFromAssets(
      'tale/csv_logic/projectiles_skin.csv'
    );
    this.Files.Contents.emotesCsvContent = TaleUtils.File.readFromAssets(
      'tale/csv_logic/emotes.csv'
    );
    this.Files.Contents.rankedRanksCsvContent = TaleUtils.File.readFromAssets(
      'tale/csv_logic/ranked_ranks.csv'
    );
    this.Files.Contents.clientGlobalsCsvContent = TaleUtils.File.readFromAssets(
      'tale/csv_client/client_globals.csv'
    );
    this.Files.Contents.playerFramesCsvContent = TaleUtils.File.readFromAssets(
      'tale/csv_logic/player_frames.csv'
    );
    this.Files.Contents.tilesCsvContent = TaleUtils.File.readFromAssets('tale/csv_logic/tiles.csv');
    this.Files.Contents.skillsCsvContent = TaleUtils.File.readFromAssets(
      'tale/csv_logic/skills.csv'
    );
  },
  initSkinMappings() {
    this.SkinMappings = {
      TR: JSON.parse(TaleUtils.File.readFromAssets('tale/skin_mapping/tr.json')),
      EN: JSON.parse(TaleUtils.File.readFromAssets('tale/skin_mapping/en.json')),
      RU: JSON.parse(TaleUtils.File.readFromAssets('tale/skin_mapping/ru.json')),
      AR: JSON.parse(TaleUtils.File.readFromAssets('tale/skin_mapping/ar.json')),
      CN: JSON.parse(TaleUtils.File.readFromAssets('tale/skin_mapping/cn.json')),
      CNT: JSON.parse(TaleUtils.File.readFromAssets('tale/skin_mapping/cnt.json')),
      DE: JSON.parse(TaleUtils.File.readFromAssets('tale/skin_mapping/de.json')),
      ES: JSON.parse(TaleUtils.File.readFromAssets('tale/skin_mapping/es.json')),
      FI: JSON.parse(TaleUtils.File.readFromAssets('tale/skin_mapping/fi.json')),
      FR: JSON.parse(TaleUtils.File.readFromAssets('tale/skin_mapping/fr.json')),
      HE: JSON.parse(TaleUtils.File.readFromAssets('tale/skin_mapping/he.json')),
      ID: JSON.parse(TaleUtils.File.readFromAssets('tale/skin_mapping/id.json')),
      IT: JSON.parse(TaleUtils.File.readFromAssets('tale/skin_mapping/it.json')),
      JP: JSON.parse(TaleUtils.File.readFromAssets('tale/skin_mapping/jp.json')),
      KR: JSON.parse(TaleUtils.File.readFromAssets('tale/skin_mapping/kr.json')),
      MS: JSON.parse(TaleUtils.File.readFromAssets('tale/skin_mapping/ms.json')),
      NL: JSON.parse(TaleUtils.File.readFromAssets('tale/skin_mapping/nl.json')),
      PL: JSON.parse(TaleUtils.File.readFromAssets('tale/skin_mapping/pl.json')),
      PT: JSON.parse(TaleUtils.File.readFromAssets('tale/skin_mapping/pt.json')),
      TH: JSON.parse(TaleUtils.File.readFromAssets('tale/skin_mapping/th.json')),
      VI: JSON.parse(TaleUtils.File.readFromAssets('tale/skin_mapping/vi.json'))
    };
  },
  initImages() {
    if (TaleUtils.Directory.exists(t_2 + '/save/taleImages/')) {
      if (!TaleUtils.Directory.exists(t_2 + '/save/taleImages/')) {
        TaleUtils.Directory.create(t_2 + '/save/taleImages/');
      }
      for (let image of this.ImageList) {
        try {
          if (!TaleUtils.File.exists(image.filePath)) {
            TaleUtils.Network.downloadFileAndMoveFromUrl(image.url, image.filePath);
          }
        } catch (_) {
          Logger.clog('');
        }
      }
      return;
    }
  },
  initAssets() {
    if (TaleUtils.Directory.exists(e)) {
      if (!TaleUtils.Directory.exists(e)) {
        TaleUtils.Directory.create(e);
      }
      if (!TaleUtils.Directory.exists(this.Files.Paths.csvLogicFolderPath)) {
        TaleUtils.Directory.create(this.Files.Paths.csvLogicFolderPath);
      }
      if (!TaleUtils.Directory.exists(this.Files.Paths.csvClientFolderPath)) {
        TaleUtils.Directory.create(this.Files.Paths.csvClientFolderPath);
      }
      if (!TaleUtils.Directory.exists(this.Files.Paths.fontFolderPath)) {
        TaleUtils.Directory.create(this.Files.Paths.fontFolderPath);
      }
      if (!TaleUtils.File.exists(this.Files.Paths.skinsCsvPath)) {
        TaleUtils.File.write(
          this.Files.Paths.skinsCsvPath,
          TaleUtils.File.readFromAssets('csv_logic/skins.csv')
        );
      }
      if (!TaleUtils.File.exists(this.Files.Paths.skinConfsCsvPath)) {
        TaleUtils.File.write(
          this.Files.Paths.skinConfsCsvPath,
          TaleUtils.File.readFromAssets('csv_logic/skin_confs.csv')
        );
      }
      if (!TaleUtils.File.exists(this.Files.Paths.colorGradientsCsvPath)) {
        TaleUtils.File.write(
          this.Files.Paths.colorGradientsCsvPath,
          TaleUtils.File.readFromAssets('csv_client/color_gradients.csv')
        );
      }
      if (!TaleUtils.File.exists(this.Files.Paths.themesCsvPath)) {
        TaleUtils.File.write(
          this.Files.Paths.themesCsvPath,
          TaleUtils.File.readFromAssets('csv_logic/themes.csv')
        );
      }
      this.initCsvs();
      this.initSkinMappings();
      this.initImages();
      return;
    }
  }
};

Global.AssetsManager = AssetsManager;
module.exports = { AssetsManager };
