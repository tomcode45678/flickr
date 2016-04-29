import DisplayImages from './display-images';

const TAGS = 'london';
const API = `http://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=dataHandler&tags=${TAGS}`;
const loadingSpinner = document.querySelector('[data-loading-spinner]');

window.dataHandler = function (data) {
  new DisplayImages(data);
  loadingSpinner.classList.remove('spinner--show');
};

let script = document.createElement('script');
script.src = API;

script.onerror = function (e) {
  let sorryMessage = document.createElement('div');
  let sorry = document.createTextNode(`
    We're sorry, we could not retrieve any images from Flickr.
    This is most likely connectivity issues, please make sure you are still connected to the internet.
  `);

  sorryMessage.appendChild(sorry);
  document.body.appendChild(sorryMessage);
  loadingSpinner.classList.remove('spinner--show');
};

document.body.appendChild(script);
