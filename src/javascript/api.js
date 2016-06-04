const loadingSpinner = document.querySelector('[data-loading-spinner]');
let requestComplete = () => loadingSpinner.classList.remove('spinner--show');

export default class API {
  constructor (url, dataHandler, clearContent) {
    this.loadUrl(url, dataHandler, clearContent);
    this.requestComplete = requestComplete;
  }

  clearUI(clearContent) {
    loadingSpinner.classList.add("spinner--show");
    if (clearContent) {
      clearContent.innerHTML = '';
    }
  }

  error() {
    let sorryMessage = document.createElement('div');
    let sorry = document.createTextNode(`
      We're sorry, we could not retrieve any images from Flickr.
      This is most likely connectivity issues, please make sure you are still connected to the internet.
    `);

    sorryMessage.appendChild(sorry);
    document.body.appendChild(sorryMessage);
    requestComplete();
  }

  loadUrl(url, dataHandler, clearContent) {
    let call = new XMLHttpRequest();
    call.open("GET", url, true);
    call.onload = () => {
      if (call.readyState === 4) {
        if (call.status === 200) {
          dataHandler(JSON.parse(call.responseText));
          requestComplete();
        } else {
          this.error();
        }
      }
    };

    call.onerror = this.error;
    call.send(null);

    this.clearUI(clearContent);
  }
}
