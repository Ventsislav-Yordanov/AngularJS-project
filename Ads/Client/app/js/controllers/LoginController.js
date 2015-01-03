'use strict';

adsApp.controller('LoginController',['$scope', '$http', '$location', function($scope, $http, $location){
    $scope.pageTitle = "Login";
    $scope.loginUser = function(){
        $http.post('http://softuni-ads.azurewebsites.net/api/user/login', {
            username: $scope.loginUsername,
            password: $scope.loginPassword
        })
            .success(function(data){
                console.log(data);
                success('Success login');
                sessionStorage.accessToken = data.access_token;
                sessionStorage.username = data.username;
                $location.path('/');
            })
            .error(function(data){
                console.log(data);
                error('Login Error');
            })
    }
}]);