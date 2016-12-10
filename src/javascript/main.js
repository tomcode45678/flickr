import API from './api';
import DisplayImages from './display-images';
import PageLoader from './page-loader';
import Search from './search';

const KEY = '7677e20284c7594041992c9bdd391d8a';
const AMOUNT = 24;
const CONFIG = {
  page: 1
};
const imageContainer = document.querySelector('[data-image-container]');

const searchBar = () => Search.searchBar().value;
const URI = () => `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${KEY}&text=${searchBar()}&per_page=${AMOUNT}&page=${CONFIG.page}&content_type=1&format=json&nojsoncallback=1`;
const displayImages = new DisplayImages(imageContainer, CONFIG);

let lastAPICall = null;

const urlRequest = function () {
  if (searchBar().length < 3) {
    return;
  }
  lastAPICall = new API(URI(), displayImages.render.bind(displayImages), imageContainer);
};

displayImages.urlRequest = urlRequest;

urlRequest();

const renderSavedImages = function () {
  lastAPICall.clearUI(imageContainer);
  displayImages.renderSaved(lastAPICall.requestComplete);
};

new PageLoader([
  { page: 'index', callback: urlRequest },
  { page: 'saved', callback: renderSavedImages }
]);

new Search(urlRequest, CONFIG);
