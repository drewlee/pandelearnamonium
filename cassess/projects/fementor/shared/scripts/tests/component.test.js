import Component from '../component.js';

/** @import {ComponentType} from '../component.js' */

/** @type {ComponentType.EventRegistry[]} */
const DEFAULT_REGISTRY = [
  {
    id: 'test-button',
    el: 'testBtnEl',
  },
];

let registry = DEFAULT_REGISTRY;

/** @type {(customRegistry: ComponentType.EventRegistry[]) => void} */
function setRegistry(customRegistry) {
  registry = customRegistry;
}

/** @type {() => ComponentType.EventRegistry[]} */
function getRegistry() {
  return registry;
}

class EmptyComponent extends Component {}

class TestComponent extends Component {
  registerDOM() {
    this.testBtnEl = null;
    this.testBtnEl1 = null;
    this.testBtnEl2 = null;
    this.testBtnEl3 = null;

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

    expect(component.testBtnEl).toEqual(btnEl);
  });

  test('Assigns the specified DOM element to an instance property when defining event listeners', () => {
    const btnEl = document.createElement('button');
    btnEl.id = 'test-button';
    document.body.appendChild(btnEl);

    const spyFn = vi.fn();
    const registry = [
      {
        ...DEFAULT_REGISTRY[0],
        type: 'click',
        listener: spyFn,
      },
    ];

    setRegistry(registry);

    const component = new TestComponent();

    expect(component.testBtnEl).toEqual(btnEl);
  });

  test('Assigns the specified anonymous event listener to the element', () => {
    const btnEl = document.createElement('button');
    btnEl.id = 'test-button';
    document.body.appendChild(btnEl);

    const spyFn = vi.fn();
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
    const events = {
      type: 'click',
      listener: 'handleTestButtonClick',
    };
    const registry = [
      {
        id: 'test-button-1',
        el: 'testBtnEl1',
        ...events,
      },
      {
        id: 'test-button-2',
        el: 'testBtnEl2',
        ...events,
      },
      {
        id: 'test-button-3',
        el: 'testBtnEl3',
        ...events,
      },
    ];

    setRegistry(registry);

    const component = new TestComponent();

    btnEls.forEach((el) => el.click());

    expect(spyFn).toHaveBeenCalledTimes(3);
    expect(component.events).toStrictEqual(registry);
    expect(component.testBtnEl1).toEqual(btnEls[0]);
    expect(component.testBtnEl2).toEqual(btnEls[1]);
    expect(component.testBtnEl3).toEqual(btnEls[2]);
  });
});

describe('Component.bindEventListeners', () => {
  test('Fixes the context of event listener functions', () => {
    const btnEl = document.createElement('button');
    btnEl.id = 'test-button';
    document.body.appendChild(btnEl);

    let context = null;

    const spyFn = vi
      .spyOn(TestComponent.prototype, 'handleTestButtonClick')
      .mockImplementation(function () {
        context = this;
      });

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

    const spyFn = vi
      .spyOn(TestComponent.prototype, 'mishandleTestButtonClick')
      .mockImplementation(function () {
        context = this;
      });

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
