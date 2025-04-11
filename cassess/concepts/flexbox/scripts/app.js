/**
 * Change event listener.
 *
 * @param {Event} evt - The event object.
 */
function handleStyleChange(evt) {
  const el = /** @type {HTMLSelectElement | HTMLInputElement} */ (evt.target);
  const controlName = el.dataset.controls;
  const container = document.getElementById(controlName);
  const styleName = el.dataset.style ?? controlName.split('-').slice(1).join('-');
  let out = '';

  if (el instanceof HTMLSelectElement) {
    const owns = el.dataset.owns;
    const val = el.options[el.selectedIndex].text;

    if (owns) {
      const isDisabled = val !== 'px';
      const inputEl = /** @type {HTMLInputElement} */ (document.getElementById(owns));
      inputEl.disabled = isDisabled;

      if (!isDisabled) {
        return;
      }
    }

    out = val;
  } else if (el instanceof HTMLInputElement && el.type === 'number') {
    const units = el.dataset.styleUnits ?? '';

    out = `${el.value}${units}`;
  }

  if (out) {
    container.style.setProperty(styleName, out);
  }
}

function init() {
  document.querySelectorAll('.flex-style-control').forEach((el) => {
    el.addEventListener('change', handleStyleChange);
  });
}

document.addEventListener('DOMContentLoaded', init);
