import API from './api';
import DisplayImages from './display-images';
import PageLoader from './page-loader';
//import Search from './search';

const TEXT = 'beautiful landscape';
const KEY = '7677e20284c7594041992c9bdd391d8a';
const URI = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${KEY}&text=${TEXT}&content_type=1&format=json&nojsoncallback=1`;
const imageContainer = document.querySelector('[data-image-container]');
let lastAPICall = null;
let displayImages = new DisplayImages(imageContainer);

let urlRequest = function () {
  lastAPICall = new API(URI, displayImages.render.bind(displayImages), imageContainer);
};

urlRequest();

let renderSavedImages = function () {
  lastAPICall.clearUI(imageContainer);
  displayImages.renderSaved(lastAPICall.requestComplete);
};

new PageLoader([
  { page: 'index', callback: urlRequest },
  { page: 'saved', callback: renderSavedImages }
]);

//new Search().mobileSearch();
