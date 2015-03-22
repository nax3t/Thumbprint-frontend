angular.module('thumbprint.controllers', [])

.controller("AppCtrl", ['$scope', '$ionicModal', '$http', '$rootScope', '$state', '$ionicLoading', function($scope, $ionicModal, $http, $rootScope, $state, $ionicLoading) {
  // Logo
  $scope.logo = "img/logo-tp.png";

  // Logout logic
  $scope.logout = function() {
    $ionicLoading.show();
    return $http["delete"]("https://thumbprintapp.herokuapp.com/sessions/" + $rootScope.current_user.id + ".json").success(function(data) {
      $ionicLoading.hide()
      return $state.go('main');
    });
  }

  // Login logic
  $scope.addSession = function(newUser) {
    $ionicLoading.show();
    return $http.post("https://thumbprintapp.herokuapp.com/login.json", {
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

  // Seed Bills
  $scope.bills = [
      { "desc": "Executive, This bill repeals the Patient Protection and Affordable Care Act, effective as of its enactment. Provisions of law amended by that Act are restored. This bill repeals the health care provisions of the Health Care and Education and Reconciliation Act of 2010, effective as of...",
      "title": "H.R.596 — 114th Congress (2015-2016)",
      "type": "executive" },
      { "desc": "Senate, This bill repeals the Patient Protection and Affordable Care Act, effective as of its enactment. Provisions of law amended by that Act are restored. This bill repeals the health care provisions of the Health Care and Education and Reconciliation Act of 2010, effective as of...",
      "title": "H.R.596 — 114th Congress (2015-2016)",
      "type": "senate" },
      { "desc": "House, This bill repeals the Patient Protection and Affordable Care Act, effective as of its enactment. Provisions of law amended by that Act are restored. This bill repeals the health care provisions of the Health Care and Education and Reconciliation Act of 2010, effective as of...",
      "title": "H.R.596 — 114th Congress (2015-2016)",
      "type": "house" }
  ]
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
        console.log("Zip code: " + data.zip[0]);
      } else if (data.first) {
        console.log("First name: " + data.first[0]);
      } else if (data.last) {
        console.log("Last name: " + data.last[0]);
      } else if (data.education) {
        console.log("Education: " + data.education[0]);
      } else if (data.occupation) {
        console.log("Occupation: " + data.occupation[0]);
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
