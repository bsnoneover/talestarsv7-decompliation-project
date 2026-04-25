const Versioning = (function () {
  function o() {
    return n.MAJOR + '.' + n.MINOR + '.' + n.PATCH;
  }
  function i() {
    return e[n.STAGE];
  }
  const t = Object.freeze({
    DEV: Symbol('DEV'),
    EARLYACCESS: Symbol('EARLY-ACCESS'),
    BETA: Symbol('BETA'),
    STABLE: Symbol('STABLE')
  });
  const e = {
    [t.DEV]: 'DEV',
    [t.EARLYACCESS]: 'EARLY-ACCESS',
    [t.BETA]: 'BETA',
    [t.STABLE]: 'STABLE'
  };
  if (Global.Platform !== 'ios') {
    const n = {
      STAGE: t.EARLYACCESS,
      MAJOR: 7,
      MINOR: 0,
      PATCH: 4,
      ENV: Global.Platform === 'ios' ? 'iOS' : 'Android'
    };
    return {
      Stage: t,
      VERSION: n,
      base: o,
      baseWithEnv() {
        return n.MAJOR + '.' + n.MINOR + '.' + n.PATCH + ' (' + n.ENV + ')';
      },
      stage: i,
      toString() {
        const t = o();
        const e = i();
        if (e) {
          return t + ' (' + e.toLowerCase() + ')';
        }
        return t;
      }
    };
  }
})();
Global.Versioning = Versioning;

module.exports = { Versioning };
