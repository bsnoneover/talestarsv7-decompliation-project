const ButtonType = {
  NORMAL: 0,
  BLACK: 1,
  MAP_EDITOR_EXIT_BUTTON: 2,
  NORMAL_SELECTED: 3,
  INFO: 4,
  SETTINGS: 5,
  TALEPLUS: 6,
  SWITCH: 7
};

class Button extends ScreenObject {
  constructor(parent, x, y, text, type = ButtonType.NORMAL, scale = 0, decoration = null, callback) {
    const ptr = malloc(544);
    super(ptr);

    this.type = type;
    this.textValue = text;
    this.decorateValue = decoration;
    this.callback = callback;

    let movieClip = this._getMovieClipForType(type);

    Offsets.libg.GameButton.ctor(ptr);
    new NativeFunction(ptr.readPointer().add(352).readPointer(), 'void', ['pointer', 'pointer', 'bool'])(ptr, movieClip, 1);

    this.movieClip = movieClip;
    this.setXY(x, y);

    if (type === ButtonType.TALEPLUS) {
      this.setHeightWidthPtr(0.8, 0.8);
    } else {
      this.setHeightWidth(scale);
    }

    this.textField = type === ButtonType.BLACK ? 'label_txt' : type === ButtonType.MAP_EDITOR_EXIT_BUTTON ? 'txt' : 'Text';
    this.setText(text, decoration);

    if (type === ButtonType.NORMAL_SELECTED) {
      Offsets.libg.MovieClip.gotoAndStopFrameIndex(movieClip, 0);
    }
  }

  _getMovieClipForType(type) {
    switch (type) {
      case ButtonType.BLACK: {
        const profile = Offsets.libg.ResourceManager.getMovieClip_helper('sc/ui.sc', 'popup_player_profile');
        const skinsBtn = Offsets.libg.MovieClip.getMovieClipByName_helper(profile, 'skins_button');
        const editIcon = Offsets.libg.MovieClip.getMovieClipByName_helper(skinsBtn, 'edit_pic_icon');
        editIcon.add(8).writeU8(0);
        return skinsBtn;
      }
      case ButtonType.MAP_EDITOR_EXIT_BUTTON:
      case ButtonType.TALEPLUS:
        return Offsets.libg.ResourceManager.getMovieClip_helper('sc/ui.sc', 'map_editor_exit_button');
      case ButtonType.NORMAL:
      case ButtonType.NORMAL_SELECTED:
        return Offsets.libg.ResourceManager.getMovieClip_helper('sc/ui.sc', 'country_item');
      case ButtonType.INFO: {
        const friends = Offsets.libg.ResourceManager.getMovieClip_helper('sc/ui.sc', 'friends_info');
        return Offsets.libg.MovieClip.getMovieClipByName_helper(friends, 'button_info');
      }
      case ButtonType.SETTINGS: {
        const popup = Offsets.libg.ResourceManager.getMovieClip_helper('sc/ui.sc', 'popup_profile');
        const header = Offsets.libg.MovieClip.getMovieClipByName_helper(popup, 'header');
        const statsBtn = Offsets.libg.MovieClip.getMovieClipByName_helper(header, 'previous_stats_button');

        const playerProfile = Offsets.libg.ResourceManager.getMovieClip_helper('sc/ui.sc', 'popup_player_profile');
        const profileStats = Offsets.libg.MovieClip.getMovieClipByName_helper(playerProfile, 'profile_stats');
        const nameBtn = Offsets.libg.MovieClip.getMovieClipByName_helper(profileStats, 'name_button');
        const editIcon = Offsets.libg.MovieClip.getMovieClipByName_helper(nameBtn, 'edit_pic_icon');

        const iconPtr = malloc(544);
        const iconObj = new ScreenObject(iconPtr);
        Offsets.libg.Sprite.ctor(iconPtr, 1);
        new NativeFunction(Offsets.libg.DropGUIContainer.ctor, 'void', ['pointer', 'pointer'])(iconPtr, editIcon);
        iconObj.setHeightWidth(-0.03);
        iconObj.setXY(127, 20);
        Offsets.libg.Sprite.addChild(statsBtn, iconPtr);

        return statsBtn;
      }
      case ButtonType.SWITCH: {
        const settings = Offsets.libg.ResourceManager.getMovieClip_helper('sc/ui.sc', 'popup_notification_settings');
        const muteBtn = Offsets.libg.MovieClip.getMovieClipByName_helper(settings, 'button_mute_chat');
        const txtOn = Offsets.libg.MovieClip.getTextFieldByName_helper(muteBtn, 'text_on');
        const txtOff = Offsets.libg.MovieClip.getTextFieldByName_helper(muteBtn, 'text_off');
        const muteTxt = Offsets.libg.MovieClip.getTextFieldByName_helper(settings, 'mute_chat_txt');

        Offsets.libg.MovieClip.setTextAndScaleIfNecessary(txtOn, StringUtils.getScPtr('ON'), 0, 0);
        Offsets.libg.MovieClip.setTextAndScaleIfNecessary(txtOff, StringUtils.getScPtr('OFF'), 0, 0);
        Offsets.libg.MovieClip.setTextAndScaleIfNecessary(muteTxt, StringUtils.getScPtr('test'), 0, 0);
        return muteBtn;
      }
      default:
        return Offsets.libg.ResourceManager.getMovieClip_helper('sc/ui.sc', 'country_item');
    }
  }

  remove() {
    this.ptr?.add(8).writeU8(0);
    this.ptr = null;
  }

  setText(text, decoration) {
    if (!this.textField || !this.ptr) return;

    const textPtr = StringUtils.getScPtr(text);
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

Global.Button = Button;
Global.ButtonType = ButtonType;
