const SAVED = 'saved';

export default class DisplayImages {
  constructor (data) {
    this.imageContainer = document.querySelector('[data-image-container]');
    this.savedImages = JSON.parse(localStorage.getItem('savedImages')) || [];

    if (this.imageContainer && data) {
      this.images = data.items;
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
    let imageCardClass = 'mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-cell--8-col-phone mdl-card mdl-shadow--2dp';
    let imageCard = document.createElement('article');
    let imageSrc = asset;
    let image = null;

    if (typeof asset === 'object') {
      let desc = document.createElement('div');
      desc.innerHTML = asset.description;
      image = desc.querySelector('img');
      imageSrc = image.src;
    }
    else {
      image = document.createElement('img');
      image.src = imageSrc;
    }

    if (this.savedImage(imageSrc)) {
      imageCardClass = `${imageCardClass} ${SAVED}`;
    }
    imageCard.className = imageCardClass;

    let imageCardActions = document.createElement('div');
    imageCardActions.className = 'mdl-card__actions';

    let imageCardTitle = document.createElement('div');
    imageCardTitle.className = 'card-image card-image__title';

    if (asset.title) {
      let imageTitle = document.createTextNode(asset.title);
      imageCardTitle.appendChild(imageTitle);
    }

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

    while (target.nodeName !== "ARTICLE" && target !== document) {
      target = target.parentNode;
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
        break;
      }
    }
  }

  setSavedImages() {
    localStorage.removeItem('savedImages');
    localStorage.setItem('savedImages', JSON.stringify(this.savedImages));
  }

  savedImage(imageSrc) {
    let result = false;

    for (let i = 0; i < this.savedImages.length; i++) {
      let savedImage = this.savedImages[i];
      if (imageSrc === savedImage) {
        result = true;
        break;
      }
    }
    return result;
  }

  renderSaved(callback) {
    this.renderAssets(this.savedImages);
    callback();
  }
}
