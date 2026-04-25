class Slider extends ScreenObject {
  constructor(parent, x, y, maxValue, maxLabel, isHidden = false, initialValue = null, onChange = null, scale = 1) {
    const ptr = malloc(544);
    super(ptr);

    const movieClip = Offsets.libg.ResourceManager.getMovieClip_helper('sc/ui.sc', 'age_gate_dialog');
    const bg = Offsets.libg.MovieClip.getChildByName_helper(movieClip, 'slider_bg');
    const slider = Offsets.libg.MovieClip.getChildByName_helper(movieClip, 'slider');
    const bubble = Offsets.libg.MovieClip.getChildByName_helper(movieClip, 'slider_bubble');

    if (isHidden) Global.ptr(0);

    Offsets.libg.GameSliderComponent.ctor(ptr, bg, slider, bubble, 0);
    Offsets.libg.GameSliderComponent.setValueBounds(ptr, 3, maxValue);
    Offsets.libg.GameSliderComponent.setMaxValueLabel(ptr, StringUtils.getScPtr(maxLabel));

    const updateFn = new NativeFunction(ptr.readPointer().add(416).readPointer(), 'void', ['pointer']);

    ptr.add(32).writeFloat(x);
    ptr.add(36).writeFloat(y);
    this.setXY(x, y);
    this.setHeightWidthPtr(scale, scale);

    if (initialValue != null) {
      ptr.add(208).writeInt(initialValue);
    }

    if (parent.isStage) {
      Offsets.libg.Stage.addToStage(ptr);
    } else {
      const sprite = parent.sprite ?? parent;
      Offsets.libg.Sprite.addChild(sprite, ptr);
    }

    if (typeof onChange === 'function') {
      GameMainUpdateHooks.push(() => {
        const val = ptr.add(208).readInt();
        onChange(val);
        updateFn(ptr);
      });
    }

    this.movieClip = movieClip;
    this.callback = onChange;
  }
}

Global.Slider = Slider;
module.exports = { Slider };
