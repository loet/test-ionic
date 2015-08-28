angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        // Form data for the login modal
        $scope.loginData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function () {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function () {
            $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function () {
            console.log('Doing login', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function () {
                $scope.closeLogin();
            }, 1000);
        };
    })

    .controller('PersonsCtrl', function ($scope, persons, $location) {
        $scope.persons = persons.data;

        $scope.editperson = function (person) {
            $location.url('/app/personupdate/' + person._id);
        };
    })

    .controller('PersonCtrl', function ($scope, $http, $location, person) {
        $scope.message = undefined;
        $scope.person = person;

        $scope.save = function () {
            if (person._id) {
                $http.put('http://localhost:8080/api/persons/' + person._id, $scope.person).then(
                    function (result) {
                        $location.url('/app/persons');
                    }, function (error) {
                        $scope.message = JSON.stringify(error.data.message);
                    }
                );
            } else {
                $http.post('http://localhost:8080/api/persons', $scope.person).then(
                    function (result) {
                        $location.url('/app/persons');
                    }, function (error) {
                        $scope.message = JSON.stringify(error.data.message);
                    }
                );
            }
        };

        $scope.delete = function () {
            $http.delete('http://localhost:8080/api/persons/' + person._id).then(
                function (result) {
                    $location.url('/app/persons');
                }, function (error) {
                    $scope.message = JSON.stringify(error.data.message);
                }
            );
        }
    })

;
