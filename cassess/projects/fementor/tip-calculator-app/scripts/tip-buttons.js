import Component from '../../shared/scripts/component.js';
import PubSub from '../../shared/scripts/pubsub.js';

export default class TipButtons extends Component {
  /** @type {HTMLButtonElement | null} */
  #activeEl = null;

  /** @type {Map<string, number>} */
  #tipPercentage = new Map([
    ['splitter-tip-btn-05', 0.05],
    ['splitter-tip-btn-10', 0.1],
    ['splitter-tip-btn-15', 0.15],
    ['splitter-tip-btn-25', 0.25],
    ['splitter-tip-btn-50', 0.5],
  ]);

  constructor() {
    super();

    PubSub.on({
      clearAllValues: this.handleInactiveEl,
      clearPartialValues: this.handleInactiveEl,
      clearTipButtons: this.handleInactiveEl,
    });
  }

  /**
   * Returns a registry of DOM elements and event listeners to initialize.
   *
   * @returns {import('../../shared/scripts/component.js').ComponentTypeEventRegistry[]}
   */
  registerDOM() {
    return [
      {
        id: 'splitter-app',
        el: 'main',
        type: 'click',
        listener: 'handleTipSelection',
      },
    ];
  }

  /**
   * Click event listener on the tip buttons container.
   *
   * @param {MouseEvent} evt - The mouse event object.
   */
  handleTipSelection(evt) {
    const { target } = evt;

    if (target instanceof HTMLButtonElement) {
      const { id } = target;

      if (id && id.startsWith('splitter-tip-btn-')) {
        const percent = this.#tipPercentage.get(id);
        /** @type {boolean[]} */
        const [isSuccess] = PubSub.trigger('calculateTip', percent);

        if (isSuccess) {
          this.setActiveEl(target);
        }
      }
    }
  }

  /**
   * Listener for the `clearAllValues`, `clearPartialValues`,
   * and the `clearTipButtons` custom events.
   */
  handleInactiveEl() {
    // No-op if there's no active button.
    if (this.#activeEl === null) {
      return;
    }

    this.#activeEl.classList.remove('active');
    this.#activeEl.setAttribute('aria-pressed', 'false');
    this.#activeEl = null;
  }

  /**
   * Applies an active state on the specified tip button.
   *
   * @param {HTMLButtonElement} el - The HTML button element.
   */
  setActiveEl(el) {
    this.handleInactiveEl();

    el.classList.add('active');
    el.setAttribute('aria-pressed', 'true');
    this.#activeEl = el;
  }
}
