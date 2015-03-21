angular.module('thumbprint.controllers', [])

.controller("AppCtrl", ['$scope', '$ionicModal', '$http', '$rootScope', '$state', '$ionicLoading', function($scope, $ionicModal, $http, $rootScope, $state, $ionicLoading) {
  // Logout logic
  $scope.logout = function() {
    $ionicLoading.show();
    return $http["delete"]("http://localhost:3000/sessions/" + $rootScope.current_user.id + ".json").success(function(data) {
      $ionicLoading.hide()
      return $state.go('main');
    });
  }

  // Login logic
  $scope.addSession = function(newUser) {
    $ionicLoading.show();
    return $http.post("http://localhost:3000/login.json", {
      user: newUser
    }).success(function(user) {
      $rootScope.current_user = user;
     $ionicLoading.hide();
      return $state.go('app.welcome');
    }).error(function(data) {
      $ionicLoading.hide();
      $scope.error = "Invalid email or password"
    });
  };

  // Assign User
  $scope.user = $rootScope.current_user;

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
        if (data.zip) {
        console.log(data.zip[0]);
      } else if (data.first) {
        console.log(data.first[0]);
      } else if (data.last) {
        console.log(data.last[0]);
      } else if (data.education) {
        console.log(data.education[0]);
      } else if (data.occupation) {
        console.log(data.occupation[0]);
      }
        $scope.email = "";
        $scope.password = "";
        $ionicLoading.hide();
        if (data.password) {
          $scope.password = "Password " + data.password[0];
        } else if(data.email) {
          $scope.email = "Email " + data.email[0];
        }
      });
    };
  }
])

// .controller("SessionsCtrl", [
//   "$scope", "$http", "$rootScope", '$state', '$ionicLoading', function($scope, $http, $rootScope, $state, $ionicLoading) {
    
//   }
// ])
