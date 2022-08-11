function render(query, component) {
  const root = document.querySelector(query);
  root.appendChild(component.getContent());
  
  // component.dispatchComponentDidMount();
  return root;
}

export default render;