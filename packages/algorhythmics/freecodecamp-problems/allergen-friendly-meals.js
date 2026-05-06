function getAllergenFriendlyMeals(meals, allergens) {
  const allergensSet = new Set(allergens);
  const result = [];

  for (const [name, algns] of meals) {
    let hasAllergen = false;

    for (const algn of algns) {
      if (allergensSet.has(algn)) {
        hasAllergen = true;
        break;
      }
    }

    if (!hasAllergen) {
      result.push(name);
    }
  }

  return result;
}
