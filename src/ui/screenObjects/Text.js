class Text extends ScreenObject {
  constructor(parent, x, y, text, scale = 0, decoration = null) {
    const ptr = malloc(544);
    super(ptr);

    this.textValue = text;
    this.decorateValue = decoration;

    const movieClip = Offsets.libg.ResourceManager.getMovieClip_helper('sc/debug.sc', 'debug_menu_text');
    Offsets.libg.Sprite.ctor(ptr, 1);
    new NativeFunction(Offsets.libg.DropGUIContainer.ctor, 'void', ['pointer', 'pointer'])(ptr, movieClip);

    this.setXY(x, y);
    this.setHeightWidthPtr(scale, scale);
    this.textField = 'Text';
    this.movieClip = movieClip;
    this.setText(text, decoration);

    if (!parent.isStage) {
      Offsets.libg.Sprite.addChild(parent.sprite ?? parent, ptr);
    }
  }

  setText(text, decoration) {
    if (!this.ptr || !this.movieClip) return;

    const textPtr = StringUtils.getScPtr(String(text));
    const textField = Offsets.libg.MovieClip.getTextFieldByName_helper(this.movieClip, this.textField);

    if (decoration?.name) {
      DecoratedTextUtils.createGradientFromName(decoration.name);
    } else if (decoration?.colors?.length) {
      DecoratedTextUtils.createGradientFromColors(
        decoration.colors,
        decoration.scale ?? 1,
        decoration.speed ?? 1
      );
    }

    StringUtils.clearStringObject(textPtr);
  }
}

Global.Text = Text;
module.exports = { Text };
