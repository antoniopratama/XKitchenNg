var myModule = angular.module('myModule', [])
    .controller('myController', function($scope){
        $scope.title = "Employee";
        var employee = {
            firstName : "Antonio",
            middleName : "Pratama",
            lastName : "Tadjuddin"
        };
        $scope.employee = employee;
    });