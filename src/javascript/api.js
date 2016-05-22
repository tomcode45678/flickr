const loadingSpinner = document.querySelector('[data-loading-spinner]');
let requestComplete = () => loadingSpinner.classList.remove('spinner--show');

export default class API {
  constructor (url, callback, dataHandler, clearContent) {
    this.setHandler(callback, dataHandler);
    this.loadUrl(url, clearContent);
    this.requestComplete = requestComplete;
  }

  setHandler(callback, dataHandler) {
    window[callback] = function (data) {
      new dataHandler(data);
      requestComplete();
    };
  }

  clearUI(clearContent) {
    loadingSpinner.classList.add("spinner--show");
    if (clearContent) {
      clearContent.innerHTML = '';
    }
  }

  loadUrl(url, clearContent) {
    let script = document.createElement('script');
    script.src = url;
    this.clearUI(clearContent);

    script.onerror = function () {
      let sorryMessage = document.createElement('div');
      let sorry = document.createTextNode(`
        We're sorry, we could not retrieve any images from Flickr.
        This is most likely connectivity issues, please make sure you are still connected to the internet.
      `);

      sorryMessage.appendChild(sorry);
      document.body.appendChild(sorryMessage);
      requestComplete();
    };

    document.body.appendChild(script);
  }
}
