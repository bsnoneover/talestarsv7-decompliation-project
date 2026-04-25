const KEY_BYTES = new Uint8Array([11, 173, 192, 222]);
const MULTIPLIER = 61616161;

const TaleConfig = {
  utf8Encode(str) {
    let pos = 0;
    const buf = new Uint8Array(str.length * 3);
    for (let i = 0; i < str.length; i++) {
      const code = str.charCodeAt(i);
      if (code < 0x80) {
        buf[pos++] = code;
      } else if (code < 0x800) {
        buf[pos++] = 0xC0 | (code >> 6);
        buf[pos++] = 0x80 | (code & 0x3F);
      } else {
        buf[pos++] = 0xE0 | (code >> 12);
        buf[pos++] = 0x80 | ((code >> 6) & 0x3F);
        buf[pos++] = 0x80 | (code & 0x3F);
      }
    }
    return buf.subarray(0, pos);
  },

  utf8Decode(bytes) {
    let result = '';
    let i = 0;
    while (i < bytes.length) {
      const byte1 = bytes[i++];
      if (byte1 < 0x80) {
        result += String.fromCharCode(byte1);
      } else if (byte1 < 0xE0) {
        if (i >= bytes.length) throw new Error('Truncated 2-byte UTF-8 sequence');
        const byte2 = bytes[i++];
        if ((byte2 & 0xC0) !== 0x80) throw new Error('Invalid UTF-8 continuation byte');
        result += String.fromCharCode(((byte1 & 0x1F) << 6) | (byte2 & 0x3F));
      } else {
        if (i + 1 >= bytes.length) throw new Error('Truncated 3-byte UTF-8 sequence');
        const byte2 = bytes[i++];
        const byte3 = bytes[i++];
        if ((byte2 & 0xC0) !== 0x80 || (byte3 & 0xC0) !== 0x80) {
          throw new Error('Invalid UTF-8 continuation byte');
        }
        result += String.fromCharCode(
          ((byte1 & 0x0F) << 12) | ((byte2 & 0x3F) << 6) | (byte3 & 0x3F)
        );
      }
    }
    return result;
  },

  encrypt(str) {
    const data = this.utf8Encode(str);
    const result = new Uint8Array(data.length);
    let keyIndex = 0;
    let accumulator = KEY_BYTES[0];
    for (let i = 0; i < data.length; i++) {
      const keyByte = KEY_BYTES[keyIndex];
      accumulator = (accumulator * MULTIPLIER + keyByte) & 0xFF;
      let val = (data[i] + accumulator) & 0xFF;
      val ^= keyByte;
      val = ((val << 3) | (val >> 5)) & 0xFF;
      result[i] = val;
      accumulator = (accumulator + val) & 0xFF;
      keyIndex = (keyIndex + 1) % KEY_BYTES.length;
    }
    return result;
  },

  decrypt(bytes) {
    const data = new Uint8Array(bytes);
    const result = new Uint8Array(data.length);
    let keyIndex = 0;
    let accumulator = KEY_BYTES[0];
    for (let i = 0; i < data.length; i++) {
      const keyByte = KEY_BYTES[keyIndex];
      accumulator = (accumulator * MULTIPLIER + keyByte) & 0xFF;
      let val = ((data[i] >> 3) | (data[i] << 5)) & 0xFF;
      val ^= keyByte;
      result[i] = (val - accumulator) & 0xFF;
      accumulator = (accumulator + data[i]) & 0xFF;
      keyIndex = (keyIndex + 1) % KEY_BYTES.length;
    }
    return this.utf8Decode(result);
  }
};

Global.TaleConfig = TaleConfig;
module.exports = { TaleConfig };
