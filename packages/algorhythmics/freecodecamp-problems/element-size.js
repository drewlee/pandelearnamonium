function getElementSize(windowSize, elementVw, elementVh) {
  const dims = windowSize.match(/\d+/g);
  const [width, height] = dims.map((dim) => Number(dim));
  const [vw, vh] = [elementVw, elementVh].map((dim) => parseInt(dim, 10));

  const newWidth = (width * vw) / 100;
  const newHeight = (height * vh) / 100;

  return `${newWidth} x ${newHeight}`;
}
