(function() {

  angular
    .module('app.auth')
    .factory('authService', authService);
  function authService($location) {

    var service = {
      logout: logout
    };

    return service;

    //Different function of the auth service

    function logout() {
      localStorage.removeItem('user');
      $location.path('/');
    }

  }

})();
