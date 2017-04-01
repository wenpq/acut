(function () {
  'use strict';

  angular
    .module('urls.main')
    .controller('UrlsMainController', UrlsMainController);

  UrlsMainController.$inject = ['$scope', 'UrlsMainService', 'DTOptionsBuilder', 'DTColumnDefBuilder'];

  function UrlsMainController($scope, UrlsMainService, DTOptionsBuilder, DTColumnDefBuilder, DTColumnBuilder) {
    var vm = this;
    vm.$scope = $scope;
    vm.checkAll = false;
    vm.tableData = [
      {
        'name': 'positionOffsetOverlapIndexLongShort',
        'owner': 'Hang.Rao',
        'group': 'position',
        'status': 0,
        'consumption': 0
      },
      {
        'name': 'positionOffsetOverlapIndexLongShort1',
        'owner': 'Hang.Rao',
        'group': 'position',
        'status': 0,
        'consumption': 0
      },
      {
        'name': 'positionOffsetOverlapIndexLongShort2',
        'owner': 'Hang.Rao',
        'group': 'position',
        'status': 0,
        'consumption': 0
      }];

    vm.dtOptions = DTOptionsBuilder.newOptions()
      .withPaginationType('full_numbers')
      .withDisplayLength(2);
    vm.dtColumnDefs = [
      DTColumnDefBuilder.newColumnDef(0).notSortable(),
      DTColumnDefBuilder.newColumnDef(1),
      DTColumnDefBuilder.newColumnDef(2),
      DTColumnDefBuilder.newColumnDef(3),
      DTColumnDefBuilder.newColumnDef(4),
      DTColumnDefBuilder.newColumnDef(5)
    ];


    vm.setAllItemChecked = function() {
      vm.tableData.forEach(function(d) {
        d.checked = vm.checkAll;
      });
    };
  }
}());
