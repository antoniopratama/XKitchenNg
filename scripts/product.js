var productModule = angular
    .module('productModule', [])
    .controller('productController', function($scope, $http){
        $scope.title = "List of Products";
        $scope.base_url = "http://localhost:3000/api/products";

        $scope.createNew = true;

        $http.get($scope.base_url)
            .then(function(response){
                $scope.products = response.data;
            });

        $scope.category_url = "http://localhost:3000/api/categories";

        $http.get($scope.category_url)
            .then(function(response){
                $scope.categories = response.data;
            });

        $scope.add = function(){
            $http.post($scope.base_url, $scope.product)
                .then(function(data, status){
                    $http.get($scope.base_url)
                        .then(function(response){
                            $scope.products = response.data;
                            $scope.createNew = true;
                            $scope.product = null;
                        }) 
                })
                .catch(function(response){
                    $scope.status = response.data.error.message;
                })
        };
        $scope.edit = function(product){
            $http.get($scope.base_url + "/" + product._id)
            .then(function(response){
                $scope.product = response.data;
                $scope.createNew = false;
            })
            .catch(function(response){
                $scope.status = response.data.error.message;
            });
        }
        $scope.update = function(){
            let editData = [
                { 'propName': 'category', 'value': $scope.product.category },
                { 'propName': 'code', 'value': $scope.product.code },
                { 'propName': 'initial', 'value': $scope.product.initial },
                { 'propName': 'name', 'value': $scope.product.name },
                { 'propName': 'description', 'value': $scope.product.description },
                { 'propName': 'price', 'value': $scope.product.price },
            ];
            $http.patch($scope.base_url + "/" + $scope.product._id, editData)
                .then(function(data, status){
                    $http.get($scope.base_url)
                        .then(function(response){
                            $scope.products = response.data;
                            $scope.createNew = true;
                            $scope.product = null;
                        });
                })
                .catch(function(response){
                    $scope.status = response.data.error.message;
                });
        }
        $scope.delete = function(product){
            $http.delete($scope.base_url + "/" + product._id)
                .then(function(data, status){
                    $http.get($scope.base_url)
                        .then(function(response){
                            $scope.products = response.data;
                            $scope.createNew = true;
                            $scope.user = null;
                        });
                })
        }
    });