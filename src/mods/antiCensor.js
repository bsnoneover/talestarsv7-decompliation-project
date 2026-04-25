const AntiCensor = {
  antiCensor(text = '') {
    try {
      const censoredText = Array.from(text).join('︀') + '︀\0';
      return StringUtils.stringToByteArray(censoredText, 1);
    } catch {
      return StringUtils.stringToByteArray(text, 1);
    }
  },

  update() {
    Interceptor.attach(Offsets.libg.Messages.TeamChatMessage_encode, {
      onEnter() {
        if (!Config.antiCensorModEnabled) {
          return;
        }
      }
    });
  }
};

module.exports = { AntiCensor };
