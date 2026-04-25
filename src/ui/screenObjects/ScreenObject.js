class ScreenObject {
  constructor(ptr) {
    this.ptr = ptr;
    this.textField = null;
    this.movieClip = null;
    this.defaultXY = null;
    this.textValue = '';
    this.decorateValue = false;
  }

  remove() {
    if (!this.ptr) return;
    this.ptr.add(8).writeU8(0);
    this.ptr = null;
  }

  hide() {
    if (!this.defaultXY) {
      this.defaultXY = this.getXY();
    }
    this.setXY(9999, 9999);
  }

  reveal() {
    if (!this.defaultXY) return;
    this.setXY(this.defaultXY.x, this.defaultXY.y);
    this.defaultXY = null;
  }

  getXY() {
    return {
      x: this.ptr.add(32).readFloat(),
      y: this.ptr.add(36).readFloat()
    };
  }

  setXY(x, y) {
    this.ptr.add(32).writeFloat(x);
    this.ptr.add(36).writeFloat(y);
  }

  getHeightWidth() {
    return {
      height: this.ptr.add(16).readFloat(),
      width: this.ptr.add(28).readFloat()
    };
  }

  setHeightWidthPtr(height, width) {
    if (height != null) this.ptr.add(16).writeFloat(height);
    if (width != null) this.ptr.add(28).writeFloat(width);
  }

  setHeightWidth(delta) {
    if (delta == null) return;
    const { height, width } = this.getHeightWidth();
    this.setHeightWidthPtr(height + delta, width + delta);
  }

  setOpacity(opacity) {
    this.ptr.add(9).add(3).writeU8(opacity);
  }

  gotoAndStopFrameIndex(index) {
    if (!this.movieClip) return;
  }

  setColor(rgb) {
    if (!rgb) return;
    this.ptr.add(9).add(0).writeU8(rgb[0]);
    this.ptr.add(9).add(1).writeU8(rgb[1]);
  }

  get text() {
    return this.textValue;
  }

  set text(value) {
    this.textValue = value;
    this.setText(value, this.decorateValue);
  }

  get decorate() {
    return this.decorateValue;
  }

  set decorate(value) {
    this.decorateValue = value;
    this.setText(this.textValue, value);
  }

  setText(text, decorate) {
    if (!this.ptr || !this.textField) return;
  }
}

Global.ScreenObject = ScreenObject;
module.exports = { ScreenObject };
