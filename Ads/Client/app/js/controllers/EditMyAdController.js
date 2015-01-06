'use strict';

adsApp.controller('EditMyAdController', ['$scope', '$http', '$location', '$rootScope',
    function($scope, $http, $location, $rootScope){
        $scope.adData = {};
        $scope.pageTitle = 'Edit Ad';

        $scope.getAdToBeEditted = function(){
            var request = {
                method: 'GET',
                url: 'http://softuni-ads.azurewebsites.net/api/user/ads/' + $rootScope.editAdId,
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.accessToken
                },
                data: {}
            };

            $http(request)
                .success(function(data){
                    $scope.ad = data;
                })
                .error(function(data){
                    console.log(data);
                })
        };

        $scope.getAdToBeEditted();

        $http.get('http://softuni-ads.azurewebsites.net/api/categories')
            .success(function(data){
                $scope.categories = data;
            })
            .error(function(){
                error('Error occurred when get categories');
            }
        );

        $http.get('http://softuni-ads.azurewebsites.net/api/towns')
            .success(function(data){
                $scope.towns = data;
            })
            .error(function(){
                error('Error occurred when get towns');
            }
        );

        $scope.fileSelected = function(fileInputField) {
            delete $scope.adData.imageDataUrl;
            var file = fileInputField.files[0];
            if (file.type.match(/image\/.*/)) {
                var reader = new FileReader();
                reader.onload = function() {
                    $scope.adData.imageDataUrl = reader.result;
                    $(".preview-image").html("<img src='" + reader.result + "'>");
                };
                reader.readAsDataURL(file);
            } else {
                $(".preview-image").html("<p>File type not supported!</p>");
            }
        };

        $scope.editAd = function(){
            if($scope.adData.imageDataUrl){
                var image = $scope.adData.imageDataUrl;
                var changeImage = true;
            }
            else {
                var changeImage = false;
            }

            var request = {
                method: 'PUT',
                url: 'http://softuni-ads.azurewebsites.net/api/user/ads/' + $rootScope.editAdId,
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.accessToken
                },
                data: {
                    'title' : $scope.editTitle,
                    'text': $scope.editText,
                    'changeImage': changeImage,
                    'ImageDataURL': image,
                    'categoryId': $scope.editCategory,
                    'townId': $scope.editTown
                }
            };

            $http(request)
                .success(function(data){
                    success('Successfully edited ad');
                    console.log(data);
                })
                .error(function(data){
                    error('Error edit ad')
                    console.log(data);
                }
            );
        };

    }
]);