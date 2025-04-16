export namespace ComponentType {
  export type ListenerFn = (evt: Event) => void;

  export interface EventRegistry {
    id: string;
    el: string;
    type?: keyof HTMLElementEventMap;
    listener?: string | ListenerFn;
  }
}

export default class Component {
  el: Record<string, HTMLElement> = {};

  events: ComponentType.EventRegistry[] = [];

  constructor(...args: any[]) {
    this.#bindEventListeners();
    this.render(...args);
    this.#addEventListeners();
  }

  /**
   * TODO
   *
   * @param {...any[]} args
   */
  render(...args: any[]) {}

  /**
   * Returns a registry of DOM elements and event listeners to initialize.
   * Must be subclassed.
   */
  registerDOM(): ComponentType.EventRegistry[] {
    throw new Error('The `registerDOM` method must be overridden by the subclass');
  }

  /**
   * Fixes context reference for event listener functions.
   */
  #bindEventListeners() {
    const proto = Object.getPrototypeOf(this);
    const listeners = Object.getOwnPropertyNames(proto) as (keyof typeof Component.prototype)[];

    for (const listener of listeners) {
      if (listener.startsWith('handle') && typeof this[listener] === 'function') {
        this[listener] = (this[listener] as Function).bind(this);
      }
    }
  }

  /**
   * Initializes the event listeners from the provided DOM registry.
   */
  #addEventListeners() {
    const events = this.registerDOM();

    for (const attrs of events) {
      const { el, listener, type } = attrs;

      let callback: ComponentType.ListenerFn = () => {};

      this.el[el] = this.el[el] ?? document.getElementById(attrs.id);

      switch (typeof listener) {
        case 'string':
          callback = this[listener as keyof this] as ComponentType.ListenerFn;
          break;
        case 'function':
          callback = listener;
          break;
        case 'undefined':
          continue;
        default:
          throw new TypeError('Invalid listener type');
      }

      if (type) {
        this.el[el].addEventListener(type, callback);
      }
    }

    this.events = events;
  }
}
