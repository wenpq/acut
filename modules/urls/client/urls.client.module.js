(function (app) {
  'use strict';

  app.registerModule('url', ['core']);
  app.registerModule('urls.main', ['datatables', 'ui.router', 'core.routes']);
  app.registerModule('urls.url', ['datatables', 'ui.router', 'core.routes', 'xeditable', 'angular-json-editor']);

}(ApplicationConfiguration));
