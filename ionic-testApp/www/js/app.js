// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .config(function ($ionicConfigProvider) {
        $ionicConfigProvider.views.maxCache(0);

    })

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/menu.html',
                controller: 'AppCtrl'
            })

            .state('app.news', {
                url: '/news',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/news.html'
                    }
                }
            })

            .state('app.persons', {
                resolve: {
                    persons: function ($http) {
                        return $http.get('http://localhost:8080/api/persons');
                    }
                },
                url: '/persons',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/persons.html',
                        controller: 'PersonsCtrl'
                    }
                }
            })

            .state('app.person', {
                resolve: {
                    person: function () {
                        return {};
                    }
                },
                url: '/person',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/person.html',
                        controller: 'PersonCtrl'
                    }
                }
            })

            .state('app.personupdate', {
                resolve: {
                    person: function ($http, $stateParams) {
                        // $http returns a promise for the url data
                        return $http.get('http://localhost:8080/api/persons/' + $stateParams.id).then(function (result) {
                            return result.data;
                        });
                    }
                },
                url: '/personupdate/:id',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/person.html',
                        controller: 'PersonCtrl'
                    }
                }
            })

        //.state('app.search', {
        //    url: '/search',
        //    views: {
        //        'menuContent': {
        //            templateUrl: 'templates/search.html'
        //        }
        //    }
        //})
        //
        //.state('app.browse', {
        //    url: '/browse',
        //    views: {
        //        'menuContent': {
        //            templateUrl: 'templates/browse.html'
        //        }
        //    }
        //})
        //.state('app.playlists', {
        //    url: '/playlists',
        //    views: {
        //        'menuContent': {
        //            templateUrl: 'templates/playlists.html',
        //            controller: 'PlaylistsCtrl'
        //        }
        //    }
        //})
        //
        //.state('app.single', {
        //    url: '/playlists/:playlistId',
        //    views: {
        //        'menuContent': {
        //            templateUrl: 'templates/playlist.html',
        //            controller: 'PlaylistCtrl'
        //        }
        //    }
        //});
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/news');
    });
