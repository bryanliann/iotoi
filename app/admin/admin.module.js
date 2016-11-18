(function() {

  angular
    .module('app.admin', [])
    .config(configFunction);

  function configFunction($routeProvider) {
    $routeProvider.
	  when('/admin', {
        templateUrl: 'app/admin/index-admin.html',
	    controller: 'AdminController'
    });
  }

})();
