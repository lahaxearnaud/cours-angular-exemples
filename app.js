/**
 * Created by arnaud on 25/02/15.
 */
var app = angular.module('contactApp', ['ngRoute']);

app.controller('homeController', function($scope, ContactRepository) {
    $scope.contacts = ContactRepository.list();
});

app.controller('ContactAddController', function($scope, ContactRepository) {
    $scope.formData = {};
    $scope.displayForm = true;
    $scope.create = function() {
        ContactRepository.create($scope.formData);
        $scope.displayForm = false;
    }
});

app.controller('ContactEditController', function($scope, ContactRepository, $routeParams) {
    $scope.contact = ContactRepository.find($routeParams.id);
    $scope.displayForm = true;
    $scope.update = function() {
        ContactRepository.update($routeParams.id, $scope.contact);
        $scope.displayForm = false;
    }
});

app.controller('ContactDeleteController', function($scope, ContactRepository, $routeParams) {
    $scope.contact = ContactRepository.find($routeParams.id);
    $scope.displayForm = true;
    $scope.delete = function() {
        ContactRepository.delete($routeParams.id);
        $scope.displayForm = false;
    }
});


app.config(function ($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'views/home.html',
        controller: 'homeController'
    })
    .when('/add', {
        templateUrl: 'views/add.html',
        controller: 'ContactAddController'
    })
    .when('/edit/:id', {
        templateUrl: 'views/edit.html',
        controller: 'ContactEditController'
    })
    .when('/delete/:id', {
        templateUrl: 'views/delete.html',
        controller: 'ContactDeleteController'
    })
    .otherwise({
        redirectTo: '/home'
    });
});

app.directive('email', function() {
    return {
        restrict: 'E',
        template: '<a href="mailto:{{ contact.email }}" ><img src="http://goo.gl/AlXUGZ" alt="contact"/>  {{ contact.email }}</a> '
    };
});

app.provider('ContactRepository', function() {
    var contacts = [
        {
            "picture": "http://lorempixel.com/90/90/",
            "age": 65,
            "firstname": "ethel",
            "name": "logan",
            "email": "ethellogan@tsunamia.com",
            "phone": "+1 (857) 470-3091"
        },
        {
            "picture": "http://lorempixel.com/90/90/",
            "age": 38,
            "firstname": "carol",
            "name": "vasquez",
            "email": "carolvasquez@lexicondo.com",
            "phone": "+1 (853) 507-3026"
        },
        {
            "picture": "http://lorempixel.com/90/90/",
            "age": 43,
            "firstname": "chan",
            "name": "bowman",
            "email": "chanbowman@vicon.com",
            "phone": "+1 (994) 412-2204"
        }
    ];

    this.$get = function() {
        return {
            list: function () {

                return contacts;
            },

            find: function (id) {

                return contacts[id];
            },

            create: function (data) {

                contacts.push(data);

                return contacts.length - 1;
            },

            update: function (id, data) {
                contacts[id] = data;
            },

            delete: function (id) {
                contacts.splice(id, 1);
            }
        };
    }
});