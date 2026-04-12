function imageSearch(images, term) {
  const results = images.filter((name) => {
    return name.toLowerCase().includes(term.toLowerCase());
  });

  return results;
}
