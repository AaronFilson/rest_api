const angular = require('angular');

const activityApp = angular.module('activityApp', []);

activityApp.controller('activityController', ['$scope', '$http', ($scope, $http) => {
  $scope.activity = [];

  $http.get('http://localhost:3050/api/activity')
    .then((res) => {
      console.log('success!');
      $scope.activity = res.data;
    }, (err) => {
      console.log(err);
    });

  $scope.createActivity = function(act) {
    $http.post('http://localhost:3050/api/activity', act)
      .then((res) => {
        $scope.activity.push(res.data);
        $scope.newAct = null;
      }, (err) => {
        console.log(err);
      });
  };

  $scope.deleteActivity = function(act) {
    $http.delete('http://localhost:3050/api/activity/' + act._id)
      .then((res) => {
        $scope.activity = $scope.activity.filter((i) => i !== act);
      }, (err) => {
        console.log(err)
      });
  };

  $scope.updateActivity = function(act) {
    $http.put('http://localhost:3050/api/activity/' + act._id, act)
      .then((res) => {
        $scope.activity[$scope.activity.indexOf(act)] = act;
        act.editting = false;
      }, (err) => {
        console.log(err);
        act.editting = false;
      });
  };
}]);
