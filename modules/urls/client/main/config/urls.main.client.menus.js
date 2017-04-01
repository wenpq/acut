(function () {
  'use strict';

  angular
    .module('urls.main')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'URLs',
      state: 'urls.home',
      roles: ['*']
    });
  }
}());
