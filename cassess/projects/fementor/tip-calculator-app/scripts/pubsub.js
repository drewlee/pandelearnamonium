/** @typedef {(...args: unknown[]) => unknown} ListenerFn */

const PubSub = Object.defineProperties(
  {},
  {
    /** @type {Map<string, (...args: unknown[]) => unknown} */
    _registry: {
      value: new Map(),
    },

    _addListener: {
      /**
       * Private helper for registering a custom event listener function.
       *
       * @alias _addListener
       * @param {string} type - The event type.
       * @param {ListenerFn} listener - The event listener function.
       */
      value: function (type, listener) {
        if (typeof type === 'string' && typeof listener === 'function') {
          const listeners = this._registry.get(type) ?? [];

          listeners.push(listener);
          this._registry.set(type, listeners);
        }
      },
    },

    on: {
      /**
       * Public interface for registering custom event listener functions.
       *
       * @alias on
       * @param {string | Record<string, ListenerFn>} type - The event type, or an object of key/value pairs.
       * @param {ListenerFn | undefined} listener - The event listener function.
       */
      value: function (type, listener) {
        if (typeof type !== 'string' && Object.keys(type).length) {
          Object.entries(type).forEach(([type, listener]) => {
            this._addListener(type, listener);
          });
        } else {
          this._addListener(type, listener);
        }
      },
      enumerable: true,
    },

    off: {
      /**
       * Un-registers the specified custom event listener function.
       *
       * @alias off
       * @param {string} type - The event type.
       * @param {ListenerFn} listener - The event listener function.
       */
      value: function (type, listener) {
        if (this._registry.has(type)) {
          const listeners = this._registry.get(type);

          for (let i = 0; i < listeners.length; i++) {
            const regListener = listeners[i];

            if (regListener === listener) {
              listeners.splice(i, 1);
            }
          }

          this._registry.set(type, listeners);
        }
      },
      enumerable: true,
    },

    trigger: {
      /**
       * Executes all the event listener functions associated with the specified type.
       *
       * @alias trigger
       * @param {string} type - The event type.
       * @param  {...unknown} args - The arguments to pass into the event listener functions.
       * @returns {unknown[]} The return values from calling the event listener functions.
       */
      value: function (type, ...args) {
        const results = [];

        if (this._registry.has(type)) {
          this._registry.get(type).forEach((listener) => {
            const result = listener(...args);

            if (result !== undefined) {
              results.push(result);
            }
          });
        }

        return results;
      },
      enumerable: true,
    },
  },
);

export default PubSub;
