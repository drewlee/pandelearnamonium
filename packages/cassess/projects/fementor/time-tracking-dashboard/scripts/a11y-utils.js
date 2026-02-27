/**
 * Sets the tabindex and focus on the specified HTML element.
 *
 * @param {HTMLElement} el - The HTML element.
 */
export function setFocus(el) {
  setTabindex(el);
  el.focus();
}

/**
 * Sets the tabindex and event listener for cleanup.
 *
 * @param {HTMLElement} el - The HTML element.
 */
export function setTabindex(el) {
  el.setAttribute('tabindex', '-1');
  el.addEventListener('focusout', handleCleanupTabindex);
}

/**
 * Event listener handling tabindex cleanup.
 *
 * @param {FocusEvent} evt - The event object.
 */
export function handleCleanupTabindex(evt) {
  const { target } = evt;

  if (target instanceof HTMLElement) {
    target.removeAttribute('tabindex');
    target.removeEventListener('focusout', handleCleanupTabindex);
  }
}
