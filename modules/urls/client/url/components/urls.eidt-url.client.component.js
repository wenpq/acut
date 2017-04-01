/**
 * Created by wenpq on 17-3-8.
 */

(function () {
  'use strict';

  angular
    .module('urls.url')
    .component('urlsEditUrlComponent', {
      bindings: {
        url: '='
      },
      templateUrl: '/modules/urls/client/url/views/urls.edit-url.client.view.html',
      controller: 'UrlsEditUrlController as vm'
    })
    .controller('UrlsEditUrlController', UrlsEditUrlController);

  UrlsEditUrlController.inject = ['$scope', '$http', '$filter'];
  function UrlsEditUrlController($scope, $http, $filter) {
    var vm = this;

    vm.isEdit = false;
    vm.editingUrl = {};
    vm.urlSchema = {
      type: 'object',
      format: 'grid',
      properties: {
        name: {
          type: 'string',
          title: 'Name'
        },
        urlPath: {
          type: 'string',
          title: 'URL Path'
        },
        parameters: {
          type: 'array',
          format: 'table',
          title: 'Query Parameters',
          items: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                title: 'Name'
              },
              option: {
                type: 'array',
                title: 'Parameter Option',
                format: 'table',
                items: {
                  type: 'object',
                  properties: {
                    string: {
                      type: 'string',
                      title: 'Option'
                    },
                    checked: {
                      type: 'checkbox',
                      title: 'Traverse',
                      default: true
                    }
                  }
                }
              }
            }
          }
        },
        testConfig: {
          type: 'object',
          format: 'grid',
          title: 'Test Configuration',
          properties: {
            group: {
              type: 'string',
              title: 'Group',
              enum: [
                'No Group',
                'other'
              ]
            },
            public: {
              type: 'boolean',
              title: 'Public',
              format: 'checkbox',
              default: true
            },
            testType: {
              type: 'string',
              title: 'Test Type',
              enum: [
                'random',
                'other'
              ]
            },
            cycles: {
              type: 'integer',
              title: 'Cycles',
              default: 1
            }
          }
        }
      }
    };

    vm.save = save;
    vm.edit = edit;
    vm.$onInit = $onInit;
    vm.onChange = onChange;

    function $onInit() {
      console.log('init...');
    }

    function onChange($editorValue) {
      vm.editingUrl = $editorValue;
    }

    function edit() {
      // copy will strip $$hashKey, Angular adds it to keep track of changes
      var url = angular.copy(vm.url);
      vm.urlStartVal = {
        name: url.name,
        urlPath: url.urlPath,
        parameters: url.parameters,
        testConfig: {
          group: url.group,
          public: url.public,
          testType: url.testType,
          cycles: url.cycles
        }
      };
      vm.isEdit = !vm.isEdit;
    }

    function save() {
      var editingUrl = angular.copy(vm.editingUrl);
      vm.url.name = editingUrl.name;
      vm.url.urlPath = editingUrl.urlPath;
      vm.url.group = editingUrl.testConfig.group;
      vm.url.public = editingUrl.testConfig.public;
      vm.url.testType = editingUrl.testConfig.testType;
      vm.url.cycles = editingUrl.testConfig.cycles;
      vm.url.parameters = editingUrl.parameters;

      console.log('save to db');

      vm.isEdit = false;
    }

  }

}());
