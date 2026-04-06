function wiseSpeak(sentence) {
  const wMarkers = new Set(['have', 'must', 'are', 'will', 'can']);
  const punct = sentence[sentence.length - 1];
  sentence = sentence.toLowerCase().slice(0, -1);

  let words = sentence.split(' ');
  let wMarkerIdx = -1;
  for (let i = 0; i < words.length; i++) {
    if (wMarkers.has(words[i])) {
      wMarkerIdx = i;
      break;
    }
  }

  const lastIdx = words.length - 1;
  words[lastIdx] = words[lastIdx] + ',';
  words = [...words.slice(wMarkerIdx + 1), ...words.slice(0, wMarkerIdx + 1)];
  sentence = words.join(' ');
  sentence = sentence[0].toUpperCase() + sentence.slice(1);
  sentence += punct;

  return sentence;
}
