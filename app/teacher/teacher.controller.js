(function() {

  angular
    .module('app.teacher')
    .controller('TeacherController',TeacherController);

  function TeacherController($rootScope,$location,$scope,authService,$routeParams,$http) {
    if(localStorage.getItem("user")){
      var user = JSON.parse(localStorage.getItem("user"));
      user.class = "1A";
      $scope.user = user;
      console.log(user);
    }else{
      $location.path('/');
    }

    if(user.role == "teacher"){
      var classId = $routeParams.cid;
      var studentId = $routeParams.sid;

      if(classId && studentId){
        $http({
            url: 'http://is439-iotoi.rhcloud.com/api/user/account/getStudentStats?username=' + studentId,
            method: 'POST'
        }).then(function successCallback(response) {
          var data =response.data.result;
          data.amtDrank = (data.amtDrank / 1000).toFixed(2);
          console.log(data);
          $scope.student =data;
        });
        $http({
            url: 'http://is439-iotoi.rhcloud.com/api/user/account/getStudentHistory?username=' + studentId,
            method: 'POST'
        }).then(function successCallback(response) {

          var data = response.data.result;
          for(var i = 0; i< data.length;i++){
            var record = data[i];
            record.a = (record.a / 1000).toFixed(2);
            record.b = (record.b / 1000).toFixed(2);
          }


          Morris.Bar({
            element: 'morris-area-example1',
            data: data,
            xkey: 'y',
            ykeys: ['a', 'b'],
            labels: ['Recommended', 'Actual'],
            barColors: ['#33414E', '#1caf9a'],
            gridTextSize: '10px',
            hideHover: true,
            resize: true,
            gridLineColor: '#E5E5E5'
          });
        });
      }else if (classId){
        $http({
            url: 'http://is439-iotoi.rhcloud.com/api/school/getClassStats?classID=' + user.class +'&school=' + user.school,
            method: 'POST'
        }).then(function successCallback(response) {
          $scope.class = response.data.result;
        });
      }else{
        $http({
            url: 'http://is439-iotoi.rhcloud.com/api/school/getClassStats?classID=' + user.class +'&school=' + user.school,
            method: 'POST'
        }).then(function successCallback(response) {
          console.log(response);
          var data = response.data.result;
          var hydrateCount = 0;
          for(var i = 0; i <data.length;i++){
            var student = data[i];
            if(student.status === "Hydrated"){
              hydrateCount++;
            }
          }
          $scope.studentsHydratedInClass = hydrateCount/data.length * 100;
        });
        $http({
            url: 'http://is439-iotoi.rhcloud.com/api/school/getClassHourlyVisits?classId=' + user.class +'&school=' + user.school,
            method: 'POST'
        }).then(function successCallback(response) {
          console.log(response);
          Morris.Bar({
              element: 'morris-bar-example1',
              data: [
                  { y: '0800 hrs', a: 75},
                  { y: '0900 hrs', a: 64},
                  { y: '1000 hrs', a: 78},
                  { y: '1100 hrs', a: 82},
                  { y: '1200 hrs', a: 86},
                  { y: '1300 hrs', a: 94},
                  { y: '1400 hrs', a: 96}
              ],
              xkey: 'y',
              ykeys: ['a'],
              labels: ['No. of Student Visited'],
              barColors: ['#1caf9a',],
              gridTextSize: '10px',
              hideHover: true,
              resize: true,
              gridLineColor: '#E5E5E5'
          });
        });

      }
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
