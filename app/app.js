(function() {

  angular
    .module('app', [
      // Angular modules.
      'ngRoute',

      // Custom modules.,
      'app.teacher',
      'app.admin',
      'app.auth'

    ])
    .config(configFunction);

  function configFunction($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider.otherwise({
      redirectTo: '/'
    });
  }


})();
