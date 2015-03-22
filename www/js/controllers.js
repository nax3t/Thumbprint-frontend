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
      { "desc": "Amends the Brady Handgun Violence Prevention Act to prohibit the sale or other disposition of a firearm or ammunition to any person knowing or having reasonable cause to believe that such person: (1) has been convicted of a crime of violence in the previous 10 years...",
      "title": "Keeping Guns from High Risk Individuals Act",
      "type": "house" },
      { "desc": "Amends title XI of the Social Security Act (SSAct) to direct the Secretary of Health and Human Services, as part of the pediatric quality measures program and the Medicaid Quality Measurement Program (MQMP), to: (1) review certain quality measures endorsed under the Medicare program...",
      "title": "Quality Care for Moms and Babies Act",
      "type": "senate" },
      { "desc": "Amends federal copyright law to revise the definition of \"widow\" or \"widower\" for purposes of provisions concerning the transfer of a copyright to an author's spouse or other next of kin following the author's death. Declares that an individual is the widow or widower of an author if the courts of the state...",
      "title": "Copyright and Marriage Equality Act",
      "type": "executive" }
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
