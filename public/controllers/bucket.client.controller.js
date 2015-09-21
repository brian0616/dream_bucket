'use strict';

angular.module('mean').controller('BucketController', function ($scope, $location, factory) {

	$scope.user_friends = [];
  $scope.buckets = [];
  $scope.donebuckets = [];
  $scope.tagged = [];
  $scope.message = [];

    var userFB = $scope.authentication.user.providerID;

    factory.getBucket(userFB, function (data){
      $scope.buckets = data;

      console.log($scope.buckets);
    })

    $scope.addBucket = function(bucket) {
        $scope.bucket._user = userFB;
        factory.addBucket($scope.bucket, function(bucket){
            factory.getBucket(userFB, function (data){
              $scope.buckets = data;
              $scope.bucket = {};
          })
        });
    }

    $scope.doneBucket = function(event) {
      // console.log(event);
      factory.doneBucket(event, function (event){
        console.log(event);
        $scope.event = {};

        factory.getBucket(userFB, function (data){
        $scope.buckets = data;
        console.log($scope.buckets);
        })
      })
    }

});