function generateSignature(name, title, company) {
  const fLetter = name[0].toUpperCase();
  let signature = '::';

  if (fLetter >= 'A' && fLetter <= 'I') {
    signature = '>>';
  } else if (fLetter >= 'J' && fLetter <= 'R') {
    signature = '--';
  }

  signature += name;
  signature += `, ${title}`;
  signature += ` at ${company}`;

  return signature;
}
