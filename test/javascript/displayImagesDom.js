function renderContainer() {
  let imageContainer = document.createElement('div');
  let imageContainerAttribute = document.createAttribute('data-image-container');
  imageContainer.setAttributeNode(imageContainerAttribute);
  document.body.appendChild(imageContainer);
}

export function rerender () {
  document.body.innerHTML = '';
  renderContainer();
}
