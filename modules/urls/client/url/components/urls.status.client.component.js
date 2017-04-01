/**
 * Created by wenpq on 17-3-15.
 */

(function () {
  'use strict';

  angular
    .module('urls.url')
    .component('urlsStatusComponent', {
      bindings: {
        status: '<'
      },
      templateUrl: '/modules/urls/client/url/views/urls.status.client.view.html',
      controller: 'UrlsStatusController as vm'
    })
    .controller('UrlsStatusController', UrlsStatusController);

  function UrlsStatusController($scope) {
    var vm = this;
    vm.$scope = $scope;

    // if data change, refresh tag
    vm.$onChanges = function(SimpleChange) {
      // vm.status = angular.copy(vm.status); this link to parent component, not one-way binding, so use clone to make parameter immutable if you want modify vm.status
      // SimpleChange.status.currentValue is equal vm.status
      vm.statusTag = praseStatus(vm.status);
    };

    vm.$scope.$watch('vm.status', function (newValue, oldValue) {
      if (newValue !== oldValue) {
        vm.statusTag = praseStatus(newValue);
      }
    });

    function praseStatus(status) {
      var wait = [0];
      var loading = [1];
      var success = [200];
      if (wait.indexOf(status) > -1) {
        return 'waiting';
      }
      if (loading.indexOf(status) > -1) {
        return 'loading';
      }
      if (success.indexOf(status) > -1) {
        return 'success';
      }
      return 'error';
    }
  }
}());
