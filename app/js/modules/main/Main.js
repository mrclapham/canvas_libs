var Main = new angular.module('Main', ['ngResource', 'ngRoute'])
Main.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/paper', {
                templateUrl: './js/modules/main/templates/paper.html',
                controller: 'PaperController'
            }).
            when('/p5', {
                templateUrl: './js/modules/main/templates/p5.html',
                controller: 'PaperController'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);

Main.controller('mainController', ['$scope', function($scope){
    $scope.data = "mainController data"

}])
