(function() {

  angular
    .module('app.auth')
    .controller('AuthController', AuthController);

  function AuthController($scope, $location, $rootScope,$http) {

    if(localStorage.getItem("user")){
      var user = JSON.parse(localStorage.getItem("user"));
      if(user.role === "admin"){
        $location.path('/admin');
      }else if (user.role === "teacher"){
        $location.path('/teacher');
      }
    }

  	$scope.login = function () {
  	  //login web service before

      var id = $scope.id;
      var pass = $scope.pass;

      var config = {
        headers: {
            "Access-Control-Allow-Origin":"*"
        }

      };

      /*$http({
          url: 'https://is439-iotoi.rhcloud.com/api/user/account/login?username=' + id +'&password=' + pass,
          method: 'GET',
          header:{
            "Access-Control-Allow-Origin":"*"
          }
      })*/


      $http.get('https://is439-iotoi.rhcloud.com/api/user/account/login?username=' + id +'&password=' + pass,config).then(function successCallback(response) {
          console.log(response);
            var user ={
              role:response.data.usertype,
              name:response.data.name,
              id:id,
              school:response.data.school,
              class: response.data.class
            };
            console.log(response);
            localStorage.setItem('user', JSON.stringify(user));

            if(user.role === "admin"){
              $location.path('/admin');
            }else if (user.role === "teacher"){
              $location.path('/teacher');
            }else{
              $location.path('/login');
            }

          },
          function errorCallback(response) {
              $scope.errorMsg ="Invalid Username or Password";
          });
  	}


  	$scope.logout = function () {

  	  $location.path('/');
  	}


  };
})();
