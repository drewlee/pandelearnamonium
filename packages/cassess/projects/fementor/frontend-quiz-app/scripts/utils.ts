/**
 * Utility function to sanitized the HTML entities from the given string.
 *
 * @param input - The input to sanitize.
 * @returns The sanitized input.
 */
export function sanitize(input: string): string {
  const divEl = document.createElement('div');
  divEl.innerText = input;

  return divEl.innerHTML;
}
