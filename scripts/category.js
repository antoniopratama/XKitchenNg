var categoryModule = angular
    .module('categoryModule', [])
    .controller('categoryController', function($scope, $http){
        $scope.title = "List of Categories";
        $scope.createNew = true;
        $scope.base_url = "http://localhost:3000/api/categories";

        $http.get($scope.base_url)
            .then(function(response){
                $scope.categories = response.data;
            })
        $scope.add = function(){
            $http.post($scope.base_url, $scope.category)
                .then(function(data, status){
                    $http.get($scope.base_url)
                        .then(function(response){
                            $scope.categories = response.data;
                            $scope.createNew = true;
                            $scope.category = null;
                        })
                })
        }
        $scope.edit = function(category){
            $http.get($scope.base_url + "/" + category._id)
                .then(function(response){
                    $scope.category = response.data;
                    $scope.createNew = false;
                })
        }
        $scope.update = function(){
            let editData = [
                { 'propName': 'code', 'value': $scope.category.code },
                { 'propName': 'initial', 'value': $scope.category.initial },
                { 'propName': 'name', 'value': $scope.category.name }
            ];
            $http.patch($scope.base_url + "/" + $scope.category._id, editData)
                .then(function(data, status){
                    $http.get($scope.base_url)
                        .then(function(response){
                            $scope.categories = response.data;
                            $scope.createNew = true;
                            $scope.category = null;
                        });
                });
        };
        $scope.delete = function(category){
            $http.delete($scope.base_url + "/" + category._id)
                .then(function(data, status){
                    $http.get($scope.base_url)
                        .then(function(response){
                            $scope.categories = response.data;
                            $scope.createNew = true;
                            $scope.category = null;
                        });
                });
        }
    });