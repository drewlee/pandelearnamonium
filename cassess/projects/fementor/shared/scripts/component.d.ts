export namespace ComponentType {
  type ListenerFn = (evt: Event) => void;

  interface EventRegistry {
    id: string;
    el: string;
    type?: keyof HTMLElementEventMap;
    listener?: string | ListenerFn;
  }
}

export default class Component {
  events: ComponentType.EventRegistry[];
  constructor(): void;
  registerDOM(): ComponentType.EventRegistry[];
  #bindEventListeners(): void;
  #addEventListeners(): void;
}
