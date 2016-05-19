const DEFAULT_NAV = document.querySelectorAll('[data-nav]');

export default class PageLoader {
  constructor (pageCallbacks, navigations = DEFAULT_NAV) {
    this.pageCallbacks = pageCallbacks;
    this.bindEvents(navigations);
  }

  bindEvents(navigations) {
    for (let i = 0, navigationsLength = navigations.length; i < navigationsLength; i++) {
      navigations[i].addEventListener('click', this.pageEventHandler.bind(this));
    }
  }

  pageEventHandler(e) {
    let target = e.target;
    if (!target) {
      return;
    }

    const DATA_ATTRIBUTE = 'data-page';

    if (target.nodeName === 'SPAN') {
      target = target.parentNode;
    }

    if (target.nodeName === "A" && target.hasAttribute(DATA_ATTRIBUTE)) {
      this.loadPage(target.getAttribute(DATA_ATTRIBUTE));
    }
    e.preventDefault();
  }

  loadPage(page) {
    for (let i = 0, pageCallbacksLength = this.pageCallbacks.length; i < this.pageCallbacksLength; i++) {
      let callbackOption = this.pageCallbacks[i];
      if (callbackOption.page === page) {
        callbackOption.callback();
      }
    }
  }
}
