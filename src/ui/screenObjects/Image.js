class Image extends ScreenObject {
  constructor(parent, path, x, y, width, height) {
    const ptr = malloc(544);
    super(ptr);

    const movieClip = Offsets.libg.ResourceManager.getMovieClip_helper('sc/ui.sc', 'popup_promo');
    const imgArea = Offsets.libg.MovieClip.getChildByName_helper(movieClip, 'img_area');

    const pathPtr = StringUtils.getScPtr(path);
    Offsets.libg.DownloadedImage.ctor(ptr, pathPtr, imgArea, 0, 0, 0, 0);
    Offsets.libg.DownloadedImage.createFromLocalFile(ptr, pathPtr, imgArea);
    StringUtils.clearStringObject(pathPtr);

    Offsets.libg.Sprite.addChild(movieClip, ptr);
    this.setXY(x, y);
    this.setHeightWidthPtr(width, height);
  }
}

Global.Image = Image;
module.exports = { Image };
