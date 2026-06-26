function triageBlood(bank, patients) {
  // Convert bank to map for easier lookup and tracking
  const bankMap = new Map();
  for (const type of bank) {
    const count = bankMap.get(type) ?? 0;
    bankMap.set(type, count + 1);
  }

  // Prioritize patients by compatability
  // Least compatible patients, e.g., O, have higher precedence
  const pPatients = [];
  for (const patient of patients) {
    let priority = 0;

    if (patient === 'O') {
      priority = 1;
    } else if (patient === 'B') {
      priority = 2;
    } else if (patient === 'A') {
      priority = 3;
    } else if (patient === 'AB') {
      priority = 4;
    }

    pPatients.push([patient, priority]);
  }

  pPatients.sort((a, b) => a[1] - b[1]);

  let count = 0;

  // Iterate over the list of patients
  for (const [patient] of pPatients) {
    let matches = [];

    if (patient === 'O') {
      matches = ['O'];
    } else if (patient === 'B') {
      matches = ['B', 'O'];
    } else if (patient === 'A') {
      matches = ['A', 'O'];
    } else if (patient === 'AB') {
      matches = ['AB', 'B', 'A', 'O'];
    }

    for (const match of matches) {
      if (bankMap.has(match)) {
        const currCount = bankMap.get(match);
        const newCount = currCount - 1;

        bankMap.set(match, newCount);
        if (newCount === 0) {
          bankMap.delete(match);
        }

        count++;
        break;
      }
    }
  }

  return `${count} of ${patients.length} patients served`;
}
