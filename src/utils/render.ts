import Component from "./Component";

function render(query: string, component: Component) {
  const root = document.querySelector(query);
  if (root) {
    root.appendChild(component.getContent());
  }

  // component.dispatchComponentDidMount();
  return root;
}

export default render;