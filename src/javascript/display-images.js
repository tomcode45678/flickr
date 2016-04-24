/* globals document */

export default class DisplayImages {
  constructor (data) {
    this.images = data.items;
    this.imageContainer = document.querySelector('[data-image-container]');
    this.renderAssets(data.items);
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
}
