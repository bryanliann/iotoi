(function() {

  angular
    .module('app.teacher', [])
    .config(configFunction);

  function configFunction($routeProvider) {
    $routeProvider.
    when('/teacher', {
        templateUrl: 'app/teacher/index-teacher.html',
	       controller: 'TeacherController'
    }).
    when('/teacher/:cid/', {
          templateUrl: 'app/teacher/class.html',
  	       controller: 'TeacherController'
    }).
    when('/teacher/:cid/:sid', {
          templateUrl: 'app/teacher/student.html',
  	       controller: 'TeacherController'
    });
  }

})();
