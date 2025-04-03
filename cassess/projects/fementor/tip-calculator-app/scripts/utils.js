const allowedActiveKeys = ['ArrowLeft', 'ArrowRight', 'Escape', 'Tab'];

const allowedKeys = [
  ...allowedActiveKeys,
  'ArrowDown',
  'ArrowUp',
  'Backspace',
  'Delete',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
];

export const errorMsg = new Map([
  ['zero', "Can't be zero"],
  ['nan', 'Invalid number'],
  ['max', 'Limit exceeded'],
]);

/**
 * Returns a set of allowed active keyboard key values. The values are exposed as a getter function
 * instead of a direct export to avoid inadvertently mutating the original object.
 *
 * @returns {Set<string>} Set of allowed active keyboard key values.
 */
export function getAllowedActiveKeys() {
  return new Set(allowedActiveKeys);
}

/**
 * Returns a set of allowed keyboard key values. The values are exposed as a getter function
 * instead of a direct export to avoid inadvertently mutating the original object. Used to restrict
 * user input to specific characters.
 *
 * @returns {Set<string>} Set of allowed keyboard key values.
 */
export function getAllowedKeys() {
  return new Set(allowedKeys);
}

/**
 * Given a string representation of a whole number, normalizes the value to a valid format.
 * E.g., updates `'00365'` to `'365'`.
 *
 * @param {string} value - The value to normalize.
 * @returns {string} The normalized value or the original value, if it's not a valid number.
 */
export function normalizeWholeNumber(value) {
  const out = Number(value);

  if (isNaN(out)) {
    return value;
  }

  return String(out);
}

/**
 * Given a string representation of a floating point number, normalizes the value to a valid format,
 * including truncating the decimal to two places or applying two decimal places if not present,
 * i.e., currency formatting.
 * E.g., updates `'00365.834789'` to `'365.83'` or `'238'` to `'238.00'`.
 *
 * @param {string} value - The value to normalize.
 * @returns {string} The normalized value or the original value, if it's not a valid number.
 */
export function normalizeFloat(value) {
  const [wholeNumber, float] = value.split('.');
  let normWholeNumber = normalizeWholeNumber(wholeNumber);
  let normFloat = float;

  if (float === undefined || float === '') {
    normFloat = '00';
  } else if (float.length === 1) {
    normFloat = `${float}0`;
  } else if (float.length > 2) {
    normFloat = float.slice(0, 2);
  }

  const out = `${normWholeNumber}.${normFloat}`;

  if (isNaN(out)) {
    return value;
  }

  return out;
}

/**
 * Given a string representation of a floating point number, normalizes the value to a valid format,
 * including truncating the decimal to two digits if it's not a whole number.
 * E.g., updates `'00365.834789'` to `'365.83'`. `'238'` and `'238.1'` will remain unchanged, as
 * `'238'` and  `'238.1'`, respectfully.
 *
 * @param {string} value - The value to normalize.
 * @returns {string} The normalized value or the original value, if it's not a valid number.
 */
export function validateFloat(value) {
  const [wholeNumber, float] = value.split('.');
  let normWholeNumber = normalizeWholeNumber(wholeNumber);
  let normFloat = float;

  if (float !== undefined && float.length > 2) {
    normFloat = float.slice(0, 2);
  }

  const out = normFloat ? `${normWholeNumber}.${normFloat}` : normWholeNumber;

  if (isNaN(out)) {
    return value;
  }

  return out;
}

/**
 * Calculates the share of the cost, given the bill dollar amount, the number of people to split
 * amongst, and the tip percentage.
 *
 * @param {string} bill - The dollar cost of the bill.
 * @param {string} people - The number of people to split the bill amongst.
 * @param {string} percentage - The tip percentage value.
 *
 * @returns {Record<string, number>} The dollar tip amount and total cost amount per person.
 */
export function calculateTips(bill, people, percentage) {
  const splitSubTotal = Number(bill) / Number(people);
  const splitTip = splitSubTotal * Number(percentage);
  const splitTotal = splitSubTotal + splitTip;

  return {
    splitTip: splitTip.toFixed(2),
    splitTotal: splitTotal.toFixed(2),
  };
}
