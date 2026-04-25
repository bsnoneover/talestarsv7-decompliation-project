const libg = {
  name: LogicDefines.libNames.libg,
  base: null,
  size: null,
  offset(androidOffset, iosOffset) {
    if (LogicDefines.isPlatformAndroid()) {
      return libg.base.add(androidOffset);
    }
    return libg.base.add(iosOffset);
  }
};

Global.libg = libg;
