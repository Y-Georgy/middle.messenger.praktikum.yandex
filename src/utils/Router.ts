import Component from "./Component";
import render from "./render";

type TProps = {rootQuery: string}

class Route {
  _pathname: string;
  _BlockClass: typeof Component;
  _block: Component | null;
  _props: TProps;

  constructor(pathname: string, View: typeof Component, props: TProps) {
    this._pathname = pathname;
    this._BlockClass = View;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
        this._pathname = pathname;
        this.render();
    }
  }

  leave() {
    if (this._block) {
        this._block.hide();
    }
  }

  match(pathname: string) {
    return pathname === this._pathname;
  }

  render() {
    if (!this._block) {
        this._block = new this._BlockClass();
        render(this._props.rootQuery, this._block);
        return;
    }

    this._block.show();
  }
}

export class Router {
  _rootQuery: string;
  routes: Route[]
  static __instance: Router;
  history: History;
  private _currentRoute: Route | null;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(pathname: string, block: typeof Component) {
    const route = new Route(pathname, block, {rootQuery: this._rootQuery});
    this.routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = (event: PopStateEvent) => {
      if (event.currentTarget !== null) {
        this._onRoute((event.currentTarget as HTMLFormElement).location.pathname);
      }
    };

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
        this._currentRoute.leave();
    }

    this._currentRoute = route;
    // route.render(route, pathname);
    route.render();
  }

  go(pathname: string) {
    this.history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back()
  }


  forward() {
    this.history.forward()
  }

  getRoute(pathname: string) {
      return this.routes.find(route => route.match(pathname));
  }
}