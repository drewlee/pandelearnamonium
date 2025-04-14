/**
 * Change event listener.
 *
 * @param {Event} evt - The event object.
 */
function handleStyleChange({ target: el }) {
  if (!(el instanceof HTMLSelectElement) && !(el instanceof HTMLInputElement)) {
    return;
  }

  const controlName = el.dataset.controls ?? '';
  const container = document.getElementById(controlName);
  const styleName = el.dataset.style ?? controlName.split('-').slice(1).join('-');
  let out = '';

  if (el instanceof HTMLSelectElement) {
    const owns = el.dataset.owns;
    const option = el.options[el.selectedIndex];
    const val = option.value !== '' ? option.value : option.text;

    if (owns) {
      const isDisabled = val !== 'px';
      const inputEl = document.getElementById(owns);

      if (inputEl && inputEl instanceof HTMLInputElement) inputEl.disabled = isDisabled;

      if (!isDisabled) {
        return;
      }
    }

    out = val;
  } else if (el instanceof HTMLInputElement && el.type === 'number') {
    const units = el.dataset.styleUnits ?? '';

    out = `${el.value}${units}`;
  }

  if (out && container) {
    container.style.setProperty(styleName, out);
  }
}

function init() {
  document.querySelectorAll('.grid-style-control').forEach((el) => {
    el.addEventListener('change', handleStyleChange);
  });
}

document.addEventListener('DOMContentLoaded', init);
