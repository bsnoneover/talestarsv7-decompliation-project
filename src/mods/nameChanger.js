const NameChanger = {
  names: [
    {
      tags: ['2VCLYC2JC', '2G0J28GPUR', 'JR2QPQ9CP'],
      name: '<cff001f>[<cff003f>D<cff005f>E<cff007f>V<cff009f>]<cff00bf> <cff00df>M<cff00ff>e<cdf00ff>t<cbf00ff>r<c9f00ff>i<c7f00ff>c<c5f00ff>s<c3f00ff>e<c1f00ff>c<c0000ff>t</c>'
    },
    {
      tags: ['ULGULP2RQ'],
      name: '<cff002a>[<cff0054>D<cff007f>E<cff00a9>V<cff00d4>]<cfe00fe> <cd400ff>H<caa00ff>a<c7f00ff>z<c5500ff>a<c2a00ff>r<c0400fe>d</c>'
    },
    {
      tags: ['22PUJUGUC', '8P9V9VR9'],
      name: '<cff0032>[<cff0065>D<cff0098>E<cff00cb>V<cff00ff>]<cff00ff> <ccc00ff>s<c9900ff>q<c6600ff>k</c>'
    },
    {
      tags: ['2CCG2UJL88'],
      name: '<cff2400>[<cff4800>A<cff6d00>D<cfe9100>M<cffb600>I<cffda00>N<cfffe00>]<cdaff00> <cb6ff00>A<c91ff00>r<c6dfe00>t<c48ff00>y<c24ff00>x<c05ff00>X</c>'
    }
  ],
  findCustomName(tag) {
    return this.names.find((entry) => entry.tags.includes(tag));
  },
  addName(tags, name) {
    if (!Array.isArray(tags)) {
      return false;
    }
    if (tags.length === 0 || !name) {
      return false;
    }
    const existingEntry = this.names.find((entry) => entry.tags.some((tag) => tags.includes(tag)));
    if (existingEntry) {
      existingEntry.name = name;
      return true;
    }
    this.names.push({ tags, name });
    return true;
  },
  removeName(tag) {
    const index = this.names.findIndex((entry) => entry.tags.includes(tag));
    if (index !== -1) {
      this.names.splice(index, 1);
      return true;
    }
    return false;
  },
  replaceFunctions() {
    const self = this;

    Interceptor.replace(
      Offsets.libg.LogicPlayer.decode,
      new NativeCallback(
        function (playerPtr, streamPtr) {
          Offsets.libg.LogicPlayer.decode(playerPtr, streamPtr);
          const accountTag = IDUtils.getAccountTag(playerPtr);
          const customEntry = self.findCustomName(accountTag);
          if (!customEntry) {
            return;
          }
        },
        'void',
        ['pointer', 'pointer']
      )
    );
    Interceptor.replace(
      Offsets.libg.TeamMemberEntry.decode,
      new NativeCallback(
        function (entryPtr, streamPtr) {
          Offsets.libg.TeamMemberEntry.decode(entryPtr, streamPtr);
          const accountPtr = entryPtr.add(8).readPointer();
          const accountTag = IDUtils.getAccountTag(accountPtr);
          const customEntry = self.findCustomName(accountTag);
          if (!customEntry) {
            return;
          }
        },
        'void',
        ['pointer', 'pointer']
      )
    );
    Interceptor.replace(
      Offsets.libg.BattleLogPlayerEntry.ctor,
      new NativeCallback(
        function (entryPtr, accountPtr) {
          Offsets.libg.BattleLogPlayerEntry.ctor(entryPtr, accountPtr);
          const accountTag = IDUtils.getAccountTag(accountPtr);
          const customEntry = self.findCustomName(accountTag);
          if (!customEntry) {
            return;
          }
        },
        'void',
        ['pointer', 'pointer']
      )
    );
    Interceptor.replace(
      Offsets.libg.FriendEntry.decode,
      new NativeCallback(
        function (entryPtr, streamPtr) {
          Offsets.libg.FriendEntry.decode(entryPtr, streamPtr);
          const accountPtr = entryPtr.readPointer();
          const namePtr = entryPtr.add(144).readPointer();
          const accountTag = IDUtils.getAccountTag(accountPtr);
          if (namePtr.isNull()) {
            return;
          }
          self.findCustomName(accountTag);
        },
        'void',
        ['pointer', 'pointer']
      )
    );
    Interceptor.replace(
      Offsets.libg.AllianceMemberEntry.decode,
      new NativeCallback(
        function (entryPtr, streamPtr) {
          Offsets.libg.AllianceMemberEntry.decode(entryPtr, streamPtr);
          const accountPtr = entryPtr.add(40).readPointer();
          const accountTag = IDUtils.getAccountTag(accountPtr);
          const customEntry = self.findCustomName(accountTag);
          if (!customEntry) {
            return;
          }
        },
        'void',
        ['pointer', 'pointer']
      )
    );
    Interceptor.replace(
      Offsets.libg.PlayerProfile.decode,
      new NativeCallback(
        function (profilePtr, streamPtr) {
          Offsets.libg.PlayerProfile.decode(profilePtr, streamPtr);
          const accountTag = IDUtils.getAccountTag(profilePtr);
          const customEntry = self.findCustomName(accountTag);
          if (!customEntry) {
            return;
          }
        },
        'void',
        ['pointer', 'pointer']
      )
    );
    Interceptor.replace(
      Offsets.libg.HomeMode.getPlayerName,
      new NativeCallback(
        function (homeModePtr) {
          const customEntry = self.findCustomName(AccountInfo.TAG);
          if (customEntry) {
            return StringUtils.getScPtr(customEntry.name);
          }
          return Offsets.libg.HomeMode.getPlayerName(homeModePtr);
        },
        'pointer',
        ['pointer']
      )
    );
  },
  update() {
    const interceptor = Interceptor.attach(Offsets.libg.GameMain.getAccountIdCtor, {
      onLeave(result) {
        interceptor.detach();
        if (Config.selectedName) {
          NameChanger.addName(IDUtils.getAccountTag(result), Config.selectedName);
        }
        NameChanger.replaceFunctions();
      }
    });
  }
};

module.exports = { NameChanger };
