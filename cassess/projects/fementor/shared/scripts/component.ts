export type ComponentTypeListenerFn = (evt: Event) => void;

export interface ComponentTypeEventRegistry {
  id: string;
  el: string;
  type?: keyof HTMLElementEventMap;
  listener?: string | ComponentTypeListenerFn;
}

export default abstract class Component {
  container: HTMLElement | undefined;
  el: Record<string, HTMLElement> = {};
  events: ComponentTypeEventRegistry[] = [];

  /**
   * @param args - The parameters passed into the class instantiation.
   */
  constructor(...args: unknown[]) {
    this.#bindEventListeners();
    this.#initialRender(...args);

    const events = this.registerDOM();

    this.#addEventListeners(events);
    this.events = events;
    this.afterRender();
  }

  /**
   * Fixes context reference for event listener functions.
   *
   * @sealed
   */
  #bindEventListeners(): void {
    const proto = Object.getPrototypeOf(this) as unknown;
    const listeners = Object.getOwnPropertyNames(proto) as (keyof Component)[];

    for (const listener of listeners) {
      if (listener.startsWith('handle') && typeof this[listener] === 'function') {
        (this[listener] as (...args: unknown[]) => unknown) = this[listener].bind(this);
      }
    }
  }

  /**
   * Renders the HTML markup returned by the `render` function into the specified container element.
   *
   * @sealed
   * @param args - The arguments to pass into the `render` function.
   */
  #initialRender(...args: unknown[]): void {
    for (const arg of args) {
      if (
        arg !== null &&
        typeof arg === 'object' &&
        !Array.isArray(arg) &&
        'container' in arg &&
        Object.hasOwn(arg, 'container') &&
        arg.container instanceof HTMLElement
      ) {
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
  #addEventListeners(events: ComponentTypeEventRegistry[]): void {
    for (const attrs of events) {
      const { el, listener, type } = attrs;
      const callback = this.#getListenerFn(listener);

      this.el[el] = this.el[el] ?? document.getElementById(attrs.id);

      if (!callback) {
        continue;
      }

      if (type) {
        this.el[el].addEventListener(type, callback);
      }
    }
  }

  /**
   * Removes all event listeners that were applied using the DOM registry.
   *
   * @sealed
   */
  #removeEventListeners(): void {
    for (const attrs of this.events) {
      const { el, type, listener } = attrs;
      const callback = this.#getListenerFn(listener);

      if (!callback) {
        continue;
      }

      if (type) {
        this.el[el].removeEventListener(type, callback);
      }
    }
  }

  /**
   * Determines the type of the supplied listener parameter and returns it for reference in
   * `addEventListener` and `removeEventListener`.
   *
   * @sealed
   * @param listener - The supplied listener string or function.
   * @returns A reference to the supplied listener as a function.
   */
  #getListenerFn(listener: ComponentTypeEventRegistry['listener']): ComponentTypeListenerFn | null {
    let callback: ComponentTypeListenerFn | null = null;

    switch (typeof listener) {
      case 'string':
        callback = this[listener as keyof Component] as ComponentTypeListenerFn;
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
   *
   * @virtual
   */
  registerDOM(): ComponentTypeEventRegistry[] {
    throw new Error('The `registerDOM` method must be overridden by the subclass');
  }

  /**
   * An optional hook to subclass which must return the HTML markup to render into the DOM.
   *
   * @virtual
   * @param _args - Typically the data to output as part of the HTML.
   * @returns The HTML markup to render.
   */
  render(..._args: unknown[]): string {
    return '';
  }

  /**
   * An optional hook to subclass which runs after `render` is invoked.
   *
   * @virtual
   */
  afterRender(): void {
    return;
  }

  /**
   * To be called if the HTML content associated with this component are to be rendered back into
   * the DOM.
   *
   * @param args - Typically the data to output as part of the HTML.
   */
  rerender(...args: unknown[]): void {
    const source = this.render(...args);

    if (source && this.container) {
      this.container.innerHTML = source;
    }

    this.#addEventListeners(this.events);
    this.afterRender();
  }

  /**
   * To be called if the HTML content associated with this component are to be removed from the DOM.
   * Primarily used to remove all registered event listeners.
   */
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
