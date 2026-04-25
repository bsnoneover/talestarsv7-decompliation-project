const BattleServerChanger = {
  targetResultID: null,
  lastServerButton: null,
  lastServerLocation: null,
  realServerPing: null,
  attached: false,
  sendLatencyTest() {
    const message = malloc(200);
    Offsets.libg.Messages.LatencyTestMessage(message, 1, 0, -1);
    Offsets.libg.MessageManager.sendMessage(Offsets.libg.MessageManager.instance.readPointer(), message);
  },
  getLatencyResults() {
    const results = [];
    const messageManager = Offsets.libg.MessageManager.instance.readPointer();
    const count = messageManager.add(420).readU32();
    if (count < 1) {
      return results;
    }
    const latencyArray = messageManager.add(408).readPointer();
    for (let i = 0; i < count; i++) {
      try {
        const latencyPtr = latencyArray.add(i * 8).readPointer();
        const resultId = latencyPtr.readU32();
        const regionName = StringUtils.readStringFromStringObject(latencyPtr.add(40).readPointer());
        const pingMs = latencyPtr.add(4).readU32();
        if (resultId === this.targetResultID) {
          this.realServerPing = pingMs;
        }
        results.push({
          ptr: malloc(544),
          name: regionName,
          msecs: pingMs
        });
      } catch (_) {
        results.push({
          ptr: malloc(544),
          name: '',
          msecs: 0
        });
      }
    }
    return results;
  },
  spoofBattleServer(targetRegion) {
    this.lastServerLocation = targetRegion;
    Offsets.libg.GUI.showFloater_helper(Localization.wait);

    const serverData = {};
    const messageManager = Offsets.libg.MessageManager.instance.readPointer();
    const serverCount = messageManager.add(420).readU32();

    if (serverCount < 1) {
      return;
    }

    const serverArray = messageManager.add(408).readPointer();
    for (let i = 0; i < serverCount; i++) {
      const serverPtr = serverArray.add(i * 8).readPointer();

      let resultId = 0;
      let region = 'unknown';
      let regionName = 'unknown';
      let pingMs = 0;
      let ageSeconds = 0;
      let unknownValue = 0;
      let subRegion = 'unknown';

      try {
        resultId = serverPtr.readU32();
        region = StringUtils.readStringFromStringObject(serverPtr.add(40).readPointer());

        const timestamp = serverPtr.add(24).readU64().toNumber();
        ageSeconds = Math.floor((Date.now() - timestamp) / 1000);

        unknownValue = serverPtr.add(8).readU32();
        pingMs = serverPtr.add(4).readU32();
        regionName = StringUtils.readStringFromStringObject(serverPtr.add(32).readPointer());
        subRegion = StringUtils.readStringFromStringObject(serverPtr.add(48).readPointer());

        serverData[i] = {
          resultId,
          region,
          regionName,
          ageSeconds,
          unknownValue,
          pingMs,
          subRegion
        };

        if (serverData[i].region === targetRegion) {
          this.targetResultID = resultId;
          this.realServerPing = pingMs;
        }
      } catch (_) {
        serverData[i] = {
          resultId: 0,
          region: 'invalid',
          regionName: '',
          ageSeconds: 0,
          unknownValue: 0,
          pingMs: 0,
          subRegion: ''
        };
      }
    }
    this.sendLatencyTest();
  },
  attach() {
    if (!this.attached) {
      this.attached = true;
    }
  },
  update() {
    this.attach();
  }
};

module.exports = { BattleServerChanger };
