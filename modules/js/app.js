var node = angular.module('node', []);

node.controller('bodyController', ['$scope', '$http', function($scope, $http) {
    $http.get('/api/user')
        .then(function(serverResponse) {
            $scope.tableData = serverResponse.data;
        }, function(err) {
            console.log(err);
        });
}]);

node.controller('newUserController', ['$scope', '$http', function($scope, $http) {
    $scope.user = {};
    $scope.postNewUser = function($event) {
        $event.preventDefault();
        console.log($scope.user);
        $http.post('/api/user/new', $scope.user)
            .then(function(serverResponse) {
                console.log(serverResponse);
            }, function(serverError) {
                console.error(serverError);
            });
    };
}]);