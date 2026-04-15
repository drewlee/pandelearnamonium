function scaleRecipe(ingredients, scale) {
  const result = ingredients.map((ingredient) => {
    const parts = ingredient.split(' ');
    const amount = Number(parts[0]);
    const nAmount = amount * scale;

    return [nAmount, ...parts.slice(1)].join(' ');
  });

  return result;
}
