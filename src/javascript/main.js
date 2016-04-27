import DisplayImages from './display-images';

const TAGS = 'london';
const API = `http://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=dataHandler&tags=${TAGS}`;
const loadingSpinner = document.querySelector('[data-loading-spinner]');

window.dataHandler = function (data) {
  new DisplayImages(data);
  
  if (loadingSpinner) {
    loadingSpinner.classList.remove('show');
  }
};

let script = document.createElement('script');
script.src = API;
document.body.appendChild(script);

export let callback = 'dataHandler';
