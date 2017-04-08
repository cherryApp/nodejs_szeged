var mongo = angular.module('mongo', []);

mongo.controller('userController', ['$scope', '$http', function($scope, $http) {
    $scope.cols = ['name', 'email', 'age', 'address', 'job'];
    $scope.newUser = {};

    $scope.getTableData = function() {
        $http.get('/users/api')
            .then(function(resp) {
                $scope.tableData = resp.data;
            }, function(err) {
                console.error(err);
            });
    }

    $scope.updateRow = function(row) {
        $http.post('/users/api/' + row._id, row)
            .then(function(resp) {
                console.log('Update done: ', resp);
            }, function(err) {
                console.error(err);
            })
    };

    $scope.deleteRow = function(row) {
        $http.delete('/users/api/' + row._id)
            .then(function(resp) {
                console.log('Delete done: ', resp);
                $scope.getTableData();
            }, function(err) {
                console.error(err);
            })
    };

    $scope.addUser = function(user) {

        $http.put('/users/api', user)
            .then(function(resp) {
                $scope.newUser = {};
                console.log('User created: ', resp);
                $scope.getTableData();
            }, function(err) {
                console.error(err);
            });
    };

    $scope.getTableData();

}]);