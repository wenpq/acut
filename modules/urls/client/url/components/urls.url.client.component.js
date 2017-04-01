/**
 * Created by wenpq on 17-3-8.
 */

(function () {
  'use strict';

  angular
    .module('urls.url')
    .component('urlsUrlComponent', {
      templateUrl: '/modules/urls/client/url/views/urls.url.client.view.html',
      controller: 'UrlsUrlController as vm'
    })
    .controller('UrlsUrlController', UrlsUrlController);

  function UrlsUrlController() {
    var vm = this;
    vm.$onInit = $onInit;

    function $onInit() {
      vm.url = {
        name: 'positionOffsetOverlapIndexLongShort',
        urlPath: 'position/positionOffsetOverlapIndexLongShort',
        createBy: 'Hang.Rao',
        modifyOn: '03/14/2017',
        group: 'position',
        isPublic: true,
        testType: 'random',
        cycles: 1,
        parameters: [{
          name: 'clientId',
          option: [{ string: '1', checked: true }]
        }, {
          name: 'collectiveId',
          option: [{ string: '7', checked: true }]
        }, {
          name: 'activityDateId',
          option: [{ string: '9500', checked: true }]
        }, {
          name: 'isNra',
          option: [{ string: '0', checked: true }]
        }, {
          name: 'isJmr',
          option: [{ string: '1', checked: true }]
        }, {
          name: 'chartType',
          option: [{ string: 'overlap', checked: true }]
        }, {
          name: 'benchmarkId',
          option: [
            { string: '1001', checked: true },
            { string: '1002', checked: true },
            { string: '1003', checked: true },
            { string: '1004', checked: true },
            { string: '1005', checked: true },
            { string: '1006', checked: true }
          ]
        }],
        result: 'ObjectId'
      };
    }
    console.log('UrlsUrlController init');
  }

}());
