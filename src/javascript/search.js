const SEARCH = document.querySelector('[data-search]');
const MOBILE_SEARCH = document.querySelector('[data-mobile-search]');
const HEADER_ITEMS = document.querySelectorAll('[data-header-item]');
const HEADER_ROW = document.querySelector('[data-header-row]');
const DESKTOP_SEARCH = document.querySelector('[data-desktop-search]');
const MOBILE_ICON = MOBILE_SEARCH.querySelector('i');

export default class Search {
  constructor (request) {
    this.bindEvents(request);
    this.mobileSearch();
  }

  static searchBar() {
    return SEARCH;
  }

  bindEvents(request) {
    let timer = setTimeout;
    SEARCH.addEventListener('keyup', e => {
      if (this.testKey(e)) {
        clearTimeout(timer);
        timer = setTimeout(request, 400);
      }
      e.preventDefault();
    });
  }

  testKey(e) {
    let value = false;
    if (e.key && /[a-z]|[A-Z]|[0-9]/.test(e.key)) {
      value = true;
    }
    else if (e.keyCode) {
      let keyCode = e.keyCode;
      if ((keyCode > 45 && keyCode < 91) || keyCode === 8) {
        value = true;
      }
      value = false;
    }
    return value;
  }

  mobileSearch () {
    MOBILE_SEARCH.addEventListener('click', this.toggleMobileSearch);
  }

  toggleMobileSearch() {
    let toggleDevice = 'add';
    let toggleClass = 'remove';
    let headerPadding = '';
    let iconValue = 'search';

    if (MOBILE_ICON.innerHTML === 'search') {
      toggleDevice = 'remove';
      toggleClass = 'add';
      headerPadding = '16px';
      iconValue = 'cancel';
    }

    MOBILE_ICON.innerHTML = iconValue;
    this.classList[toggleDevice]('mdl-cell--hide-tablet', 'mdl-cell--hide-desktop');

    for (let i = 0; i < HEADER_ITEMS.length; i++) {
      HEADER_ITEMS[i].classList[toggleClass]('hidden');
    }
    document.querySelector('.mdl-layout__drawer-button').classList[toggleClass]('hidden');

    HEADER_ROW.style.paddingLeft = headerPadding;
    DESKTOP_SEARCH.classList[toggleDevice]('mdl-cell--hide-phone', 'desktop');
  }
}
