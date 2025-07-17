const focusableEls = new Set(['button', 'select', 'textarea', 'summary']);

/**
 * The listener function for the `focusout` event. Used to remove the applied `tabindex` attribute
 * from the element that was focused.
 *
 * @param event - The event object.
 * @remarks
 * `event.currentTarget` - The element that initiated the event.
 */
function handleFocusOutTabindex({ currentTarget }: Event): void {
  if (currentTarget instanceof HTMLElement) {
    currentTarget.removeAttribute('tabindex');
  }
}

/**
 * Determines whether the specified element is focusable by default, e.g., `<button>`. If the
 * element is disabled, `null` is returned as it can not be programmatically focused.
 *
 * @param el - The specified element to test.
 * @returns Whether the specified element is focusable by default.
 */
export function isFocusableElement(el: HTMLElement): boolean | null {
  // Disabled elements can not be made focusable.
  if (!el || el.hasAttribute('disabled')) {
    return null;
  }

  // This check is by no means exhaustive and covers only typical use-cases. It does not
  // account for invisible/hidden elements or complex embedding, e.g., iframe, object, embed, etc.
  return (
    el.hasAttribute('tabindex') ||
    el.getAttribute('contenteditable') === 'true' ||
    (el.tagName === 'A' && el.hasAttribute('href')) ||
    (el.tagName === 'INPUT' && el.getAttribute('type') !== 'hidden') ||
    focusableEls.has(el.tagName.toLowerCase())
  );
}

/**
 * Sets focus on the specified element. If the element is not focusable by default, e.g., `<div>`,
 * a `tabindex` attribute of `-1` is applied.
 *
 * @param el - The element to place focus on.
 */
export function setFocus(el: HTMLElement): void {
  const isFocusable = isFocusableElement(el);

  // Terminate early if the element can not be made focusable, e.g., `<button disabled>`.
  if (isFocusable === null) {
    return;
  }

  // Set `tabindex` on non-focusable elements.
  if (!isFocusable) {
    el.setAttribute('tabindex', '-1');
    // Remove `tabindex` once the element is focused out.
    el.addEventListener('focusout', handleFocusOutTabindex, { once: true });
  }

  requestAnimationFrame(() => el.focus());
}
