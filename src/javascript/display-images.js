export default class DisplayImages {
  constructor (data) {
    this.images = data.items;
    this.imageContainer = document.querySelector('[data-image-container]');

    if (this.imageContainer) {
      this.renderAssets(data.items);
      this.bindEvents();
    }
  }

  renderAssets(assets) {
    let imageFragments = document.createDocumentFragment();

    for (let i = 0, assetsLength = assets.length; i < assetsLength; i++) {
      let asset = assets[i];
      imageFragments.appendChild(this.renderAsset(asset));
    }
    this.imageContainer.appendChild(imageFragments);
  }

  renderAsset(asset) {
    let article = document.createElement('article');
    article.innerHTML = asset.description;
    return article;
  }

  bindEvents() {
    this.imageContainer.addEventListener('click', this.selectedHandler.bind(this));
  }

  selectedHandler(e) {
    let target = e.target;
    if (target.nodeName === "IMG") {
      target.classList.toggle('selected');
    }

    e.preventDefault();
  }
}
