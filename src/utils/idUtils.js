const ACCOUNT_TAG_CHARS = '0289PYLQGRJCUV';
const ROOM_TAG_CHARS = 'QWERTYUPASDFGHJKLZCVBNM23456789';

const IDUtils = {
  shiftRight(value, bits) {
    return value >>> bits;
  },

  getAccountID(tag) {
    if (!tag.startsWith('#')) tag = '#' + tag;
    const code = tag.slice(1);
    if (typeof code !== 'string') return false;

    let value = 0;
    for (const char of code) {
      value = value * 14 + ACCOUNT_TAG_CHARS.indexOf(char);
    }
    const low = value & 0xFF;
    return [low, this.shiftRight(value - low, 8)];
  },

  getAccountTag(ptr) {
    const low = ptr.readInt();
    const high = ptr.add(4).readInt();
    let value = high * 256 + low;

    const chars = [];
    while (value > 0) {
      chars.unshift(ACCOUNT_TAG_CHARS[value % 14]);
      value = Math.floor(value / 14);
    }
    return chars.join('');
  },

  getRoomTag(high, low) {
    let value = low << (8 + high);
    let result = '';
    while (value > 0) {
      result = ROOM_TAG_CHARS[value % 31] + result;
      value = Math.floor(value / 31);
    }
    return 'X' + result;
  }
};
Global.IDUtils = IDUtils;

module.exports = { IDUtils };
