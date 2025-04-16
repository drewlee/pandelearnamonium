import Component from '../../shared/scripts/component.js';
import { CHAR_TYPE, generateRandomPassword } from './random.js';
import { calcPasswordStrength } from './pw-strength.js';

export default class App extends Component {
  /** @type {Set<keyof CHAR_TYPE>} */
  #selectedCharTypes = new Set();

  /** @type {boolean} */
  #isActive = false;

  /** @type {number} */
  #charLength = 0;

  /** @param {Set<keyof CHAR_TYPE>} charTypes */
  set selectedCharTypes(charTypes) {
    this.#selectedCharTypes = charTypes;
    this.checkAppState();
  }

  /** @returns {Set<keyof CHAR_TYPE>} */
  get selectedCharTypes() {
    return this.#selectedCharTypes;
  }

  /** @param {boolean} isActiveParam */
  set isActive(isActiveParam) {
    this.#isActive = isActiveParam;
    this.el.generateBtn.disabled = !isActiveParam;
  }

  /** @returns {boolean} */
  get isActive() {
    return this.#isActive;
  }

  /** @param {string} charLengthParam */
  set charLength(charLengthParam) {
    this.#charLength = Number(charLengthParam);
    this.el.lengthOutput.innerText = charLengthParam;
    this.checkAppState();
  }

  /** @returns {number} */
  get charLength() {
    return this.#charLength;
  }

  /** @type {string} */
  password = '';

  /**
   * Returns a registry of DOM elements and event listeners to initialize.
   *
   * @returns {import('../../shared/scripts/component.js').ComponentType.EventRegistry[]}
   */
  registerDOM() {
    /**
     * @type {{
     *  [key: string]: HTMLElement,
     *  lengthRange: HTMLInputElement,
     *  copyBtn: HTMLButtonElement,
     *  generateBtn: HTMLButtonElement,
     * }}
     */
    this.el;

    return [
      {
        id: 'pw-gen_generate-btn',
        el: 'generateBtn',
        type: 'click',
        listener: 'handleGeneratePassword',
      },
      {
        id: 'pw-gen_length-range',
        el: 'lengthRange',
        type: 'input',
        listener: 'handleRangeInput',
      },
      {
        id: 'pw-gen_length-range',
        el: 'lengthRange',
        type: 'touchstart',
        // Prevents swipe page navigation on mobile browsers.
        listener: (evt) => evt.stopPropagation(),
      },
      {
        id: 'pw-gen_char-checkboxes',
        el: 'checkBoxes',
        type: 'change',
        listener: 'handleCheckBoxes',
      },
      {
        id: 'pw-gen_copy-btn',
        el: 'copyBtn',
        type: 'click',
        listener: 'handleClickToCopy',
      },
      {
        id: 'pw-gen_copy-text',
        el: 'copyText',
      },
      {
        id: 'pw-gen_password-output',
        el: 'pwOutput',
      },
      {
        id: 'pw-gen_length-output',
        el: 'lengthOutput',
      },
      {
        id: 'pw-gen_strength',
        el: 'strength',
      },
      {
        id: 'pw-gen_live-region',
        el: 'liveRegion',
      },
    ];
  }

  /**
   * Event listener for the password generate button.
   */
  handleGeneratePassword() {
    const length = Number(this.el.lengthRange.value);
    const charTypes = this.getCharTypesAsEnum(this.selectedCharTypes);

    this.password = generateRandomPassword(charTypes, length);

    // Update the strength indicator.
    this.updateStrengthIndicator(charTypes, length);
    this.el.copyBtn.disabled = false;

    // Shrinks the font size to fit long passwords.
    length >= 15
      ? this.el.pwOutput.classList.add('shrink-font-size')
      : this.el.pwOutput.classList.remove('shrink-font-size');

    this.el.pwOutput.innerText = this.password;
    this.el.copyText.classList.remove('active');

    this.notifyA11y(`Generated password ${this.password}`);
  }

  /**
   * Input event listener for the character range element.
   */
  handleRangeInput() {
    const { value } = this.el.lengthRange;
    this.charLength = value;

    // Outputs the percentage range value as a data attribute for CSS targeting.
    const min = this.el.lengthRange.getAttribute('min');
    const max = this.el.lengthRange.getAttribute('max');

    if (!min || !max) {
      return;
    }

    const percent = this.calcRangeProgressPercentage(min, max, value);

    this.el.lengthRange.dataset.rangeValue = percent;
  }

  /**
   * Click event listener for the copy to clipboard button.
   */
  handleClickToCopy() {
    navigator.clipboard.writeText(this.password).then(() => {
      this.el.copyText.classList.add('active');
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
      const valueType = /** @type {keyof CHAR_TYPE} */ (value.toUpperCase());
      const charTypes = this.selectedCharTypes;

      checked ? charTypes.add(valueType) : charTypes.delete(valueType);
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
   * @param {Set<keyof CHAR_TYPE>} selectedCharTypes - The selected character types.
   * @returns {CHAR_TYPE[keyof CHAR_TYPE][]} The selected character types as an array of numbers.
   */
  getCharTypesAsEnum(selectedCharTypes) {
    return [...selectedCharTypes].map((charType) => {
      return CHAR_TYPE[charType];
    });
  }

  /**
   * Outputs the strength of the password.
   *
   * @param {CHAR_TYPE[keyof CHAR_TYPE][]} charTypes - The character types. @see CHAR_TYPE
   * @param {number} length - The length of the password.
   */
  updateStrengthIndicator(charTypes, length) {
    const strength = calcPasswordStrength(charTypes, length);
    const className = `strength-${strength + 1}`;

    this.el.strength.className = this.el.strength.className.replace(/ strength-\d/, '');
    this.el.strength.classList.add(className);
  }

  /**
   * Populates a live region to notify a11y users of content changes.
   *
   * @param {string} message - The message to notify.
   */
  notifyA11y(message) {
    this.el.liveRegion.textContent = message;

    // Clear the live region after a short duration.
    setTimeout(() => {
      this.el.liveRegion.textContent = '';
    }, 5000);
  }
}
