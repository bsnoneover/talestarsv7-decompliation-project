const ThemeChanger = {
  attached: false,
  interceptor: null,

  update() {
    if (this.attached) {
      return;
    }
    this.attached = true;

    const self = this;
    this.interceptor = Interceptor.attach(Offsets.libg.LogicConfData.getIntValue, {
      onEnter(args) {
        this.valueId = args[1].toInt32();
        this.defaultValue = args[2].toInt32();
      },
      onLeave(returnValue) {
        if (this.valueId !== 1) {
          return;
        }

        if (Config.selectedTheme !== null) {
          DataTables.Theme.Id = Config.selectedTheme;
          returnValue.replace(Config.selectedTheme);
          self.interceptor.detach();
          return;
        }

        const themeId = returnValue.toInt32();
        DataTables.Theme.Id = themeId;

        const csvLines = TaleUtils.File.read(AssetsManager.Files.Paths.themesCsvPath).split('\n');
        const dataLines = csvLines.slice(1);
        const headers = csvLines[0].replace(/"/g, '').split(',');

        const themeIndex = DataTables.Theme.Id - 41000000 + 1;
        if (themeIndex < 0 || themeIndex >= dataLines.length) {
          return;
        }

        const themeData = csvLines[themeIndex + 1].replace(/"/g, '').split(',');
        const fileNameIndex = headers.indexOf('FileName');
        const exportNameIndex = headers.indexOf('ExportName');

        DataTables.Theme.FileName = themeData[fileNameIndex];
        DataTables.Theme.ExportName = themeData[exportNameIndex];
        self.interceptor.detach();
      }
    });
  }
};

module.exports = { ThemeChanger };
