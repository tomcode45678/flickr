import API from './api';
import DisplayImages from './display-images';

const TAGS = 'london';
const callback = 'dataHandler';
const URL = `http://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=${callback}&tags=${TAGS}`;

let api = new API(URL, callback, DisplayImages);
