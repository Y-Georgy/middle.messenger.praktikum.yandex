import Component from "../Core/Component";

function render(query: string, component: Component) {
  const root = document.querySelector(query);
  if (root) {
    root.innerHTML = "";
    root.append(component.getContent());
  }

  return root;
}

export default render;
