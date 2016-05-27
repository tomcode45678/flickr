const DEFAULT_NAV = document.querySelectorAll('[data-nav]');
const LAYOUT = document.querySelector('[data-mdl-layout]');
const DRAWER = document.querySelector('[data-drawer]');

export default class PageLoader {
  constructor (pageCallbacks, navigations = DEFAULT_NAV) {
    this.pageCallbacks = pageCallbacks;
    this.bindEvents(navigations);
  }

  bindEvents(navigations) {
    for (let i = 0, navigationsLength = navigations.length; i < navigationsLength; i++) {
      navigations[i].addEventListener('click', e => this.pageEventHandler(e));
    }
  }

  pageEventHandler(e) {
    let target = e.target;
    if (!target) {
      return;
    }

    const DATA_ATTRIBUTE = 'data-page';

    if (target.nodeName === 'SPAN' || target.nodeName === 'I') {
      target = target.parentNode;
    }

    if (target.nodeName === "A" && target.hasAttribute(DATA_ATTRIBUTE)) {
      this.loadPage(target.getAttribute(DATA_ATTRIBUTE));
    }
    e.preventDefault();
  }

  loadPage(page) {
    if (LAYOUT && DRAWER && DRAWER.classList.contains('is-visible')) {
      LAYOUT.MaterialLayout.toggleDrawer();
    }

    for (let i = 0, pageCallbacksLength = this.pageCallbacks.length; i < pageCallbacksLength; i++) {
      let callbackOption = this.pageCallbacks[i];
      if (callbackOption.page === page) {
        callbackOption.callback();
      }
    }
  }
}
