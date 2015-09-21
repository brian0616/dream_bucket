'use strict';

angular.module('mean').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
    function($scope, $http, $location, Authentication) {
        // console.log(Authentication);
          $scope.$on('$routeChangeSuccess', function($event, current) {
            console.log(current);
            $scope.css = current.css;
          });

        $scope.authentication = Authentication;
        //If user is signed in then redirect back home
        if ($scope.authentication.user) {
            console.log($scope.authentication.user);
            $location.path('/dashboard');
            
        } 
        $scope.signup = function() {
            $http.post('/auth/signup', $scope.credentials).success(function(response) {
                //If successful we assign the response to the global user model
                $scope.authentication.user = response;

                //And redirect to the index page
                $location.path('/');
            }).error(function(response) {
                $scope.error = response.message;
            });
        };

        $scope.signin = function() {
            $http.post('/auth/signin', $scope.credentials).success(function(response) {
                //If successful we assign the response to the global user model
                $scope.authentication.user = response;
                console.log(response)

                //And redirect to the index page
                $location.path('/');
            }).error(function(response) {
                $scope.error = response.message;
            });
        };
    }
]);