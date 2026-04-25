const ColorUtils = {
  namedColors: {
    red: '#ff0000', green: '#00ff00', blue: '#0000ff',
    white: '#ffffff', black: '#000000', cyan: '#00ffff',
    yellow: '#ffff00', magenta: '#ff00ff', gray: '#808080',
    orange: '#ffa500', pink: '#ffc0cb', purple: '#800080'
  },

  parseColor(colorStr) {
    if (!colorStr) throw new Error('Invalid color');
    let hex = colorStr.toLowerCase();
    if (hex.startsWith('#')) hex = hex.slice(1);
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    return [
      parseInt(hex.substring(0, 2), 16),
      parseInt(hex.substring(2, 4), 16),
      parseInt(hex.substring(4, 6), 16)
    ];
  },

  toHex([r, g, b]) {
    const toHexByte = v => Math.round(v).toString(16).padStart(2, '0');
    return toHexByte(r) + toHexByte(g) + toHexByte(b);
  },

  gradient(start, end, steps) {
    const result = [];
    for (let i = 0; i < steps; i++) {
      const t = steps === 1 ? 0 : i / (steps - 1);
      result.push([
        start[0] * (1 - t) + end[0] * t,
        start[1] * (1 - t) + end[1] * t,
        start[2] * (1 - t) + end[2] * t
      ]);
    }
    return result;
  },

  gradient3(color1, color2, color3, steps) {
    const mid = Math.ceil(steps / 2);
    const first = this.gradient(color1, color2, mid);
    const second = this.gradient(color2, color3, steps - mid + 1);
    return first.concat(second.slice(1));
  },

  colorize(text, color1, color2, color3) {
    const chars = Array.from(text);
    const c1 = this.parseColor(color1);
    const c2 = this.parseColor(color2);
    const c3 = this.parseColor(color3);
    const gradient = this.gradient3(c1, c2, c3, chars.length);
    let result = '';
    for (let i = 0; i < chars.length; i++) {
      result += `<c${this.toHex(gradient[i])}>${chars[i]}`;
    }
    return result + '</c>';
  }
};
Global.ColorUtils = ColorUtils;

module.exports = { ColorUtils };
