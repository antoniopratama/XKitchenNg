var handlingModule = angular.module('handlingModule', [])
    .controller('handlingController', function($scope){
        $scope.title = "Technologies";
        var technologies = [
            { name : "HTML", likes : 0, dislikes : 0 },
            { name : "ECMA Script 6", likes : 0, dislikes : 0 },
            { name : "CSS", likes : 0, dislikes : 0 },
            { name : "NodeJS", likes : 0, dislikes : 0 },
            { name : "Angular JS", likes : 0, dislikes : 0 }
        ]
        $scope.technologies = technologies;
        $scope.incrementLikes = function(technology){
            technology.likes++;
        }
        $scope.incrementDislikes = function(technology){
            technology.dislikes++;
        }
    })