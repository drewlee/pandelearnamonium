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
  container: HTMLElement | undefined;

  el: Record<string, HTMLElement> = {};

  events: ComponentType.EventRegistry[] = [];

  constructor(...args: any[]) {
    this.#bindEventListeners();
    this.#initialRender(...args);

    const events = this.registerDOM();

    this.#addEventListeners(events);
    this.events = events;
  }

  /**
   * Fixes context reference for event listener functions.
   */
  #bindEventListeners() {
    const proto = Object.getPrototypeOf(this);
    const listeners = Object.getOwnPropertyNames(proto) as (keyof Component)[];

    for (const listener of listeners) {
      if (listener.startsWith('handle') && typeof this[listener] === 'function') {
        this[listener] = (this[listener] as Function).bind(this);
      }
    }
  }

  #initialRender(...args: any[]) {
    for (const arg of args) {
      if (Object.hasOwn(arg, 'container') && arg.container instanceof HTMLElement) {
        this.container = arg.container;
      }
    }

    if (!this.container) {
      return;
    }

    const source = this.render(...args);

    if (source) {
      this.container.innerHTML = source.trim();
    }
  }

  /**
   * Initializes the event listeners from the provided DOM registry.
   *
   * @param events - The event registry object.
   */
  #addEventListeners(events: ComponentType.EventRegistry[]): void {
    for (const attrs of events) {
      const { el, listener, type } = attrs;
      const callback = this.#getListenerFn(listener);

      this.el[el] = this.el[el] ?? document.getElementById(attrs.id);

      if (!callback) {
        continue;
      }

      type && this.el[el].addEventListener(type, callback);
    }
  }

  /**
   * Removes the event listeners that were added from the DOM registry.
   */
  #removeEventListeners(): void {
    for (const attrs of this.events) {
      const { el, type, listener } = attrs;
      const callback = this.#getListenerFn(listener);

      if (!callback) {
        continue;
      }

      type && this.el[el].removeEventListener(type, callback);
    }
  }

  /**
   * TODO
   *
   * @param listener - TODO
   * @returns TODO
   */
  #getListenerFn(
    listener: ComponentType.EventRegistry['listener'],
  ): ComponentType.ListenerFn | null {
    let callback: ComponentType.ListenerFn | null = null;

    switch (typeof listener) {
      case 'string':
        callback = this[listener as keyof Component] as ComponentType.ListenerFn;
        break;
      case 'function':
        callback = listener;
        break;
      case 'undefined':
        break;
      default:
        throw new TypeError('Invalid listener type');
    }

    return callback;
  }

  /**
   * Returns a registry of DOM elements and event listeners to initialize.
   * Must be subclassed.
   */
  registerDOM(): ComponentType.EventRegistry[] {
    throw new Error('The `registerDOM` method must be overridden by the subclass');
  }

  /**
   * TODO
   *
   * @param args - TODO
   */
  render(...args: any[]): string {
    return '';
  }

  rerender(...args: any[]) {
    const source = this.render(...args);

    if (source && this.container) {
      this.container.innerHTML = source;
    }

    this.#addEventListeners(this.events);
  }

  destroy(): void {
    this.#removeEventListeners();

    for (const el in this.el) {
      delete this.el[el];
    }

    if (this.container) {
      this.container.innerHTML = '';
    }
  }
}
