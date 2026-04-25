const LogicDefines = {
  libNames: {
    libc: null,
    libg: null
  },
  modules: {
    libc: null
  },
  appPath: null,
  platformBigLetter: null,
  init() {
    Global.Platform = Process.platform === 'darwin' ? 'ios' : 'android';
    this.platformBigLetter =
      Global.Platform === 'ios'
        ? 'iOS'
        : Global.Platform === 'android'
          ? 'Android'
          : Global.Platform;
    this.libNames.libc = Global.Platform === 'ios' ? 'libSystem.B.dylib' : 'libc.so';
    this.libNames.libg = Global.Platform === 'ios' ? Process.mainModule.name : 'libg.so';
    this.modules.libc = Process.findModuleByName(this.libNames.libc);
    if (Global.Platform !== 'ios') {
      this.appPath =
        Global.Platform === 'ios'
          ? Process.getHomeDir() + '/Documents'
          : '/data/user/0/com.tale.stars';
      return;
    }
  },
  isPlatformiOS() {
    return Global.Platform === 'ios';
  },
  isPlatformAndroid() {
    return Global.Platform === 'android';
  }
};

Global.LogicDefines = LogicDefines;
LogicDefines.init();

module.exports = { LogicDefines };
