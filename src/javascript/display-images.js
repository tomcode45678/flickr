const SAVED = 'saved';

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
    let imageCardClass = 'mdl-card mdl-shadow--2dp';
    let imageCard = document.createElement('article');

    let desc = document.createElement('div');
    desc.innerHTML = asset.description;
    let image = desc.querySelector('img');

    if (this.savedImage(image)) {
      imageCardClass = `${imageCardClass} ${SAVED}`;
    }
    imageCard.className = imageCardClass;

    let imageCardActions = document.createElement('div');
    imageCardActions.className = 'mdl-card__actions';

    let imageCardTitle = document.createElement('div');
    imageCardTitle.className = 'card-image card-image__title';

    let imageTitle = document.createTextNode(asset.title);
    imageCardTitle.appendChild(imageTitle);

    let imageCardSaved = document.createElement('div');
    imageCardSaved.className = 'card-image card-image__saved';

    imageCardSaved.innerHTML = '&#x2665;';

    imageCardActions.appendChild(imageCardTitle);
    imageCardActions.appendChild(imageCardSaved);

    imageCard.appendChild(image);
    imageCard.appendChild(imageCardActions);
    return imageCard;
  }

  bindEvents() {
    this.imageContainer.addEventListener('click', this.selectedHandler.bind(this));
  }

  selectedHandler(e) {
    let target = e.target;

    if (target.nodeName !== "ARTICLE") {
      target = target.parentNode;
      if (target.className === 'mdl-card__actions') {
        target = target.parentNode;
      }
    }

    target.classList.toggle(SAVED);
    this.toggleSavedImage(target, target.querySelector('img'));
  }

  toggleSavedImage(imageCard, selectedImage) {
    if (imageCard.classList.contains(SAVED)) {
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
