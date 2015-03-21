angular.module('thumbprint.controllers', [])

.controller("AppCtrl", ['$scope', '$ionicModal', '$http', '$rootScope', '$state', '$ionicLoading', function($scope, $ionicModal, $http, $rootScope, $state, $ionicLoading) {
  $scope.user = $rootScope.current_user;

  return $scope.logout = function() {
    $ionicLoading.show();
    return $http["delete"]("http://localhost:3000/sessions/" + $rootScope.current_user.id + ".json").success(function(data) {
      $ionicLoading.hide()
      return $state.go('main');
    });
  }
}])

.controller("UsersCtrl", [
  "$scope", "$http", '$state', '$rootScope', '$ionicLoading', 'User', function($scope, $http, $state, $rootScope, $ionicLoading, User) {
    $scope.newUser = {};
    return $scope.createUser = function() {
      $ionicLoading.show();
      return User.post($scope.newUser).success(function(data) {
        $rootScope.current_user = data;
        $ionicLoading.hide();
        return $state.go('app.welcome');
      }).error(function(data) {
        $scope.username = "";
        $scope.password = "";
        $ionicLoading.hide();
        if (data.password) {
          $scope.password = "Password " + data.password[0];
        } else if(data.username) {
          $scope.username = "Username " + data.username[0];
        }
      });
    };
  }
])

.controller("SessionsCtrl", [
  "$scope", "$http", "$rootScope", '$state', '$ionicLoading', function($scope, $http, $rootScope, $state, $ionicLoading) {
    return $scope.addSession = function(newUser) {
      $ionicLoading.show();
      return $http.post("http://localhost:3000/login.json", {
        user: newUser
      }).success(function(user) {
        $rootScope.current_user = user;
       $ionicLoading.hide();
        return $state.go('app.welcome');
      }).error(function(data) {
        $ionicLoading.hide();
        $scope.error = "Invalid username or password"
      });
    };
  }
])
