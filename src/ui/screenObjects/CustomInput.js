const InputType = { NORMAL: 0 };
let inputIdCounter = 100;
const CustomInputRegistry = new Map();

class CustomInput {
  constructor(title, buttonText, maxLength, type, callback) {
    this.title = title;
    this.buttonText = buttonText;
    this.type = type;
    this.maximumLength = maxLength;
    this.callback = callback;
    this.ptr = null;
    this.inputId = inputIdCounter++;
    CustomInputRegistry.set(this.inputId, this);
    this._create();
  }

  _create() {
    if (this.type !== InputType.NORMAL) return;

    const empty = StringUtils.getScPtr('');
    const ptr = malloc(544);
    this.ptr = ptr;

    Offsets.libg.GenericPopup.ctor(ptr, StringUtils.getScPtr('gameroom_joincode_popup'), 0, 0, empty, empty, empty, empty, empty);

    this.ptr.writePointer(Offsets.libg.Other.CustomInputOffset1);
    this.ptr.add(96).writePointer(Offsets.libg.Other.CustomInputOffset2);
    this.ptr.add(416).writeInt(0);
    this.ptr.add(424).writeInt(0);
    this.ptr.add(428).writeU8(1);

    Offsets.libg.GenericPopup.setTitle(ptr, StringUtils.getScPtr(this.title));
    Offsets.libg.GenericPopup.addButton2(ptr, StringUtils.getScPtr('join_button'), this.inputId, StringUtils.getScPtr(this.buttonText));

    const inputBtn = Offsets.libg.GenericPopup.addButton(ptr, StringUtils.getScPtr('team_code_input'), 2);
    let textField = Offsets.libg.MovieClip.getTextFieldByName_helper(inputBtn.add(96).readPointer(), 'text');
    if (textField.toInt32() === 0) {
      textField = Offsets.libg.MovieClip.getTextFieldByName_helper(inputBtn.add(96).readPointer(), 'teamcode_txt');
    }

    Offsets.libg.TextField.fetchFont(textField);
    textField.add(105).writeU8(1);

    const inputField = malloc(200);
    Offsets.libg.GameInputField.ctor(inputField, textField, ptr);
    ptr.add(416).writePointer(inputField);
    Offsets.libg.TextInput.setMaxTextLength(inputField, this.maximumLength);
    inputField.add(196).writeU8(0);

    const initFn = new NativeFunction(inputField.readPointer().add(16).readPointer(), 'void', ['pointer', 'pointer']);
    initFn(inputField, empty);
  }

  show() {
    if (!this.ptr) return;
  }
}

Global.CustomInput = CustomInput;
Global.InputType = InputType;
Global.CustomInputRegistry = CustomInputRegistry;

module.exports = { CustomInput, CustomInputRegistry, InputType };
