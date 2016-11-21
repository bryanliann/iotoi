(function() {

  angular
    .module('app.admin')
    .controller('AdminController', AdminController);

  function AdminController($rootScope,$location,$scope,authService,$routeParams,$http) {
    if(localStorage.getItem("user")){
      var user = JSON.parse(localStorage.getItem("user"));
      user.class = "1A";
      $scope.user = user;
    }else{
      $location.path('/');
    }

    if(user.role == "admin"){
      var date = new Date();
      var milli = date.getTime();
      $http({
          url: 'https://is439-iotoi.rhcloud.com/api/school/getPastWeekHydrationLevel?date=' + milli +'&school=' +user.school,
          method: 'POST'
      }).then(function successCallback(response) {
        /* Moris Area Chart */
          Morris.Area({
          element: 'morris-area-example1',
          data: response.data.result,
          xkey: 'y',
          ykeys: ['a','b'],
          labels: ['Hydrated','Insufficiently Hydrated'],
          resize: true,
          hideHover: true,
          xLabels: 'day',
          gridTextSize: '10px',
          lineColors: ['#1caf9a','#33414E'],
          gridLineColor: '#E5E5E5'
        });
        /* End Moris Area Chart */

      });

      $http({
          url: 'https://is439-iotoi.rhcloud.com/api/school/getTotalUserCount?school='+user.school,
          method: 'POST'
      }).then(function successCallback(response) {
        $scope.totalStudentsRegistered = response.data.totalnumberOfUser;
      });



      $http({
          url: 'https://is439-iotoi.rhcloud.com/api/school/getHydratedPercentageByDate?school=' + user.school +'&date=' + milli,
          method: 'POST'
      }).then(function successCallback(response) {
        $scope.totalStudentsHydrated = response.data.percentageOfHydratedStudents;
      });

      $http({
          url: 'https://is439-iotoi.rhcloud.com/api/school/getCoolerStats?school='+user.school,
          method: 'POST'
      }).then(function successCallback(response) {
        console.log(response);

        var data = response.data.result;

        for(obj in data){
          obj.a = (obj.a / 1000).toFixed(2);
          obj.b = (obj.b / 1000).toFixed(2);
        }

        Morris.Bar({
            element: 'morris-bar-example1',
            data: data,
            xkey: 'y',
            ykeys: ['a', 'b'],
            labels: ['Today', 'Average'],
            barColors: ['#33414E', '#1caf9a'],
            gridTextSize: '10px',
            hideHover: true,
            resize: true,
            gridLineColor: '#E5E5E5'
        });
        /* END Bar dashboard chart */
      });



    }else{
      $location.path('/');
    }

    $scope.logout = function(){
      authService.logout();
    }

    $scope.students= function(){
      $location = $location.path('/teacher/' + user.class);
    }
    $scope.viewStudent= function(sid){
      $location = $location.path('/teacher/' + user.class + "/" + sid);
    }
  }

})();
