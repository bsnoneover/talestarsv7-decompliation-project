const PopupType = {
  SMALL: 0,
  NORMAL: 1,
  BIG: 2,
  BRAWLPASS_REMINDER_POPUP: 3
};

const PopupState = {
  numOfPopups: 0
};

class Popup {
  constructor(name, type, bottomButton) {
    this.name = name;
    this.type = type;
    this.bottomButton = bottomButton ?? { type: 'add' };
    this.ptr = malloc(544);
    this._create();
  }

  _create() {
    if (this.type !== PopupType.SMALL) return;

    try {
      const empty = StringUtils.getScPtr('');
      const popupType = StringUtils.getScPtr('gameroom_joincode_popup');
      const inputBtn = StringUtils.getScPtr('team_code_input');
      const joinBtn = StringUtils.getScPtr('join_button');

      Offsets.libg.GenericPopup.ctor(this.ptr, popupType, 0, 0, empty, empty, empty, empty, empty);
      Offsets.libg.GenericPopup.setTitle(this.ptr, StringUtils.getScPtr(this.name));

      const btn1 = Offsets.libg.GenericPopup.addButton(this.ptr, inputBtn, 0);
      const btn2 = Offsets.libg.GenericPopup.addButton(this.ptr, joinBtn, 0);
      btn1.add(8).writeU8(0);
      btn2.add(8).writeU8(0);

      StringUtils.clearStringObjects(empty, popupType, inputBtn, joinBtn);
    } catch (_) { }
  }

  setTitle(title) {
    this.name = title;
    if (!this.ptr) return;
    try {
      Offsets.libg.GenericPopup.setTitle(this.ptr, StringUtils.getScPtr(title));
    } catch (_) { }
  }

  _addBottomButton() {
    const okBtn = StringUtils.getScPtr('ok_button');

    if (this.bottomButton.type === 'add') {
      const url = StringUtils.getScPtr('t.me/talebrawl');
      const button = Offsets.libg.GenericPopup.addButton(this.ptr, okBtn, 0);
      Offsets.libg.TextField.setText(button, url, 1);
      StringUtils.clearStringObjects(okBtn, url);
    } else {
      const button = Offsets.libg.GenericPopup.addButton(this.ptr, okBtn, 0);
      button.add(8).writeU8(0);
      StringUtils.clearStringObject(okBtn);
    }
  }

  show() {
    if (!this.ptr) return;

    PopupState.numOfPopups++;
    if (this.type === PopupType.NORMAL) {
      this._addBottomButton();
    }
    Offsets.libg.GUI.showPopup(Offsets.libg.GUI.getInstance(), this.ptr, 1, 1, 1);
  }
}

Global.Popup = Popup;
Global.PopupType = PopupType;
Global.PopupState = PopupState;

module.exports = { Popup, PopupState };

