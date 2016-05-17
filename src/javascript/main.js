import API from './api';
import DisplayImages from './display-images';

const TAGS = 'london';
const callback = 'dataHandler';
const URL_PATH = `http://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=${callback}&tags=${TAGS}`;

new API(URL_PATH, callback, DisplayImages);
