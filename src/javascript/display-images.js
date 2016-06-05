const SAVED = 'saved';

export default class DisplayImages {
  constructor (imageContainer) {
    this.imageContainer = imageContainer;
    this.savedImages = JSON.parse(localStorage.getItem('savedImages')) || [];

    if (imageContainer) {
      this.bindEvents(imageContainer);
    }
  }

  render(data) {
    let photo = data.photos.photo;
    if (photo.length) {
      this.renderAssets(photo);
    }
    else {
      let sorryMessage = document.createElement('div');
      let sorry = document.createTextNode(`
        We're sorry, we could not retrieve any images from Flickr matching your search.
      `);

      sorryMessage.appendChild(sorry);
      this.imageContainer.appendChild(sorryMessage);
    }
  }

  renderSaved(callback) {
    this.renderAssets(this.savedImages);
    callback();
  }

  renderAssets(assets) {
    let imageFragments = document.createDocumentFragment();
    for (let i = 0, assetsLength = assets.length; i < assetsLength; i++) {
      let asset = assets[i];
      imageFragments.appendChild(this.renderAsset(asset));
    }
    this.imageContainer.innerHTML = '';
    this.imageContainer.appendChild(imageFragments);
  }

  renderAsset(asset) {
    let imageCardClass = 'mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-cell--8-col-phone mdl-card mdl-shadow--2dp';
    let imageCard = document.createElement('article');
    let imageSrc = asset;
    let image = document.createElement('img');

    if (typeof asset === 'object') {
      const FARM = asset.farm;
      const SERVER = asset.server;
      const ID = asset.id;
      const SECRET = asset.secret;
      imageSrc = `https://farm${FARM}.staticflickr.com/${SERVER}/${ID}_${SECRET}_c.jpg`;
    }

    image.src = imageSrc;

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

  bindEvents(imageContainer) {
    imageContainer.addEventListener('click', e => this.selectedHandler(e));
  }

  selectedHandler(e) {
    let target = e.target;

    while (target.nodeName !== "ARTICLE" && target !== document) {
      target = target.parentNode;
    }

    if (target === document) {
      return;
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
}
