(function() {

  angular
	.module('app.auth', [])
    .config(configFunction);

  function configFunction($routeProvider) {
    $routeProvider.
	when('/', {
      templateUrl: 'app/auth/login.html',
      controller: 'AuthController'
    });
  }

})();
