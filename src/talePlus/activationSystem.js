const CryptoJS = require('crypto-js');
const Buffer = require('buffer');

class ActivationSystem {
  constructor() {
    this.deviceInfo = null;
    this.socketClient = null;
    this.sessionID = null;
    this.activationKey = null;
    this.isInitialized = false;
    this.keepAliveInterval = null;
  }
  static NativeFunctions = {
    malloc: new NativeFunction(LogicDefines.modules.libc.getExportByName('malloc'), 'pointer', ['uint']),
    fopen: new NativeFunction(LogicDefines.modules.libc.getExportByName('fopen'), 'pointer', ['pointer', 'pointer']),
    fgets: new NativeFunction(LogicDefines.modules.libc.getExportByName('fgets'), 'pointer', ['pointer', 'int', 'pointer']),
    fclose: new NativeFunction(LogicDefines.modules.libc.getExportByName('fclose'), 'int', ['pointer']),
    __system_property_get: new NativeFunction(LogicDefines.modules.libc.getExportByName('__system_property_get'), 'int', ['pointer', 'pointer'])
  };
  static PACKET_IDS = {
    CLIENT: {
      CLIENT_HELLO: 1001,
      LOGIN_MESSAGE: 1002,
      LOGIN_VERIFY: 1003,
      ACTIVATION_REQUEST: 1004,
      KEEP_ALIVE: 1005,
      GET_PLAYERS_ONLINE: 1006
    },
    SERVER: {
      SERVER_HELLO: 2001,
      LOGIN_RESPONSE: 2002,
      LOGIN_VERIFY_RESPONSE: 2003,
      VERIFICATION_SUCCESS: 2004,
      ACTIVATION_RESPONSE: 2005,
      ERROR: 2006,
      KEEP_ALIVE_RESPONSE: 2007,
      PLAYERS_ONLINE_RESPONSE: 2008
    }
  };
  initialize() {
    if (!this.isInitialized) {
      this.deviceInfo = this.setDeviceInfoAsync();
      this.socketClient = new SocketClient(Config.SERVER_HOST, Config.SERVER_PORT);
      this.setupEventHandlers();
      this.connect();
      this.isInitialized = true;
    }
  }
  setDeviceInfoAsync() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(DeviceInfo.collect());
      }, 0);
    });
  }
  setupEventHandlers() {
    this.socketClient.on('connected', async () => {
      Logger.log('Connected to server');
      this.socketClient.sendClientHello();
    });
    this.socketClient.on('error', async (error) => {
      Logger.log('Socket error:', error);
    });
    this.socketClient.on('disconnected', async () => {
      Logger.log('Disconnected from server');
      this.sessionID = null;
      this.stopKeepAlive();
      try {
        Logger.log('Attempting to reconnect...');
        this.connect();
      } catch (err) {
        Logger.log('Reconnection failed:', err);
      }
    });
    this.socketClient.onPacket(ActivationSystem.PACKET_IDS.SERVER.SERVER_HELLO, async (data) => {
      this.handleServerHello(data);
    });
    this.socketClient.onPacket(ActivationSystem.PACKET_IDS.SERVER.LOGIN_RESPONSE, async (data) => {
      this.handleLoginResponse(data);
    });
    this.socketClient.onPacket(ActivationSystem.PACKET_IDS.SERVER.LOGIN_VERIFY_RESPONSE, async (data) => {
      this.handleLoginVerifyResponse(data);
    });
    this.socketClient.onPacket(ActivationSystem.PACKET_IDS.SERVER.VERIFICATION_SUCCESS, async (data) => {
      this.handleVerificationSuccess(data);
    });
    this.socketClient.onPacket(ActivationSystem.PACKET_IDS.SERVER.ACTIVATION_RESPONSE, async (data) => {
      this.handleActivationResponse(data);
    });
    this.socketClient.onPacket(ActivationSystem.PACKET_IDS.SERVER.KEEP_ALIVE_RESPONSE, async () => { });
    this.socketClient.onPacket(ActivationSystem.PACKET_IDS.SERVER.PLAYERS_ONLINE_RESPONSE, async (data) => {
      Logger.log('Players online response:', data);
    });
    this.socketClient.onPacket(ActivationSystem.PACKET_IDS.SERVER.ERROR, async (error) => {
      Logger.log('Server error:', error);
    });
  }
  async connect() {
    try {
      Logger.log('Connecting to server...');
      await Promise.race([
        this.socketClient.connect(),
        this.timeout(Config.CONNECTION_TIMEOUT, 'Connection timeout')
      ]);
    } catch (err) {
      Logger.log('Connection failed:', err);
    }
  }
  startKeepAlive() {
    if (this.keepAliveInterval) {
      clearInterval(this.keepAliveInterval);
    }
    this.keepAliveInterval = setInterval(async () => {
      if (this.sessionID && this.socketClient?.isConnected) {
        try {
          this.socketClient.sendKeepAlive(this.sessionID);
        } catch (err) {
          Logger.log('KeepAlive failed:', err);
        }
      }
    }, 25000);
  }
  stopKeepAlive() {
    if (this.keepAliveInterval) {
      clearInterval(this.keepAliveInterval);
      this.keepAliveInterval = null;
    }
  }
  getPlayersOnline() {
    if (this.sessionID && this.socketClient?.isConnected) {
      this.socketClient.sendGetPlayersOnline(this.sessionID);
    }
  }
  handleServerHello(data) {
    try {
      Logger.log('Server hello received');
      this.sessionID = data.sessionID;
      this.startKeepAlive();
      Logger.log('Starting login process...');
      this.socketClient.sendLoginMessage(this.sessionID, this.deviceInfo);
    } catch (err) {
      Logger.log('Server hello error:', err);
    }
  }
  handleLoginResponse(data) {
    try {
      Logger.log('Login response received');
      AppState.key = data.activationKey;
      if (data.sessionID !== this.sessionID) {
        Logger.log('Session ID mismatch');
        return;
      }
      this.activationKey = data.activationKey;
      if (!this.verifyDeviceInfo(data.deviceInfo)) {
        Logger.log('Device info verification failed');
        return;
      }
    } catch (err) {
      Logger.log('Login response error:', err);
    }
  }
  handleLoginVerifyResponse(data) {
    try {
      Logger.log('Login verify response received');
      if (data.sessionID !== this.sessionID) {
        Logger.log('Session ID mismatch');
        return;
      }
      const challenge = data.challenge;
      const part1 = challenge.substring(0, 16);
      const part2 = challenge.substring(16);
      if (!this.verifyDeviceInfo(data.deviceInfo)) {
        Logger.log('Device info verification failed');
        return;
      }
      const response = part2 + part1;
      Logger.log('Sending login verify');
      this.socketClient.sendLoginVerify(this.sessionID, this.activationKey, response, data.timestamp);
    } catch (err) {
      Logger.log('Login verify error:', err);
    }
  }
  handleVerificationSuccess(data) {
    try {
      Logger.log('Verification success received');
      if (data.sessionID !== this.sessionID) {
        Logger.log('Session ID mismatch');
        return;
      }
      this.socketClient.sendActivationRequest(this.sessionID, this.activationKey);
    } catch (err) {
      Logger.log('Verification success error:', err);
    }
  }
  handleActivationResponse(data) {
    try {
      Logger.log('Activation response received');
      if (data.sessionID !== this.sessionID) {
        Logger.log('Session ID mismatch');
        return;
      }
      if (!this.verifyDeviceInfo(data.deviceInfo)) {
        Logger.log('Device info verification failed');
        return;
      }
      if (data.status === String(9123941828)) {
        Logger.log('Activation successful');
        AppState.activated = true;
      } else if (AppState.isInEarlyAccess) {
        TaleConfig.loadConfig = () => { };
        TaleConfig.saveConfig = () => { };
      }
    } catch (err) {
      Logger.log('Activation response error:', err);
    }
  }
  verifyDeviceInfo(otherDeviceInfo) {
    const deviceKeys = [
      'androidID',
      'fingerprint',
      'model',
      'board',
      'brand',
      'device',
      'manufacturer',
      'ram',
      'cpu_cores',
      'apkPath'
    ];
    return deviceKeys.every(key => this.deviceInfo[key] === otherDeviceInfo[key]);
  }
  timeout(ms, message = 'Timeout') {
    return new Promise((_, reject) => {
      setTimeout(() => reject(new Error(message)), ms);
    });
  }
};

const Config = {
  SERVER_HOST: '212.64.216.207',
  SERVER_PORT: 6666,
  CONNECTION_TIMEOUT: 10000
};

const AppState = {
  key: null,
  activated: false,
  isInEarlyAccess: true
};

class Logger {
  static log(...args) {
    console.log('[TalePlus]', ...args);
  }
}
class MyMemory {
  static NativeFunctions = {
    malloc: new NativeFunction(LogicDefines.modules.libc.getExportByName('malloc'), 'pointer', ['uint'])
  };

  static allocString(str) {
    const bytes = this.stringToUtf8Bytes(str);
    const ptr = this.NativeFunctions.malloc(bytes.length + 1);
    ptr.writeByteArray(bytes);
    ptr.add(bytes.length).writeU8(0);
    return ptr;
  }

  static stringToUtf8Bytes(str) {
    const bytes = [];
    for (let i = 0; i < str.length; i++) {
      let code = str.charCodeAt(i);
      if (code < 128) {
        bytes.push(code);
      } else if (code < 2048) {
        bytes.push((code >> 6) | 192, (code & 63) | 128);
      } else if (code < 55296 || code >= 57344) {
        bytes.push((code >> 12) | 224, ((code >> 6) & 63) | 128, (code & 63) | 128);
      } else {
        i++;
        const surrogate = (65536 + ((code << 10) & 1023)) | (str.charCodeAt(i) & 1023);
        bytes.push((surrogate >> 18) | 240, ((surrogate >> 12) & 63) | 128, ((surrogate >> 6) & 63) | 128, (surrogate & 63) | 128);
      }
    }
    return bytes;
  }
}
class SocketClient {
  constructor(host, port) {
    this.host = host;
    this.port = port;
    this.socket = null;
    this.callbacks = {};
    this.buffer = '';
    this.isConnected = false;
    this.receiveLoopRunning = false;
    this.packetHandlers = new Map();
  }

  on(event, callback) {
    this.callbacks[event] = callback;
    return this;
  }

  emit(event, data) {
    if (this.callbacks[event]) {
      this.callbacks[event](data);
    }
  }

  async connect() {
    try {
      this.socket = Socket.connect({
        family: 'ipv4',
        host: this.host,
        port: this.port
      });
      this.isConnected = true;
      this.emit('connect');
    } catch (err) {
      this.emit('error', err);
    }
  }

  async send(data) {
    if (!this.socket || !this.isConnected) {
      throw new Error('Socket not connected');
    }
    this.socket.output.write(data);
    return data.length;
  }

  async receive(size = 4096) {
    if (!this.socket || !this.isConnected) {
      throw new Error('Socket not connected');
    }
    const data = this.socket.input.read(size);
    return data ? new Uint8Array(data) : new Uint8Array(0);
  }

  close() {
    this.isConnected = false;
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }
}
class DeviceInfo {
  static NativeFunctions = {
    malloc: new NativeFunction(LogicDefines.modules.libc.getExportByName('malloc'), 'pointer', ['uint']),
    fopen: new NativeFunction(LogicDefines.modules.libc.getExportByName('fopen'), 'pointer', ['pointer', 'pointer']),
    fgets: new NativeFunction(LogicDefines.modules.libc.getExportByName('fgets'), 'pointer', ['pointer', 'int', 'pointer']),
    fclose: new NativeFunction(LogicDefines.modules.libc.getExportByName('fclose'), 'int', ['pointer']),
    __system_property_get: new NativeFunction(LogicDefines.modules.libc.getExportByName('__system_property_get'), 'int', ['pointer', 'pointer'])
  };

  static getSystemProperty(name) {
    try {
      const bufSize = 92;
      const namePtr = MyMemory.allocString(name);
      const buf = this.NativeFunctions.malloc(bufSize);
      if (this.NativeFunctions.__system_property_get(namePtr, buf) > 0) {
        return buf.readUtf8String();
      }
      return null;
    } catch (err) {
      Logger.log('getSystemProperty error:', err);
      return null;
    }
  }

  static getCpuCores() {
    const pathPtr = MyMemory.allocString('/proc/cpuinfo');
    const modePtr = MyMemory.allocString('r');
    const file = this.NativeFunctions.fopen(pathPtr, modePtr);
    if (file.isNull()) {
      return 'unknown';
    }
    const bufSize = 256;
    const buf = this.NativeFunctions.malloc(bufSize);
    let count = 0;
    while (!this.NativeFunctions.fgets(buf, bufSize, file).isNull()) {
      const line = buf.readUtf8String();
      if (line.startsWith('processor')) {
        count++;
      }
    }
    this.NativeFunctions.fclose(file);
    return count > 0 ? count.toString() : 'unknown';
  }

  static getTotalRam() {
    const pathPtr = MyMemory.allocString('/proc/meminfo');
    const modePtr = MyMemory.allocString('r');
    const file = this.NativeFunctions.fopen(pathPtr, modePtr);
    if (file.isNull()) {
      return 'unknown';
    }
    const bufSize = 256;
    const buf = this.NativeFunctions.malloc(bufSize);
    let ram = 'unknown';
    while (!this.NativeFunctions.fgets(buf, bufSize, file).isNull()) {
      const line = buf.readUtf8String();
      if (line.startsWith('MemTotal:')) {
        const parts = line.split(/\s+/);
        if (parts.length >= 2) {
          const kb = parseInt(parts[1]);
          ram = Math.round(kb / 1024) + 'MB';
        }
      }
    }
    this.NativeFunctions.fclose(file);
    return ram;
  }

  static getAndroidId() {
    const properties = ['ro.serialno', 'ro.boot.serialno', 'ril.serialnumber', 'persist.radio.serialnumber'];
    for (const prop of properties) {
      const value = this.getSystemProperty(prop);
      if (value && value !== 'unknown' && value !== '') {
        return value;
      }
    }
    return 'unknown';
  }

  static getFingerprint() {
    return this.getSystemProperty('ro.build.fingerprint') || 'unknown';
  }

  static getModel() {
    return this.getSystemProperty('ro.product.model') || 'unknown';
  }

  static getBoard() {
    return this.getSystemProperty('ro.product.board') || 'unknown';
  }

  static getBrand() {
    return this.getSystemProperty('ro.product.brand') || 'unknown';
  }

  static getDevice() {
    return this.getSystemProperty('ro.product.device') || 'unknown';
  }

  static getManufacturer() {
    return this.getSystemProperty('ro.product.manufacturer') || 'unknown';
  }

  static getApkPath() {
    try {
      const libgPath = Process.getModuleByName('libg.so').path;
      const match = libgPath.match(/~~[^/]+\/com\.[^/]+==/);
      if (!match) return 'unknown';

      const pathPtr = MyMemory.allocString(libgPath);
      const statFunc = new NativeFunction(Module.findExportByName('libc.so', 'stat'), 'int', ['pointer', 'pointer']);
      const statBuf = DeviceInfo.NativeFunctions.malloc(300);

      if (statFunc(pathPtr, statBuf) === 0) {
        return match[0];
      }
      return 'unknown';
    } catch (err) {
      Logger.log('getApkPath error:', err);
      return 'unknown';
    }
  }

  static collect() {
    Memory.allocUtf8String('you cant crack tale stars lil broski');
    return {
      androidID: this.getAndroidId(),
      fingerprint: this.getFingerprint(),
      model: this.getModel(),
      board: this.getBoard(),
      brand: this.getBrand(),
      device: this.getDevice(),
      manufacturer: this.getManufacturer(),
      ram: this.getTotalRam(),
      cpu_cores: this.getCpuCores(),
      apkPath: this.getApkPath()
    };
  }
}
class Cryptale {
  static Keys = {
    AES_KEY: Buffer.from([
      6, 116, 0, 255, 249, 172, 214, 90, 23, 61, 250, 252, 99, 232, 184, 44, 145, 38, 254, 200, 212,
      232, 30, 179, 175, 16, 101, 185, 3, 69, 179, 218
    ]),
    XOR_KEY_S1: 195936478,
    XOR_KEY_S2: 18166504,
    XOR_KEY_S3: 45067
  };

  static generalFunctions = {
    bytesToWordArray(data) {
      const words = [];
      const buf = Buffer.isBuffer(data) ? data : Buffer.from(data);
      for (let i = 0; i < buf.length; i += 4) {
        words.push(
          (buf[i] << 24) |
          ((buf[i + 1] || 0) << 16) |
          ((buf[i + 2] || 0) << 8) |
          (buf[i + 3] || 0)
        );
      }
      return CryptoJS.lib.WordArray.create(words, buf.length);
    },

    wordArrayToBytes(wordArray) {
      const buf = Buffer.alloc(wordArray.sigBytes);
      for (let i = 0; i < wordArray.sigBytes; i++) {
        buf[i] = (wordArray.words[i >>> 2] >>> (24 - (i % 4) * 8)) & 255;
      }
      return buf;
    },

    getRandomWordArray(size) {
      const bytes = new Uint8Array(size);
      for (let i = 0; i < size; i++) {
        bytes[i] = Math.floor(Math.random() * 256);
      }
      return this.bytesToWordArray(Array.from(bytes));
    },

    getRandomBytes(size) {
      const bytes = new Uint8Array(size);
      for (let i = 0; i < size; i++) {
        bytes[i] = Math.floor(Math.random() * 256);
      }
      return bytes;
    },

    numberToBytes(num) {
      const buf = Buffer.alloc(4);
      buf.writeUInt32BE(num, 0);
      return Array.from(buf);
    },

    multiXOR(data, key) {
      const keyBytes = this.numberToBytes(key);
      const buf = Buffer.isBuffer(data) ? data : Buffer.from(data);
      const result = Buffer.alloc(buf.length);
      for (let i = 0; i < buf.length; i++) {
        result[i] = buf[i] ^ keyBytes[i % keyBytes.length];
      }
      return result;
    },

    bufferToUint8Array(buf) {
      return new Uint8Array(buf);
    },

    ensureUint8Array(data) {
      if (Buffer.isBuffer(data) || Array.isArray(data)) {
        return new Uint8Array(data);
      }
      return data;
    }
  };
  static s1 = {
    encrypt(data) {
      const iv = Cryptale.generalFunctions.getRandomWordArray(16);
      const key = Cryptale.generalFunctions.bytesToWordArray(Cryptale.Keys.AES_KEY);
      const encrypted = CryptoJS.AES.encrypt(data, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
      const combined = iv.clone().concat(encrypted.ciphertext);
      const bytes = Cryptale.generalFunctions.wordArrayToBytes(combined);
      return Cryptale.generalFunctions.bufferToUint8Array(bytes);
    },

    decrypt(data) {
      try {
        const key = Cryptale.generalFunctions.bytesToWordArray(Cryptale.Keys.AES_KEY);
        const buf = Buffer.from(data);
        const wordArray = Cryptale.generalFunctions.bytesToWordArray(Array.from(buf));
        const iv = CryptoJS.lib.WordArray.create(wordArray.words.slice(0, 4), 16);
        const ciphertext = CryptoJS.lib.WordArray.create(wordArray.words.slice(4), wordArray.sigBytes - 16);
        return CryptoJS.AES.decrypt({ ciphertext }, key, {
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
        }).toString(CryptoJS.enc.Utf8);
      } catch (err) {
        return '';
      }
    }
  };

  static s2 = {
    encrypt(data) {
      let result = data;
      result = Cryptale.generalFunctions.multiXOR(result, Cryptale.Keys.XOR_KEY_S1);
      result = Cryptale.generalFunctions.multiXOR(result, Cryptale.Keys.XOR_KEY_S2);
      result = Cryptale.generalFunctions.multiXOR(result, Cryptale.Keys.XOR_KEY_S3);
      return Cryptale.generalFunctions.bufferToUint8Array(result);
    },

    decrypt(data) {
      return this.encrypt(data);
    }
  };

  static s3 = {
    encrypt(data) {
      const buf = Buffer.from(data);
      const result = Buffer.alloc(buf.length);
      for (let i = 0; i < buf.length; i += 2) {
        if (i + 1 < buf.length) {
          result[i] = buf[i + 1];
          result[i + 1] = buf[i];
        } else {
          result[i] = buf[i];
        }
      }
      return Cryptale.generalFunctions.bufferToUint8Array(result);
    },

    decrypt(data) {
      return this.encrypt(data);
    }
  };

  static s4 = {
    encrypt(data) {
      const randomBytes = Cryptale.generalFunctions.getRandomBytes(8);
      const timestamp = Date.now();
      const timeBuf = Buffer.alloc(8);
      const randomBuf = Buffer.from(randomBytes);
      timeBuf.writeBigUInt64BE(BigInt(timestamp), 0);
      const dataBuf = Buffer.from(data);
      const combined = Buffer.concat([randomBuf, timeBuf, dataBuf]);
      return Cryptale.generalFunctions.bufferToUint8Array(combined);
    },

    decrypt(data) {
      const buf = Buffer.from(data);
      return Cryptale.generalFunctions.bufferToUint8Array(buf.slice(16));
    }
  };

  static encrypt(data) {
    try {
      const stage1 = this.s1.encrypt(data);
      const stage2 = this.s2.encrypt(stage1);
      const stage3 = this.s3.encrypt(stage2);
      const stage4 = this.s4.encrypt(stage3);
      return Buffer.from(stage4).toString('base64');
    } catch (err) {
      Logger.log('Encryption failed:', err);
      return '';
    }
  }

  static decrypt(data) {
    try {
      const buf = Buffer.from(data, 'base64');
      const stage4 = this.s4.decrypt(buf);
      const stage3 = this.s3.decrypt(stage4);
      const stage2 = this.s2.decrypt(stage3);
      return this.s1.decrypt(stage2);
    } catch (err) {
      Logger.log('Decryption failed:', err);
      return '';
    }
  }
}

Object.assign(SocketClient.prototype, {
  onPacket(packetId, handler) {
    this.packetHandlers.set(packetId, handler);
  },

  async sendPacket(packet) {
    try {
      if (!this.isConnected || !this.socket) {
        throw new Error('Socket not connected');
      }
      const json = JSON.stringify(packet);
      const encrypted = Cryptale.encrypt(json) + '\n';
      const bytes = this.stringToBytes(encrypted);
      this.socket.send(bytes);
    } catch (err) {
      if (!err.message.includes('Broken pipe') && !err.message.includes('not connected')) {
        if (err.message.includes('error sending data')) {
          this.disconnect();
        }
      }
    }
  },

  async sendClientHello() {
    this.sendPacket({
      id: ActivationSystem.PACKET_IDS.CLIENT.CLIENT_HELLO,
      data: {}
    });
  },

  async sendLoginMessage(sessionID, deviceInfo) {
    this.sendPacket({
      id: ActivationSystem.PACKET_IDS.CLIENT.LOGIN_MESSAGE,
      data: { sessionID }
    });
  },

  async sendLoginVerify(sessionID, activationKey, response, timestamp) {
    this.sendPacket({
      id: ActivationSystem.PACKET_IDS.CLIENT.LOGIN_VERIFY,
      data: { sessionID, activationKey, response, timestamp }
    });
  },

  async sendActivationRequest(sessionID, activationKey) {
    this.sendPacket({
      id: ActivationSystem.PACKET_IDS.CLIENT.ACTIVATION_REQUEST,
      data: { sessionID, activationKey }
    });
  },

  async sendKeepAlive(sessionID) {
    this.sendPacket({
      id: ActivationSystem.PACKET_IDS.CLIENT.KEEP_ALIVE,
      data: { sessionID }
    });
  },

  async sendGetPlayersOnline(sessionID) {
    this.sendPacket({
      id: ActivationSystem.PACKET_IDS.CLIENT.GET_PLAYERS_ONLINE,
      data: { sessionID }
    });
  },

  stringToBytes(str) {
    const bytes = new Uint8Array(str.length);
    for (let i = 0; i < str.length; i++) {
      bytes[i] = str.charCodeAt(i);
    }
    return bytes;
  },

  bytesToString(bytes) {
    if (!bytes || bytes.length === 0) {
      return '';
    }
    let result = '';
    for (let i = 0; i < bytes.length; i++) {
      result += String.fromCharCode(bytes[i]);
    }
    return result;
  },

  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },

  startReceiveLoop() {
    if (!this.receiveLoopRunning) {
      this.receiveLoopRunning = true;
      this.receiveLoop();
    }
  },

  async receiveLoop() {
    while (this.isConnected && this.receiveLoopRunning) {
      try {
        const data = await this.socket.receive(1024);
        if (data && data.length > 0) {
          this.handleRawData(data);
        }
        await this.sleep(10);
      } catch (err) {
        if (this.isConnected) {
          await this.sleep(100);
        }
      }
    }
  },

  handleRawData(data) {
    try {
      const str = this.bytesToString(data);
      this.buffer += str;
      this.processBuffer();
    } catch (err) {
      Logger.log('handleRawData error:', err);
    }
  },

  processBuffer() {
    let newlineIndex = this.buffer.indexOf('\n');
    while (newlineIndex !== -1) {
      const line = this.buffer.substring(0, newlineIndex);
      this.buffer = this.buffer.substring(newlineIndex + 1);
      this.handleServerPacket(line);
      newlineIndex = this.buffer.indexOf('\n');
    }
  },

  async handleServerPacket(packetData) {
    try {
      const decrypted = Cryptale.decrypt(packetData);
      const packet = JSON.parse(decrypted);

      if (this.packetHandlers.has(packet.id)) {
        const handler = this.packetHandlers.get(packet.id);
        handler(packet.data);
        return;
      }

      const { SERVER } = ActivationSystem.PACKET_IDS;
      switch (packet.id) {
        case SERVER.SERVER_HELLO:
          this.emit('server-hello', packet.data);
          break;
        case SERVER.LOGIN_RESPONSE:
          this.emit('login-response', packet.data);
          break;
        case SERVER.LOGIN_VERIFY_RESPONSE:
          this.emit('login-verify-response', packet.data);
          break;
        case SERVER.VERIFICATION_SUCCESS:
          this.emit('verification-success', packet.data);
          break;
        case SERVER.ACTIVATION_RESPONSE:
          this.emit('activation-response', packet.data);
          break;
        case SERVER.ERROR:
          this.emit('server-error', packet.data);
          break;
        case SERVER.KEEP_ALIVE_RESPONSE:
          this.emit('keep-alive-response', packet.data);
          break;
        case SERVER.PLAYERS_ONLINE_RESPONSE:
          this.emit('players-online-response', packet.data);
          break;
        default:
          Logger.log('Unknown packet ID:', packet.id);
      }
    } catch (err) {
      Logger.log('handleServerPacket error:', err);
    }
  }
});

const TalePlus = {
  ActivationSystem,
  SocketClient,
  DeviceInfo,
  Cryptale,
  Config,
  AppState,
  Logger
};

module.exports = { TalePlus };
