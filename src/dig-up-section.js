const crypto = require('crypto');
const Jimp  = require('jimp');
const unpackBit = require('./unpack-bit');


const digUpNextSection = ({ _index, _width, _height, _clone }) => {
  var b;
  var pixel;
  var hex
  var buffer = [];

  while (_index < _width * _height) {
    b = 0;
    for (var i = 0; i < 8; i++) {
      if (i % 3 == 0) {
        hex = _clone.getPixelColor(_index % _width, Math.floor(_index / _width));
        pixel = Jimp.intToRGBA(hex);
        _index++;
      }
      b = unpackBit(b, pixel, i);
    }

    buffer.push(b);
    if (pixel.b & 1) {
      break;
    }
  }

  buffer = Buffer.from(buffer);

  return buffer;
};

module.exports = digUpNextSection;
