import Component from '../../shared/scripts/component.js';
import { CHAR_TYPE, generateRandomPassword } from './random.js';
import { calcPasswordStrength } from './pw-strength.js';

export default class App extends Component {
  /** @type {Set<string>} */
  #selectedCharTypes = new Set();

  /** @type {boolean} */
  #isActive = false;

  /** @type {number} */
  #charLength = 0;

  /** @param {Set<string>} charTypes */
  set selectedCharTypes(charTypes) {
    this.#selectedCharTypes = charTypes;
    this.checkAppState();
  }

  /** @returns {Set<string>} */
  get selectedCharTypes() {
    return this.#selectedCharTypes;
  }

  /** @param {boolean} isActiveParam */
  set isActive(isActiveParam) {
    this.#isActive = isActiveParam;
    this.generateBtnEl.disabled = !isActiveParam;
  }

  /** @returns {boolean} */
  get isActive() {
    return this.#isActive;
  }

  /** @param {string} charLengthParam */
  set charLength(charLengthParam) {
    this.#charLength = Number(charLengthParam);
    this.lengthOutputEl.innerText = charLengthParam;
    this.checkAppState();
  }

  /** @returns {number} */
  get charLength() {
    return this.#charLength;
  }

  /**
   * Returns a registry of DOM elements and event listeners to initialize.
   *
   * @returns {import('../../shared/scripts/component.js').ComponentType.EventRegistry[]}
   */
  registerDOM() {
    /** @type {HTMLButtonElement} */
    this.generateBtnEl = null;

    /** @type {HTMLInputElement} */
    this.lengthRangeEl = null;

    /** @type {HTMLButtonElement} */
    this.copyBtnEl = null;

    /** @type {HTMLElement} */
    this.copyTextEl = null;

    /** @type {HTMLElement} */
    this.checkBoxesEl = null;

    /** @type {HTMLInputElement} */
    this.pwOutputEl = null;

    /** @type {HTMLElement} */
    this.lengthOutputEl = null;

    /** @type {HTMLElement} */
    this.strengthEl = null;

    /** @type {HTMLElement} */
    this.liveRegionEl = null;

    return [
      {
        id: 'pw-gen_generate-btn',
        el: 'generateBtnEl',
        type: 'click',
        listener: 'handleGeneratePassword',
      },
      {
        id: 'pw-gen_length-range',
        el: 'lengthRangeEl',
        type: 'input',
        listener: 'handleRangeInput',
      },
      {
        id: 'pw-gen_length-range',
        el: 'lengthRangeEl',
        type: 'touchstart',
        // Prevents swipe page navigation on mobile browsers.
        listener: (evt) => evt.stopPropagation(),
      },
      {
        id: 'pw-gen_char-checkboxes',
        el: 'checkBoxesEl',
        type: 'change',
        listener: 'handleCheckBoxes',
      },
      {
        id: 'pw-gen_copy-btn',
        el: 'copyBtnEl',
        type: 'click',
        listener: 'handleClickToCopy',
      },
      {
        id: 'pw-gen_copy-text',
        el: 'copyTextEl',
      },
      {
        id: 'pw-gen_password-output',
        el: 'pwOutputEl',
      },
      {
        id: 'pw-gen_length-output',
        el: 'lengthOutputEl',
      },
      {
        id: 'pw-gen_strength',
        el: 'strengthEl',
      },
      {
        id: 'pw-gen_live-region',
        el: 'liveRegionEl',
      },
    ];
  }

  /**
   * Event listener for the password generate button.
   */
  handleGeneratePassword() {
    const length = Number(this.lengthRangeEl.value);
    const charTypes = this.getCharTypesAsEnum(this.#selectedCharTypes);

    this.password = generateRandomPassword(charTypes, length);

    // Update the strength indicator.
    this.updateStrengthIndicator(charTypes, length);
    this.copyBtnEl.disabled = false;

    // Shrinks the font size to fit long passwords.
    length >= 15
      ? this.pwOutputEl.classList.add('shrink-font-size')
      : this.pwOutputEl.classList.remove('shrink-font-size');

    this.pwOutputEl.innerText = this.password;
    this.copyTextEl.classList.remove('active');

    this.notifyA11y(`Generated password ${this.password}`);
  }

  /**
   * Input event listener for the character range element.
   */
  handleRangeInput() {
    const { value } = this.lengthRangeEl;
    this.charLength = value;

    // Outputs the percentage range value as a data attribute for CSS targeting.
    const min = this.lengthRangeEl.getAttribute('min');
    const max = this.lengthRangeEl.getAttribute('max');
    const percent = this.calcRangeProgressPercentage(min, max, value);

    this.lengthRangeEl.dataset.rangeValue = percent;
  }

  /**
   * Click event listener for the copy to clipboard button.
   */
  handleClickToCopy() {
    navigator.clipboard.writeText(this.password).then(() => {
      this.copyTextEl.classList.add('active');
      this.notifyA11y(`Copied password to clipboard`);
    });
  }

  /**
   * Change event listener for the character selection checkboxes.
   *
   * @param {Event} evt - The event object.
   */
  handleCheckBoxes(evt) {
    const { target } = evt;

    if (target instanceof HTMLInputElement) {
      const { checked, value } = target;
      const charTypes = this.selectedCharTypes;

      checked ? charTypes.add(value) : charTypes.delete(value);
      this.selectedCharTypes = charTypes;
    }
  }

  /**
   * Determines whether there are a minimum of selected inputs.
   */
  checkAppState() {
    this.isActive = this.charLength > 0 && this.selectedCharTypes.size > 0;
  }

  /**
   * Calculates the selected range value as a percentage based on its min and max value.
   *
   * @param {string} min - The minimum range value.
   * @param {string} max - The maximum range value.
   * @param {string} value - The current value.
   * @returns {string} The range progress percentage.
   */
  calcRangeProgressPercentage(min, max, value) {
    const range = Number(max) - Number(min);
    const percent = Math.round(((Number(value) - Number(min)) / range) * 100);

    return String(percent);
  }

  /**
   * Transforms the selected character type values into an array of numbers as defined
   * in the `CHAR_TYPE` enum. @see CHAR_TYPE
   *
   * @param {Set<string>} selectedCharTypes - The selected character types.
   * @returns {number[]} The selected character types as an array of numbers.
   */
  getCharTypesAsEnum(selectedCharTypes) {
    return [...selectedCharTypes].map((charType) => {
      return CHAR_TYPE[charType.toUpperCase()];
    });
  }

  /**
   * Outputs the strength of the password.
   *
   * @param {number[]} charTypes - The character types. @see CHAR_TYPE
   * @param {number} length - The length of the password.
   */
  updateStrengthIndicator(charTypes, length) {
    const strength = calcPasswordStrength(charTypes, length);
    const className = `strength-${strength + 1}`;

    this.strengthEl.className = this.strengthEl.className.replace(/ strength-\d/, '');
    this.strengthEl.classList.add(className);
  }

  /**
   * Populates a live region to notify a11y users of content changes.
   *
   * @param {string} message - The message to notify.
   */
  notifyA11y(message) {
    this.liveRegionEl.textContent = message;

    // Clear the live region after a short duration.
    setTimeout(() => {
      this.liveRegionEl.textContent = '';
    }, 5000);
  }
}
