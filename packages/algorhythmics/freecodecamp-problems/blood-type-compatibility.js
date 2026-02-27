function canDonate(donor, recipient) {
  const donLet = donor.slice(0, donor.length - 1);
  const donRh = donor.slice(donor.length - 1);
  const recLet = recipient.slice(0, recipient.length - 1);
  const recRh = recipient.slice(recipient.length - 1);

  if (donRh === '+' && recRh === '-') {
    return false;
  }

  if (
    (donLet === 'A' && recLet === 'B') ||
    (donLet === 'B' && recLet === 'A') ||
    (donLet === 'AB' && recLet !== 'AB')
  ) {
    return false;
  }

  return true;
}
