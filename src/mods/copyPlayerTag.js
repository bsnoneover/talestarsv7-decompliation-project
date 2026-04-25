const CopyPlayerTag = {
  update() {
    Interceptor.replace(
      Offsets.libg.PlayerInfo.refreshPlayerHeader,
      new NativeCallback(
        function (playerInfoPtr) {
          let playerTag = '0';

          const interceptor = Interceptor.attach(Offsets.libg.HashTagCodeGenerator.toCode, {
            onLeave(result) {
              playerTag = StringUtils.readStringFromStringObject(result);
              interceptor.detach();
            }
          });

          Offsets.libg.PlayerInfo.refreshPlayerHeader(playerInfoPtr);

          const button = { ptr: Offsets.libg.DropGUIContainer.addGameButton(playerInfoPtr.add(208).readPointer(), StringUtils.getStrPtr('tag_txt'), 1) };

          ButtonRegistry.push({
            btn: button,
            callback() {
              ButtonCallbacks.CopyPlayerTag.onTagClick(null, playerTag);
            }
          });
        }, 'void', ['pointer'])
    );
  }
};

module.exports = { CopyPlayerTag };