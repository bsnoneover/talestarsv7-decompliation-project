const BUTTONS_TO_REMOVE = ['debug_menu_input_button', 'close_button', 'clear_button'];

class QuickPopup {
  constructor(_, x, y) {
    this.ptr = malloc(544);

    const movieClip = Offsets.libg.ResourceManager.getMovieClip_helper('sc/debug.sc', 'debug_menu');

    Offsets.libg.Sprite.ctor(this.ptr, 1);
    new NativeFunction(Offsets.libg.DropGUIContainer.ctor, 'void', ['pointer', 'pointer'])(this.ptr, movieClip);

    movieClip.add(16).writeFloat(1);
    movieClip.add(28).writeFloat(0.3);
    movieClip.add(32).writeFloat(x);
    movieClip.add(36).writeFloat(y);
    movieClip.add(9).add(0).writeU8(83);
    movieClip.add(9).add(1).writeU8(83);
    movieClip.add(9).add(2).writeU8(83);

    for (const btnName of BUTTONS_TO_REMOVE) {
      try {
        const btn = Offsets.libg.MovieClip.getMovieClipByName_helper(movieClip, btnName);
        if (btn) new ScreenObject(btn).remove();
      } catch (_) { }
    }
  }
}

Global.QuickPopup = QuickPopup;
module.exports = { QuickPopup };
