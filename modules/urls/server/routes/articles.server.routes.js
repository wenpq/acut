'use strict';

/**
 * Module dependencies
 */

module.exports = function (app) {
  // Articles collection routes
  app.route('/api/urls')
    .get(function() {
      console.log('get urls');
    });
};
