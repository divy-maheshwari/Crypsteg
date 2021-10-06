const unpackBit = (b, pixel, position) => {
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

  if (pixel[color] & 1) {
    b |= 1 << (7 - position);
  }

  return b;
};

module.exports = unpackBit;