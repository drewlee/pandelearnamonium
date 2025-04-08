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
      if (listener.startsWith('handle') && typeof this[listener] === 'function') {
        this[listener] = this[listener].bind(this);
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

      /** @type {ComponentType.ListenerFn} */
      let callback = () => {};

      this[el] = this[el] ?? document.getElementById(attrs.id);

      switch (typeof listener) {
        case 'string':
          callback = this[listener];
          break;
        case 'function':
          callback = listener;
          break;
        case 'undefined':
          continue;
        default:
          throw new TypeError('Invalid listener type');
      }

      this[el].addEventListener(attrs.type, callback);
    }

    this.events = events;
  }
}
