/**
 * Created by wenpq on 17-3-15.
 */

(function () {
  'use strict';

  angular
    .module('urls.url')
    .component('urlsRunUrlComponent', {
      bindings: {
        url: '='
      },
      templateUrl: '/modules/urls/client/url/views/urls.run-url.client.view.html',
      controller: 'UrlsRunUrlController as vm'
    })
    .config(['$sceDelegateProvider', function ($sceDelegateProvider) {
      // config trust web site;
      $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'http://172.20.30.115:3000/**'
      ]);
    }])
    .controller('UrlsRunUrlController', UrlsRunUrlController);

  UrlsRunUrlController.inject = ['$scope', '$http', '$httpProvider'];
  function UrlsRunUrlController($scope, $http) {
    var vm = this;
    vm.$scope = $scope;
    vm.$http = $http;

    // init data here
    vm.$onInit = function () {
      var vm = this;
      vm.urlStrings = [];
      vm.urlResultList = [];
      vm.cycle = 0;
      vm.runEnable = true;
      vm.url = {
        name: 'positionOffsetOverlapIndexLongShort',
        urlPath: 'http://172.20.30.115:3000/api/sherpa/position/positionOffsetOverlapIndexLongShort',
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
      vm.run();
    };

  }

  UrlsRunUrlController.prototype.run = function () {
    var vm = this;
    vm.urlStrings = generateUrlStrings(vm.url);
    vm.urlResultList = generateUrlResultList(vm.urlStrings);
    vm.callServiceRecur(0);
  };

  // TODO: how to call service loop in synchronous way?
  /**
   * this is a evil solution, enable cross-origin request in Chrome, like following:
   *         "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security --user-data-dir
   * @param cycle
   */
  UrlsRunUrlController.prototype.callServiceRecur = function (cycle) {
    var vm = this;
    if (cycle === vm.urlStrings.length) {
      return;
    }
    if (!vm.runEnable) {
      return;
    }
    vm.urlResultList[cycle].status = 1; // 1 means loading;
    var curl = vm.urlStrings[cycle];
    var st = new Date().getTime();
    vm.$http({
      url: curl,
      ignoreInterceptor: true // ignore interceptor in core module
    }).then(function (response) {
      vm.urlResultList[cycle].status = response.status;
      vm.urlResultList[cycle].consumption = new Date().getTime() - st;
      console.log(new Date().getTime() - st);
      vm.callServiceRecur(cycle + 1);
    }).catch(function (response) {
      vm.urlResultList[cycle].status = response.status;
      vm.callServiceRecur(cycle + 1);
    });
  };

  function generateUrlStrings(url) {
    var initStr = url.urlPath + '?';
    var urlStrings = [initStr];
    var parameters = url.parameters;
    for (let k = 0; k < parameters.length; k++) {
      var option = parameters[k].option;
      var name = parameters[k].name;
      var newUrlStrings = [];
      for (let i = 0; i < option.length; i++) {
        if (option[i].checked) {
          for (let j = 0; j < urlStrings.length; j++) {
            var andtag = k === 0 ? '' : '&';
            newUrlStrings.push(urlStrings[j] + andtag + name + '=' + option[i].string);
          }
        }
      }
      urlStrings = newUrlStrings;
    }
    return urlStrings;
  }

  function generateUrlResultList(urlStrings) {
    var urlResultList = [];
    for (let i = 0; i < urlStrings.length; i++) {
      var temp = urlStrings[i].split('?');
      urlResultList.push({
        urlString: urlStrings[i],
        urlShortString: temp[1],
        status: 0, // not start
        consumption: 0
      });
    }
    return urlResultList;
  }
}());
