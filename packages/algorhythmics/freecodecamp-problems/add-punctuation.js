function addPunctuation(sentences) {
  let fixedSentences = '';

  for (let i = 0; i < sentences.length; i++) {
    if (i > 0 && sentences[i].match(/[A-Z]/) && sentences[i - 1] === ' ') {
      fixedSentences = fixedSentences.slice(0, -1) + '. ';
    }

    fixedSentences += sentences[i];
  }

  fixedSentences += '.';

  return fixedSentences;
}
