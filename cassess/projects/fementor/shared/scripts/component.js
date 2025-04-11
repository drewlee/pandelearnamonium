/**
 * @namespace ComponentType
 * @typedef {(evt: Event) => void} ComponentType.ListenerFn
 * @typedef {{ id: string, el: string, type?: string, listener?: string | ComponentType.ListenerFn }} ComponentType.EventRegistry
 */

export default class Component {
  /** @type {ComponentType.EventRegistry[]} */
  events = [];

  constructor() {
    this.#bindEventListeners();
    this.#addEventListeners();
  }

  /**
   * Returns a registry of DOM elements and event listeners to initialize.
   * Must be subclassed.
   *
   * @returns {ComponentType.EventRegistry[]}
   */
  registerDOM() {
    throw new Error('The `registerDOM` method must be overridden by the subclass');
  }

  /**
   * Fixes context reference for event listener functions.
   */
  #bindEventListeners() {
    Object.getOwnPropertyNames(Object.getPrototypeOf(this)).forEach((listener) => {
      const listenerType = /** @type {keyof this} */ (listener);

      if (listener.startsWith('handle') && typeof this[listenerType] === 'function') {
        this[listenerType] = this[listenerType].bind(this);
      }
    });
  }

  /**
   * Initializes the event listeners from the provided DOM registry.
   */
  #addEventListeners() {
    const events = this.registerDOM();

    for (const attrs of events) {
      const { el, listener } = attrs;
      const elType = /** @type {keyof this} */ (el);

      /** @type {ComponentType.ListenerFn} */
      let callback = () => {};

      /** @type {any} */ (this[elType]) = this[elType] ?? document.getElementById(attrs.id);

      switch (typeof listener) {
        case 'string':
          callback = /** @type {ComponentType.ListenerFn} */ (
            this[/** @type {keyof this} */ (listener)]
          );
          break;
        case 'function':
          callback = listener;
          break;
        case 'undefined':
          continue;
        default:
          throw new TypeError('Invalid listener type');
      }

      /** @type {HTMLElement} */ (this[elType]).addEventListener(attrs.type, callback);
    }

    this.events = events;
  }
}
