const ChatSpam = {
  spamText: null,
  isStarted: false,
  interval: null,

  start() {
    if (this.isStarted) {
      return;
    }
    this.isStarted = true;
    const self = this;
    this.interval = setInterval(function () {
      if (!self.isStarted) {
        return;
      }
      const message = malloc(200);
      Offsets.libg.Messages.TeamChatMessage(message);
      StringUtils.writeStringObject(message.add(144), self.spamText + '\n');
      Offsets.libg.MessageManager.sendMessage(
        Offsets.libg.MessageManager.instance.readPointer(),
        message
      );
    }, 120);
  },

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    this.isStarted = false;
  }
};

module.exports = { ChatSpam };
