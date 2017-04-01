(function () {
  'use strict';

  angular
    .module('urls.main')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('urls', {
        abstract: true,
        url: '/urls',
        template: '<ui-view/>'
      })
      .state('urls.home', {
        url: '',
        templateUrl: '/modules/urls/client/main/views/urls.main.client.view.html',
        controller: 'UrlsMainController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'URLs List'
        }
      });
  }
}());
