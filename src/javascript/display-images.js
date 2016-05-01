const SELECTED = 'selected';

export default class DisplayImages {
  constructor (data) {
    this.images = data.items;
    this.imageContainer = document.querySelector('[data-image-container]');
    this.savedImages = JSON.parse(localStorage.getItem('savedImages')) || [];

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
    let desc = document.createElement('div');

    desc.innerHTML = asset.description;
    let image = desc.querySelector('img');

    if (this.savedImage(image)) {
      image.classList.add(SELECTED);
    }

    article.appendChild(image);
    return article;
  }

  bindEvents() {
    this.imageContainer.addEventListener('click', this.selectedHandler.bind(this));
  }

  selectedHandler(e) {
    let target = e.target;

    if (target.nodeName === "IMG") {
      target.classList.toggle(SELECTED);
      this.toggleSavedImage(target);
    }
    e.preventDefault();
  }

  toggleSavedImage(selectedImage) {
    if (selectedImage.classList.contains(SELECTED)) {
      this.savedImages.push(selectedImage.src);
    }
    else {
      this.removeSavedImage(selectedImage.src);
    }
    this.setSavedImages();
  }

  removeSavedImage(selectedImage) {
    for (let i = 0; i < this.savedImages.length; i++) {
      let image = this.savedImages[i];
      if (selectedImage === image) {
        this.savedImages.splice(i, 1);
      }
    }
  }

  setSavedImages() {
    localStorage.removeItem('savedImages');
    localStorage.setItem('savedImages', JSON.stringify(this.savedImages));
  }

  savedImage(image) {
    let result = false;

    for (let i = 0; i < this.savedImages.length; i++) {
      let savedImage = this.savedImages[i];
      if (image.src === savedImage) {
        result = true;
        break;
      }
    }
    return result;
  }
}
