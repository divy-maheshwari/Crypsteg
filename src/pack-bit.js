const packBit = (pixel, position, bit) => {
  let color;

  switch (position % 3) {
    case 0:
      color = 'r';
      break;
    case 1:
      color = 'g';
      break;
    case 2:
      color = 'b';
      break;
  }

  if (bit) {
    pixel[color] |= 1;
  } else {
    pixel[color] &= ~1;
  }

  return pixel;
};

module.exports = packBit;
