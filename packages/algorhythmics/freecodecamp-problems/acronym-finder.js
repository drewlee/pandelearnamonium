const ACRO_REF = [
  'National Avocado Storage Authority',
  'Cats Infiltration Agency',
  'Fluffy Beanbag Inspectors',
  'Department Of Jelly',
  'Wild Honey Organization',
  'Eating Pancakes Administration',
];

function findOrg(acronym) {
  return ACRO_REF.find((name) => {
    const currAcro = name
      .split(' ')
      .map((word) => word[0])
      .join('');

    return currAcro === acronym;
  });
}
