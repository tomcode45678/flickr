var TEST_REGEXP = /\/(test|dom).javascript\/(?!lib).*.js/i;
var promises = [];

Object.keys(window.__karma__.files).forEach(function(file) {
  if (TEST_REGEXP.test(file)) {
    file = file.replace('/base', '').replace('.js', '');
    if (file.indexOf('Spec') > -1) {
      promises.push(System.import(file));
    }
  }
});

Promise.all(promises).then(function() {
  window.__karma__.start();
});
