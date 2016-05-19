import API from './api';
import DisplayImages from './display-images';
import PageLoader from './page-loader';

const TAGS = 'landscape';
const callback = 'dataHandler';
const URL_PATH = `http://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=${callback}&tags=${TAGS}`;

new API(URL_PATH, callback, DisplayImages);

let displayImages = new DisplayImages();

let pageCallbacks = [
  { page: 'index', callback: displayImages.renderDefault },
  { page: 'saved', callback: displayImages.renderSaved }
];

new PageLoader(pageCallbacks);
