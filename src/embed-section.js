const crypto = require('crypto');
const Jimp = require('jimp');
const packBit = require('./pack-bit');


const embedSection = (buffer, { _index, _width, _batch, _clone }) => {
  let pixel;
  let hex;
  let bit;

  for (var i = 0; i < buffer.length; i++) {
    const octect = buffer[i];

    for (var j = 0; j < 8; j++) {
      if (j % 3 == 0) {
        if (pixel) {
          hex = Jimp.rgbaToInt(pixel.r, pixel.g, pixel.b, pixel.a);
          _batch.setPixelColor(hex, _index % _width, Math.floor(_index / _width));
          _index++;
        }
        hex = _clone.getPixelColor(_index % _width, Math.floor(_index / _width));
        pixel = Jimp.intToRGBA(hex);
      }
      if (octect & (1 << (7 - j))) {
        bit = 1;
      } else {
        bit = 0;
      }
      pixel = packBit(pixel, j, bit);
    }

    if (i == buffer.length - 1) {
      pixel.b |= 1;
    } else {
      pixel.b &= ~1;
    }

    hex = Jimp.rgbaToInt(pixel.r, pixel.g, pixel.b, pixel.a);
    _batch.setPixelColor(hex, _index % _width, Math.floor(_index / _width));
    _index++;
    pixel = undefined;
    hex = undefined;
  }
};

module.exports = embedSection;
