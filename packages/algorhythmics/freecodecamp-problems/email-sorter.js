function sort(emails) {
  emails
    .sort((a, b) => {
      const aName = a.split('@')[0].toLowerCase();
      const bName = b.split('@')[0].toLowerCase();

      if (aName > bName) {
        return 1;
      } else if (aName < bName) {
        return -1;
      } else {
        return 0;
      }
    })
    .sort((a, b) => {
      const aDomain = a.split('@')[1].toLowerCase();
      const bDomain = b.split('@')[1].toLowerCase();

      if (aDomain > bDomain) {
        return 1;
      } else if (aDomain < bDomain) {
        return -1;
      } else {
        return 0;
      }
    });

  return emails;
}
