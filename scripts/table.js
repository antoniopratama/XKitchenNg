var tableModule = angular
    .module('tableModule', [])
    .controller('tableController', function($scope, $http){
        $scope.title = "List of Table";
        $scope.createNew = true;
        $scope.base_url = "http://localhost:3000/api/tables";

        $http.get($scope.base_url)
            .then(function(response){
                $scope.tables = response.data;
            })
        $scope.add = function(){
            $http.post($scope.base_url, $scope.table)
                .then(function(data, status){
                    $http.get($scope.base_url)
                        .then(function(response){
                            $scope.tables = response.data;
                            $scope.createNew = true;
                            $scope.table = null;
                        })
                })
        }
        $scope.edit = function(table){
            $http.get($scope.base_url + "/" + table._id)
                .then(function(response){
                    $scope.table = response.data;
                    $scope.createNew = false;
                })
        }
        $scope.update = function(){
            let editData = [
                { 'propName': 'code', 'value': $scope.table.code },
                { 'propName': 'seat', 'value': $scope.table.seat },
                { 'propName': 'description', 'value': $scope.table.description },                
            ];
            $http.patch($scope.base_url + "/" + $scope.table._id, editData)
                .then(function(data, status){
                    $http.get($scope.base_url)
                        .then(function(response){
                            $scope.tables = response.data;
                            $scope.createNew = true;
                            $scope.table = null;
                        });
                });
        };
        $scope.delete = function(table){
            $http.delete($scope.base_url + "/" + table._id)
                .then(function(data, status){
                    $http.get($scope.base_url)
                        .then(function(response){
                            $scope.tables = response.data;
                            $scope.createNew = true;
                            $scope.table = null;
                        });
                });
        }
    });