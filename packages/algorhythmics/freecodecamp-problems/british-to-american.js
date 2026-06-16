const wordRef = new Map([
  ['colour', 'color'],
  ['flavour', 'flavor'],
  ['honour', 'honor'],
  ['neighbour', 'neighbor'],
  ['labour', 'labor'],
  ['humour', 'humor'],
  ['centre', 'center'],
  ['fibre', 'fiber'],
  ['defence', 'defense'],
  ['offence', 'offense'],
  ['organise', 'organize'],
  ['recognise', 'recognize'],
  ['analyse', 'analyze'],
]);

function britishToAmerican(sentence) {
  const keys = [...wordRef.keys()];

  for (const key of keys) {
    if (sentence.includes(key)) {
      sentence = sentence.replace(key, wordRef.get(key));
    }
  }

  return sentence;
}
