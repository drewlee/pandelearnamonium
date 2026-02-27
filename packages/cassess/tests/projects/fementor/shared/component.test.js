import { Component } from '../index.js';

/** @import { ComponentTypeEventRegistry } from '../../../../projects/fementor/shared/scripts/component.js' */

/** @type {ComponentTypeEventRegistry[]} */
const DEFAULT_REGISTRY = [
  {
    id: 'test-button',
    el: 'testBtn',
  },
];

let registry = DEFAULT_REGISTRY;

/** @type {(customRegistry: ComponentTypeEventRegistry[]) => void} */
function setRegistry(customRegistry) {
  registry = customRegistry;
}

/** @type {() => ComponentTypeEventRegistry[]} */
function getRegistry() {
  return registry;
}

class EmptyComponent extends Component {}

class TestComponent extends Component {
  registerDOM() {
    return getRegistry();
  }

  handleTestButtonClick() {}

  mishandleTestButtonClick() {}
}

afterEach(() => {
  setRegistry(DEFAULT_REGISTRY);
  document.body.innerHTML = '';
  vi.restoreAllMocks();
});

describe('Component', () => {
  test('Extends the base component', () => {
    const component = new TestComponent();

    expect(component).toBeInstanceOf(Component);
    expect(component).toBeInstanceOf(TestComponent);
  });
});

describe('Component.registerDOM', () => {
  test("Throws error if `registerDOM` isn't overridden by the subclass", () => {
    expect(() => new EmptyComponent()).toThrowError();
  });

  test('Assigns the returned object to an instance property', () => {
    const component = new TestComponent();

    expect(component.events).toStrictEqual(registry);
  });

  test('Assigns the specified DOM element to an instance property with no defined event listeners', () => {
    const btnEl = document.createElement('button');
    btnEl.id = 'test-button';
    document.body.appendChild(btnEl);

    const component = new TestComponent();

    expect(component.el.testBtn).toEqual(btnEl);
  });

  test('Assigns the specified DOM element to an instance property when defining event listeners', () => {
    const btnEl = document.createElement('button');
    btnEl.id = 'test-button';
    document.body.appendChild(btnEl);

    const spyFn = vi.fn();

    /** @type {ComponentTypeEventRegistry[]} */
    const registry = [
      {
        ...DEFAULT_REGISTRY[0],
        type: 'click',
        listener: spyFn,
      },
    ];

    setRegistry(registry);

    const component = new TestComponent();

    expect(component.el.testBtn).toEqual(btnEl);
  });

  test('Assigns the specified anonymous event listener to the element', () => {
    const btnEl = document.createElement('button');
    btnEl.id = 'test-button';
    document.body.appendChild(btnEl);

    const spyFn = vi.fn();

    /** @type {ComponentTypeEventRegistry[]} */
    const registry = [
      {
        ...DEFAULT_REGISTRY[0],
        type: 'click',
        listener: spyFn,
      },
    ];

    setRegistry(registry);

    new TestComponent();
    btnEl.click();

    expect(spyFn).toHaveBeenCalledOnce();
  });

  test('Assigns the specified class event listener to the element', () => {
    const btnEl = document.createElement('button');
    btnEl.id = 'test-button';
    document.body.appendChild(btnEl);

    const spyFn = vi.spyOn(TestComponent.prototype, 'handleTestButtonClick');

    /** @type {ComponentTypeEventRegistry[]} */
    const registry = [
      {
        ...DEFAULT_REGISTRY[0],
        type: 'click',
        listener: 'handleTestButtonClick',
      },
    ];

    setRegistry(registry);

    new TestComponent();
    btnEl.click();

    expect(spyFn).toHaveBeenCalledOnce();
  });

  test('Works with multiple registered elements', () => {
    const btnEls = [1, 2, 3].map((n) => {
      const btnEl = document.createElement('button');
      btnEl.id = `test-button-${n}`;
      document.body.appendChild(btnEl);

      return btnEl;
    });

    const spyFn = vi.spyOn(TestComponent.prototype, 'handleTestButtonClick');

    /** @type {{ type: keyof HTMLElementEventMap, listener: string }} */
    const events = {
      type: 'click',
      listener: 'handleTestButtonClick',
    };

    /** @type {ComponentTypeEventRegistry[]} */
    const registry = [
      {
        id: 'test-button-1',
        el: 'testBtn1',
        ...events,
      },
      {
        id: 'test-button-2',
        el: 'testBtn2',
        ...events,
      },
      {
        id: 'test-button-3',
        el: 'testBtn3',
        ...events,
      },
    ];

    setRegistry(registry);

    const component = new TestComponent();

    btnEls.forEach((el) => el.click());

    expect(spyFn).toHaveBeenCalledTimes(3);
    expect(component.events).toStrictEqual(registry);
    expect(component.el.testBtn1).toEqual(btnEls[0]);
    expect(component.el.testBtn2).toEqual(btnEls[1]);
    expect(component.el.testBtn3).toEqual(btnEls[2]);
  });
});

describe('Component.bindEventListeners', () => {
  test('Fixes the context of event listener functions', () => {
    const btnEl = document.createElement('button');
    btnEl.id = 'test-button';
    document.body.appendChild(btnEl);

    let context = null;

    const spyFn = vi.spyOn(TestComponent.prototype, 'handleTestButtonClick').mockImplementation(
      /** @this {TestComponent} */
      function () {
        context = this;
      },
    );

    /** @type {ComponentTypeEventRegistry[]} */
    const registry = [
      {
        ...DEFAULT_REGISTRY[0],
        type: 'click',
        listener: 'handleTestButtonClick',
      },
    ];

    setRegistry(registry);

    const component = new TestComponent();
    btnEl.click();

    expect(spyFn).toHaveBeenCalledOnce();
    expect(context).toEqual(component);
  });

  test('Does not fix the context for functions not starting with `handle`', () => {
    const btnEl = document.createElement('button');
    btnEl.id = 'test-button';
    document.body.appendChild(btnEl);

    let context = null;

    const spyFn = vi.spyOn(TestComponent.prototype, 'mishandleTestButtonClick').mockImplementation(
      /** @this {TestComponent} */
      function () {
        context = this;
      },
    );

    /** @type {ComponentTypeEventRegistry[]} */
    const registry = [
      {
        ...DEFAULT_REGISTRY[0],
        type: 'click',
        listener: 'mishandleTestButtonClick',
      },
    ];

    setRegistry(registry);

    new TestComponent();
    btnEl.click();

    expect(spyFn).toHaveBeenCalledOnce();
    expect(context).toEqual(btnEl);
  });
});

describe('Component.render', () => {
  afterEach(() => {
    TestComponent.prototype.render = Component.prototype.render;
  });

  test('Renders HTML when given a container element', () => {
    const divEl = document.createElement('div');
    divEl.id = 'app';
    document.body.appendChild(divEl);

    TestComponent.prototype.render = function () {
      return `<ul id="list">
        <li>One</li>
        <li>Two</li>
        <li>Three</li>
      </ul>`;
    };

    new TestComponent({ container: divEl });
    const rendered = document.getElementById('list');

    expect(rendered).not.toBeNull();
    expect(rendered).instanceOf(HTMLUListElement);
  });

  test('Passes all arguments to the render function', () => {
    const divEl = document.createElement('div');
    divEl.id = 'app';
    document.body.appendChild(divEl);

    TestComponent.prototype.render = function () {
      return `<ul id="list">
        <li>One</li>
        <li>Two</li>
        <li>Three</li>
      </ul>`;
    };

    const renderSpy = vi.spyOn(TestComponent.prototype, 'render');
    const arg1 = { container: divEl };
    const arg2 = 'foo';
    const arg3 = 9999;

    new TestComponent(arg1, arg2, arg3);

    expect(renderSpy).toHaveBeenCalledOnce();
    expect(renderSpy).toHaveBeenCalledWith(arg1, arg2, arg3);
  });

  test('Does not run if a container is not provided', () => {
    TestComponent.prototype.render = function () {
      return `<ul id="list">
        <li>One</li>
        <li>Two</li>
        <li>Three</li>
      </ul>`;
    };

    const renderSpy = vi.spyOn(TestComponent.prototype, 'render');
    new TestComponent();

    expect(renderSpy).not.toHaveBeenCalledOnce();
  });

  test('Does not render if no HTML has been provided', () => {
    const html = '<h1>Hello World!</h1><p>Lorem Ipsum</p>';
    const divEl = document.createElement('div');
    divEl.id = 'app';
    divEl.innerHTML = html;
    document.body.appendChild(divEl);

    TestComponent.prototype.render = function () {
      return '';
    };

    new TestComponent({ container: divEl });

    expect(divEl.innerHTML).toBe(html);
  });
});

describe('Component.destroy', () => {
  test('Removes a class event listener from the element', () => {
    const btnEl = document.createElement('button');
    btnEl.id = 'test-button';
    document.body.appendChild(btnEl);

    const spyFn = vi.spyOn(TestComponent.prototype, 'handleTestButtonClick');

    /** @type {ComponentTypeEventRegistry[]} */
    const registry = [
      {
        ...DEFAULT_REGISTRY[0],
        type: 'click',
        listener: 'handleTestButtonClick',
      },
    ];

    setRegistry(registry);

    const component = new TestComponent();
    btnEl.click();

    expect(spyFn).toHaveBeenCalledOnce();

    component.destroy();
    btnEl.click();

    expect(spyFn).toHaveBeenCalledOnce();
  });

  test('Removes an anonymous event listener from the element', () => {
    const btnEl = document.createElement('button');
    btnEl.id = 'test-button';
    document.body.appendChild(btnEl);

    const spyFn = vi.fn();

    /** @type {ComponentTypeEventRegistry[]} */
    const registry = [
      {
        ...DEFAULT_REGISTRY[0],
        type: 'click',
        listener: spyFn,
      },
    ];

    setRegistry(registry);

    const component = new TestComponent();
    btnEl.click();

    expect(spyFn).toHaveBeenCalledOnce();

    component.destroy();
    btnEl.click();

    expect(spyFn).toHaveBeenCalledOnce();
  });

  test('Deletes all registered elements from the instance', () => {
    const btnEls = [1, 2, 3].map((n) => {
      const btnEl = document.createElement('button');
      btnEl.id = `test-button-${n}`;
      document.body.appendChild(btnEl);

      return btnEl;
    });

    /** @type {ComponentTypeEventRegistry[]} */
    const registry = [
      {
        id: 'test-button-1',
        el: 'testBtn1',
      },
      {
        id: 'test-button-2',
        el: 'testBtn2',
      },
      {
        id: 'test-button-3',
        el: 'testBtn3',
      },
    ];

    setRegistry(registry);

    const component = new TestComponent();

    expect(component.el.testBtn1).toEqual(btnEls[0]);
    expect(component.el.testBtn2).toEqual(btnEls[1]);
    expect(component.el.testBtn3).toEqual(btnEls[2]);

    component.destroy();

    expect(component.el.testBtn1).toBeUndefined();
    expect(component.el.testBtn2).toBeUndefined();
    expect(component.el.testBtn3).toBeUndefined();
  });

  test('Removes all content from the container', () => {
    const divEl = document.createElement('div');
    divEl.id = 'app';
    document.body.appendChild(divEl);

    TestComponent.prototype.render = function () {
      return `<ul id="list">
        <li>One</li>
        <li>Two</li>
        <li>Three</li>
      </ul>`;
    };

    const component = new TestComponent({ container: divEl });

    expect(document.getElementById('list')).instanceOf(HTMLUListElement);
    expect(divEl.innerHTML).not.toBe('');

    component.destroy();
    expect(divEl.innerHTML).toBe('');

    TestComponent.prototype.render = Component.prototype.render;
  });
});
