var UserFactories;

UserFactories = angular.module("thumbprint.factories", []);

UserFactories.factory('User', [
  '$http', function($http) {
    return {
      post: function(newUser) {
        return $http.post("https://thumbprintapp.herokuapp.com/users.json", {
          user: newUser
        });
      }
    };
  }
]);
