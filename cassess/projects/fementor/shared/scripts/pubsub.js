/**
 * @typedef {(...args: any[]) => any} PubSubListenerFn
 * @typedef {(type: string, listener: PubSubListenerFn) => void} PubSubAddListenerFn
 * @typedef {(typeOrRecord: string | Record<string, PubSubListenerFn | PubSubListenerFn[]>, listener?: PubSubListenerFn) => void} PubSubOnFn
 * @typedef {(type?: string, listener?: PubSubListenerFn) => void} PubSubOffFn
 * @typedef {(type: string, ...args: any[]) => any[]} PubSubTriggerFn
 */

const TYPE_ERROR_MSG = 'Specified an invalid type for the `type` parameter';
const LISTENER_ERROR_MSG = 'Specified an invalid type for the `listener` parameter';

/**
 * Helper function for registering a custom event listener.
 *
 * @type {PubSubAddListenerFn}
 * @this {PubSub}
 * @param type - The event type.
 * @param listener - The event listener function.
 */
function _addListener(type, listener) {
  if (typeof type !== 'string') {
    throw new TypeError(TYPE_ERROR_MSG);
  }

  if (typeof listener !== 'function') {
    throw new TypeError(LISTENER_ERROR_MSG);
  }

  const maybeListeners = this._registry.get(type);
  const listeners = maybeListeners ? maybeListeners.slice() : [];

  listeners.push(listener);
  this._registry.set(type, listeners);
}

/**
 * Public interface for registering custom event listener functions.
 *
 * @type {PubSubOnFn}
 * @this {PubSub}
 * @param typeOrRecord - The event type, or an object of key/value pairs.
 * @param listener - The event listener function.
 */
function on(typeOrRecord, listener) {
  if (typeof typeOrRecord !== 'string' && Object.keys(typeOrRecord).length) {
    for (const [type, listeners] of Object.entries(typeOrRecord)) {
      if (Array.isArray(listeners)) {
        for (const listener of listeners) {
          this._addListener(type, listener);
        }
      } else {
        this._addListener(type, listeners);
      }
    }
  } else {
    // Explicit type checking is handled in the function implementation.
    this._addListener(
      /** @type {string} */ (typeOrRecord),
      /** @type {PubSubListenerFn} */ (listener),
    );
  }
}

/**
 * Un-registers the specified custom event listener functions.
 *
 * @type {PubSubOffFn}
 * @this {PubSub}
 * @param type - The event type.
 * @param listener - The event listener function.
 */
function off(type, listener) {
  if (type === undefined) {
    this._registry.clear();
  } else if (typeof type !== 'string') {
    throw new Error(TYPE_ERROR_MSG);
  } else if (this._registry.has(type)) {
    const regListeners = this._registry.get(type) ?? [];
    const filteredListeners = [];

    for (let i = 0; i < regListeners.length; i++) {
      if (listener !== undefined && listener !== regListeners[i]) {
        filteredListeners.push(regListeners[i]);
      }
    }

    if (filteredListeners.length) {
      this._registry.set(type, filteredListeners);
    } else {
      this._registry.delete(type);
    }
  }
}

/**
 * Executes all the event listener functions associated with the specified type.
 *
 * @type {PubSubTriggerFn}
 * @this {PubSub}
 * @param type - The event type.
 * @param args - The arguments to pass into the event listener functions.
 * @returns The return values from calling the event listener functions.
 */
function trigger(type, ...args) {
  if (typeof type !== 'string') {
    throw new TypeError(TYPE_ERROR_MSG);
  }

  const results = [];

  if (this._registry.has(type)) {
    const regListeners = this._registry.get(type) ?? [];

    for (const listener of regListeners) {
      const result = listener(...args);

      if (result !== undefined) {
        results.push(result);
      }
    }
  }

  return results;
}

/**
 * @type {{
 *  _registry: Map<string, PubSubListenerFn[]>;
 *  _addListener: PubSubAddListenerFn;
 *  on: PubSubOnFn;
 *  off: PubSubOffFn;
 *  trigger: PubSubTriggerFn;
 * }}
 */
const PubSub = Object();

Object.defineProperties(PubSub, {
  _registry: {
    value: new Map(),
  },
  _addListener: {
    value: _addListener.bind(PubSub),
  },
  on: {
    value: on.bind(PubSub),
    enumerable: true,
  },
  off: {
    value: off.bind(PubSub),
    enumerable: true,
  },
  trigger: {
    value: trigger.bind(PubSub),
    enumerable: true,
  },
});

export default PubSub;
