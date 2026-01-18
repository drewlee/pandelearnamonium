function getsFreeShipping(cart, minimum) {
  const products = new Map([
    ['shirt', 34.25],
    ['jeans', 48.5],
    ['shoes', 75.0],
    ['hat', 19.95],
    ['socks', 15.0],
    ['jacket', 109.95],
  ]);

  const total = cart.reduce((sum, name) => {
    const price = products.get(name);
    return sum + price;
  }, 0);

  return total >= minimum;
}
