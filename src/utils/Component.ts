import EventBus from "./EventBus";

type TProps = {
  [key: string]: unknown
  events?: Record<string, (e) => void>
}

type TMeta = {
  tagName: string,
  attributes: Record<string, string | number>,
  props: TProps
};

class Component {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  };

  _element: HTMLElement;
  _meta: TMeta;
  props: TProps;
  eventBus: () => EventBus;

  constructor( props = {}, tagName = "div", attributes = {}) {
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      attributes,
      props
    };

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Component.EVENTS.INIT);
  }

  _registerEvents(eventBus) {
    eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    const { tagName, attributes } = this._meta;
    const newElem: HTMLElement = this._createDocumentElement(tagName);
    Object.entries(attributes).forEach(([key, value]) => {
      if (typeof value === "number") {
        value = value.toString();
      }
      newElem.setAttribute(key, value);
    })
    this._element = newElem;
  }

  init() {
    this._createResources();
    this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
  }

  _componentDidMount() {
    this.componentDidMount();
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidMount() {
    return null;
  }

  dispatchComponentDidMount() {
    this.eventBus().emit(Component.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps, newProps) {
    const isRender = this.componentDidUpdate(oldProps, newProps);
    if (!isRender) {
      return
    }
    this._render();
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidUpdate(oldProps, newProps) {
    return Object.entries(newProps).some(([key, prop]) => (
      oldProps[key] !== prop
    ))
  }

  setProps = nextProps => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element(): HTMLElement {
    return this._element;
  }

  _render() {
    const block = this.render();

    // Этот небезопасный метод для упрощения логики
    // Используйте шаблонизатор из npm или напишите свой безопасный
    // Нужно не в строку компилировать (или делать это правильно),
    // либо сразу в DOM-элементы возвращать из compile DOM-ноду
    this._removeEvents();
    this._element.innerHTML = block;
    this._addEvents();
  }

  // Может переопределять пользователь, необязательно трогать
  render(): string {
    throw new Error('Функция render не переопределена')
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: TProps) {
    // Можно и так передать this
    // Такой способ больше не применяется с приходом ES6+
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    return new Proxy(props, {
      get(target, prop: string) {
        if (prop.startsWith('_')) {
          throw new Error('Нет прав');
        }

        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop: string, value) {
        if (prop.startsWith('_')) {
          throw new Error('Нет прав');
        }
        const oldValue = {...target};
        target[prop] = value;
        self.eventBus().emit(Component.EVENTS.FLOW_CDU, oldValue, target)
        return true;
      },
      deleteProperty() {
        // if (prop.startsWith('_')) {
          throw new Error('нет доступа');
        // } else {
        //  delete target[prop];
        //  return true;
        // }
      },
    });
  }

  _createDocumentElement(tagName) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }

  show() {
    this.getContent().style.display = "block";
  }

  hide() {
    // this.getContent().style.display = "none";
    this._element.style.display = "none";
  }

  _addEvents() {
    const {events = {}} = this.props;

    Object.keys(events).forEach(eventName => {
      this._element.addEventListener(eventName, events[eventName], true);
    });
  }

  _removeEvents() {
    const {events = {}} = this.props;

    Object.keys(events).forEach(eventName => {
      this._element.removeEventListener(eventName, events[eventName], true);
    });
  }

}

export default Component;