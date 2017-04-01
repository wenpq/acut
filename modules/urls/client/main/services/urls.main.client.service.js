(function () {
  'use strict';

  angular
    .module('urls.main')
    .service('UrlsMainService', UrlsMainService);

  UrlsMainService.$inject = ['$resource', '$log'];

  function UrlsMainService($resource, $log) {
    var vm = this;
    vm.urls = ['url1', 'url2'];

    vm.query = function() {
      return this.urls;
    };
  }
}());
