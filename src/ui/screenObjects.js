const { ScreenObject } = require('./screenObjects/ScreenObject');
const { Popup } = require('./screenObjects/Popup');
const { QuickPopup } = require('./screenObjects/QuickPopup');
const { CustomInput } = require('./screenObjects/CustomInput');
const { Button } = require('./screenObjects/Button');
const { Text } = require('./screenObjects/Text');
const { Image } = require('./screenObjects/Image');
const { Slider } = require('./screenObjects/Slider');

Logger.clog('ScreenObjects loaded');

module.exports = { ScreenObject, Popup, QuickPopup, CustomInput, Button, Text, Image, Slider };
