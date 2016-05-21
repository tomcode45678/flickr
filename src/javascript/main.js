import API from './api';
import DisplayImages from './display-images';
import PageLoader from './page-loader';

const TAGS = 'beautiful landscape';
const callback = 'dataHandler';
const URL_PATH = `http://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=${callback}&tags=${TAGS}`;
const imageContainer = document.querySelector('[data-image-container]');

function urlRequest () {
  new API(URL_PATH, callback, DisplayImages, imageContainer);
}

urlRequest();

let pageActions = [
  { page: 'index', callback: urlRequest },
  { page: 'saved', callback: 'dataHandler.renderSaved' }
];

new PageLoader(pageActions);
