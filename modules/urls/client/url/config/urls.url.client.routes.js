(function () {
  'use strict';

  angular
    .module('urls.url')
    .config(routeConfig)
    .config(JSONEditorConfig)
    .run(xeditableConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('urls.url', {
        abstract: true,
        url: '/:name',
        template: '<ui-view/>'
      })
      .state('urls.url.home', {
        url: '',
        component: 'urlsUrlComponent',
        data: {
          pageTitle: 'URL Detail'
        }
      })
      .state('urls.url.run', {
        url: '/run',
        component: 'urlsRunUrlComponent',
        data: {
          pageTitle: 'URL Running'
        }
      });
  }

  /*
  xeditable configiuration
   */
  function xeditableConfig(editableOptions, editableThemes) {
    editableThemes.bs3.inputClass = 'input-sm';
    editableThemes.bs3.buttonsClass = 'btn-sm';
    editableOptions.theme = 'bs3';
  }

  // JSONEditorConfig.$inject = ['JSONEditorProvider'];
  function JSONEditorConfig(JSONEditorProvider) {
    JSONEditorProvider.configure({
      defaults: {
        options: {
          iconlib: 'bootstrap3',
          theme: 'bootstrap3',
          ajax: true,
          'disable_properties': true,
          'required_by_default': true
        }
      }
    });
  }

}());
