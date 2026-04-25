const SeeEnemyBrawlers = {
  update() {
    Interceptor.attach(Offsets.libg.TeamMemberItem.setMember, {
      onEnter(args) {
        if (Config.seeSelectedBrawlersModEnabled) {
          args[6] = ptr(1);
        }
      }
    });
  }
};

module.exports = { SeeEnemyBrawlers };
