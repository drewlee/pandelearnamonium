function handleStyleChange(evt) {
  const el = evt.target;
  const controlName = el.dataset.controls;
  const container = document.getElementById(controlName);
  const styleName = el.dataset.style ?? controlName.split('-').slice(1).join('-');
  let out = '';

  if (el.tagName === 'SELECT') {
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
  } else if (el.tagName === 'INPUT' && el.type === 'number') {
    const units = el.dataset.styleUnits ?? '';

    out = `${el.value}${units}`;
  }

  if (out) {
    container.style[styleName] = out;
  }
}

function init() {
  document.querySelectorAll('.flex-style-control').forEach((el) => {
    el.addEventListener('change', handleStyleChange);
  });
}

document.addEventListener('DOMContentLoaded', init);
