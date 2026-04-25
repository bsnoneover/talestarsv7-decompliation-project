const ChromaticName = {
  chromaticNameICAttached: false,
  update() {
    if (!Config.chromaticNameEnabled) {
      return;
    }
  }
};

module.exports = { ChromaticName };
