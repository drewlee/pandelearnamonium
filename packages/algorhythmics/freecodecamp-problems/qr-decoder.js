// Coordinates of orientation markers.
// 2x2 squares in the top-left, rop-right,
// and bottom left corners.
const MARKERS = [
  [0, 0],
  [0, 1],
  [0, 4],
  [0, 5],
  [1, 0],
  [1, 1],
  [1, 4],
  [1, 5],
  [4, 0],
  [4, 1],
  [5, 0],
  [5, 1],
];

// Determines whether the QR code is in the correct orientation.
function isValidOrientation(qrCode) {
  for (const [x, y] of MARKERS) {
    if (qrCode[x][y] !== '1') {
      return false;
    }
  }

  return true;
}

// Rotates the QR code 90 degrees clockwise.
function rotateQrCode(qrCode) {
  const newQrCode = new Array(qrCode.length)
    .fill(null)
    .map(() => new Array(qrCode[0].length).fill(null));

  for (let i = 0; i < qrCode.length; i++) {
    const colLen = qrCode[i].length;

    for (let j = 0; j < colLen; j++) {
      newQrCode[i][j] = qrCode[colLen - j - 1][i];
    }
  }

  return newQrCode;
}

function decodeQr(qrCode) {
  let decoded = '';

  // Rotates the QR code until it's in the correct orientation.
  let rotQrCode = qrCode;
  while (!isValidOrientation(rotQrCode)) {
    rotQrCode = rotateQrCode(rotQrCode);
  }

  for (let i = 0; i < rotQrCode.length; i++) {
    for (let j = 0; j < rotQrCode[i].length; j++) {
      // Excludes orientation markers.
      if (!MARKERS.find(([x, y]) => x === i && y === j)) {
        decoded += rotQrCode[i][j];
      }
    }
  }

  return decoded;
}
