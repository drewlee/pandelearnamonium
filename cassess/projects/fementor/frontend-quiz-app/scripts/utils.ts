export function sanitize(input: string): string {
  const divEl = document.createElement('div');
  divEl.innerText = input;

  return divEl.innerHTML;
}
