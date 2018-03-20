var reservationModule = angular
    .module('reservationModule', [])
    .controller('reservationController', function($scope, $http){
        $scope.title = "List of Reservations";
        $scope.createNew = true;
        $scope.base_url = "http://localhost:3000/api/reservations";

        $http.get($scope.base_url)
            .then(function(response){
                $scope.reservations = response.data;
            });
        
        $scope.table_url = "http://localhost:3000/api/tables";

        $http.get($scope.table_url)
            .then(function(response){
                $scope.tables = response.data;
            });

        $scope.user_url = "http://localhost:3000/api/users";

        $http.get($scope.user_url)
            .then(function(response){
                $scope.users = response.data;
            });
        
        $scope.add = function(){
            $http.post($scope.base_url, $scope.reservation)
                .then(function(data, status){
                    $http.get($scope.base_url)
                        .then(function(response){
                            $scope.reservations = response.data;
                            $scope.createNew = true;
                            $scope.reservation= null;
                        })
                })
                .catch(function(response){
                    $scope.status = response.data.error.message;
                })
        };
        $scope.edit = function(reservation){
            $http.get($scope.base_url + "/" + reservation._id)
                .then(function(response){
                    $scope.reservation = response.data;
                    $scope.createNew = false;
                })
                .catch(function(response){
                    $scope.status = response.data.error.message;
                });
        }
        $scope.update = function(){
            let editData = [
                { 'propName': 'reff', 'value':$scope.reservation.reff },
                { 'propName': 'guest', 'value':$scope.reservation.guest },
                { 'propName': 'table', 'value':$scope.reservation.table },
                { 'propName': 'user', 'value':$scope.reservation.user },
                { 'propName': 'date', 'value':$scope.reservation.date }
            ];
            $http.patch($scope.base_url + "/" + $scope.reservation._id, editData)
                .then(function(data, status){
                    $http.get($scope.base_url)
                        .then(function(response){
                            $scope.reservations = response.data;
                            $scope.createNew = true;
                            $scope.reservation= null;
                        })
                })
                .catch(function(response){
                    $scope.status = response.data.error.message;
                });
        }
        $scope.delete = function(reservation){
            $http.delete($scope.base_url + "/" + reservation._id)
                .then(function(data, status){
                    $http.get($scope.base_url)
                        .then(function(response){
                            $scope.reservations = response.data;
                            $scope.createNew = true;
                            $scope.reservation = null;
                        });
                })
        }
    });