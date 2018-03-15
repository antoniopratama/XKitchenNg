var userModule = angular
    .module('userModule', [])
    .controller('userController', function($scope, $http){
        $scope.title = "List of Users";
        $scope.createNew = true;
        $scope.base_url = "http://localhost:3000/api/users";

        $http.get($scope.base_url)
            .then(function(response){
                $scope.users = response.data;
            })
        $scope.add = function(){
            $http.post($scope.base_url, $scope.user)
                .then(function(data, status){
                    $http.get($scope.base_url)
                        .then(function(response){
                            $scope.users = response.data;
                            $scope.createNew = true;
                            $scope.user = null;
                        })
                })
        }
        $scope.edit = function(user){
            $http.get($scope.base_url + "/" + user._id)
                .then(function(response){
                    $scope.user = response.data;
                    $scope.createNew = false;
                })
        }
        $scope.update = function(){
            let editData = [
                { 'propName': 'badgeId', 'value': $scope.user.badgeId },
                { 'propName': 'nick', 'value': $scope.user.nick },
                { 'propName': 'fullName', 'value': $scope.user.fullName },                
            ];
            $http.patch($scope.base_url + "/" + $scope.user._id, editData)
                .then(function(data, status){
                    $http.get($scope.base_url)
                        .then(function(response){
                            $scope.users = response.data;
                            $scope.createNew = true;
                            $scope.user = null;
                        });
                });
        };
        $scope.delete = function(user){
            $http.delete($scope.base_url + "/" + user._id)
                .then(function(data, status){
                    $http.get($scope.base_url)
                        .then(function(response){
                            $scope.users = response.data;
                            $scope.createNew = true;
                            $scope.user = null;
                        });
                });
        }
    });