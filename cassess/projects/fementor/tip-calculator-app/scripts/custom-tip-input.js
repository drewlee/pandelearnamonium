import Component from '../../shared/scripts/component.js';
import { getAllowedKeys, validateFloat } from './utils.js';
import PubSub from './pubsub.js';

export default class CustomTipInput extends Component {
  /** @type {Set<string>} */
  #allowedKeys = null;

  constructor() {
    super();

    this.#allowedKeys = getAllowedKeys();
    this.#allowedKeys.add('.');
    this.#allowedKeys.add('Enter');

    PubSub.on({
      clearAllValues: this.handleClearValues,
      clearPartialValues: this.handleClearValues,
    });
  }

  /**
   * Returns a registry of DOM elements and event listeners to initialize.
   *
   * @returns {Record<string, string | (e: Event) => void>[]}
   */
  registerDOM() {
    return [
      {
        id: 'splitter-custom-tip-input',
        el: 'el',
        type: 'keydown',
        listener: 'handleKeyDown',
      },
      {
        id: 'splitter-custom-tip-input',
        el: 'el',
        type: 'focusout',
        listener: 'handleFocusOutAndEnter',
      },
    ];
  }

  /**
   * Keydown event listener on the custom tip input element.
   *
   * @param {KeyboardEvent} evt - The keyboard event object.
   */
  handleKeyDown(evt) {
    const { key } = evt;
    const { value } = this.el;

    // Using an allow-list of keys, prevents the input of non-numeric characters, with the
    // exception of a `.` and the "select all" keyboard macro, e.g., `Ctrl + a` or `Cmd + a`.
    // Prevents the input of multiple periods if one has already been entered.
    const isSelectAll = key === 'a' && (evt.metaKey || evt.ctrlKey);
    const isAllowedKey = this.#allowedKeys.has(key);
    const isExtraDot = key === '.' && value.includes('.');

    if (!isSelectAll && (!isAllowedKey || isExtraDot)) {
      evt.preventDefault();
    } else if (key === 'Enter') {
      // Kick off the tip calculation process if the user presses `Enter`.
      this.handleFocusOutAndEnter();
    }
  }

  /**
   * Focusout event listener on the tip input element. Also gets triggered on `Enter` key press.
   */
  handleFocusOutAndEnter() {
    const { value } = this.el;

    // No-op if the user hasn't entered a value.
    if (!value.length) {
      return;
    }

    // Normalizes the input into a valid percentage value.
    const normValue = validateFloat(value);
    const numValue = Number(normValue);

    this.el.value = normValue;

    // Input validation.
    if (isNaN(numValue) || numValue === 0 || numValue > 100 || numValue < 0) {
      // The input is either empty or `0`, not a valid number, a negative number,
      // or more than `100`.
      this.showValidationError();
    } else {
      // No validation errors.
      this.hideValidationError();
      const percent = numValue * 0.01;
      const [isSuccess] = PubSub.trigger('calculateTip', percent);

      if (isSuccess) {
        // Resets the tip buttons if they were previously activated.
        PubSub.trigger('clearTipButtons');
      }
    }
  }

  /**
   * Listener for the `clearAllValues` and `clearPartialValues` custom event.
   * Resets the input to default.
   */
  handleClearValues() {
    this.el.value = '';
  }

  /**
   * Displays the input validation error in the UI.
   */
  showValidationError() {
    this.el.classList.add('error');
    this.el.setAttribute('aria-invalid', true);
  }

  /**
   * Removes the input validation error from the UI.
   */
  hideValidationError() {
    this.el.classList.remove('error');
    this.el.setAttribute('aria-invalid', false);
  }
}
