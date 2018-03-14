var categoryModule = angular
    .module('categoryModule', [])
    .controller('categoryController', function($scope, $http){
        $scope.title = "List of Categories";

        $scope.categories = [
            { code: "Code 1", name: "Main Course 1" },
            { code: "Code 2", name: "Main Course 2" },
            { code: "Code 3", name: "Main Course 3" },
            { code: "Code 4", name: "Main Course 4" },
            { code: "Code 5", name: "Main Course 5" }  
        ];
    });