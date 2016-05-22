import API from './api';
import DisplayImages from './display-images';
import PageLoader from './page-loader';

const TAGS = 'beautiful landscape';
const callback = 'dataHandler';
const URL_PATH = `http://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=${callback}&tags=${TAGS}`;
const imageContainer = document.querySelector('[data-image-container]');
let lastAPICall = null;

let urlRequest = function () {
  lastAPICall = new API(URL_PATH, callback, DisplayImages, imageContainer);
};

urlRequest();

let renderSavedImages = function () {
  let displayImages = new DisplayImages();

  lastAPICall.clearUI(imageContainer);
  displayImages.renderSaved(lastAPICall.requestComplete);
};

new PageLoader([
  { page: 'index', callback: urlRequest },
  { page: 'saved', callback: renderSavedImages }
]);
