import Component from '../../shared/scripts/component.js';
import PubSub from '../../shared/scripts/pubsub.js';
import { ERROR_MSG, getAllowedActiveKeys, getAllowedKeys, normalizeFloat } from './utils.js';

export default class BillInput extends Component {
  /** @type {Set<string>} */
  #allowedActiveKeys;

  /** @type {Set<string>} */
  #allowedKeys;

  constructor() {
    super();

    this.#allowedActiveKeys = getAllowedActiveKeys();
    this.#allowedKeys = getAllowedKeys();
    this.#allowedKeys.add('.');

    PubSub.on({
      clearAllValues: this.handleClearValues,
      getInputValues: this.handleGetValues,
    });
  }

  /**
   * Returns a registry of DOM elements and event listeners to initialize.
   *
   * @returns {import('../../shared/scripts/component.js').ComponentTypeEventRegistry[]}
   */
  registerDOM() {
    /**
     * @type {{
     *  [key: string]: HTMLElement,
     *  main: HTMLInputElement,
     * }}
     */
    this.el;

    return [
      {
        id: 'splitter-bill-input',
        el: 'main',
        type: 'keydown',
        listener: 'handleKeyDown',
      },
      {
        id: 'splitter-bill-input',
        el: 'main',
        type: 'focusout',
        listener: 'handleFocusOut',
      },
      {
        id: 'splitter-bill-input-error',
        el: 'error',
      },
    ];
  }

  /**
   * Keydown event listener on the bill input element.
   *
   * @param {KeyboardEvent} evt - The keyboard event object.
   */
  handleKeyDown(evt) {
    const { key } = evt;
    const { value } = this.el.main;

    // Using an allow-list of keys, prevents the input of non-numeric characters, with the
    // exception of a `.` and the "select all" keyboard macro, e.g., `Ctrl + a` or `Cmd + a`.
    // Prevents the input of multiple periods if one has already been entered.
    const isSelectAll = key === 'a' && (evt.metaKey || evt.ctrlKey);
    const isAllowedKey = this.#allowedKeys.has(key);
    const isExtraDot = key === '.' && value.includes('.');

    if (!isSelectAll && (!isAllowedKey || isExtraDot)) {
      evt.preventDefault();
    } else if (!isSelectAll && !this.#allowedActiveKeys.has(key)) {
      // Resets the app if the user has already calculated a tip and begins entering a new value.
      PubSub.trigger('reset');
    }
  }

  /**
   * Focusout event listener on the bill input element.
   */
  handleFocusOut() {
    const { value } = this.el.main;

    // No-op if the user hasn't entered a value.
    if (!value.length) {
      return;
    }

    // Normalizes the input into a valid dollar currency format.
    this.el.main.value = normalizeFloat(value);
  }

  /**
   * Listener for the `clearAllValues` custom event. Resets the input to default.
   */
  handleClearValues() {
    this.el.main.value = '';
  }

  /**
   * Listener for the `getInputValues` custom event. Validates the user's input and returns its
   * value to the caller.
   *
   * @returns {Record<string, string | null>} The bill dollar amount.
   */
  handleGetValues() {
    const { value } = this.el.main;
    const numValue = Number(value);
    let bill = null;

    if (!value.length || numValue === 0) {
      // The input is either empty or `0`.
      this.showValidationError(ERROR_MSG.ZERO);
    } else if (isNaN(numValue) || numValue < 0) {
      // The input is not a valid number. This condition can only occur if the user bypasses the
      // `input[type="number"]` or `keydown` event handler restrictions.
      this.showValidationError(ERROR_MSG.NAN);
    } else if (numValue > 9999999.99) {
      // Exceeded the maximum limit for the amount.
      this.showValidationError(ERROR_MSG.MAX);
    } else {
      // No validation errors.
      this.hideValidationError();
      bill = value;
    }

    return { bill };
  }

  /**
   * Displays the input validation error in the UI.
   *
   * @param {string} msg - The validation error message.
   */
  showValidationError(msg) {
    this.el.main.classList.add('error');
    this.el.main.setAttribute('aria-invalid', 'true');
    this.el.main.setAttribute('aria-describedby', this.el.error.id);
    this.el.error.textContent = msg;
  }

  /**
   * Removes the input validation error from the UI.
   */
  hideValidationError() {
    this.el.main.classList.remove('error');
    this.el.main.setAttribute('aria-invalid', 'false');
    this.el.main.removeAttribute('aria-describedby');
    this.el.error.textContent = '';
  }
}
