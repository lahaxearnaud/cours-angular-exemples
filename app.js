/**
 * Created by arnaud on 25/02/15.
 */
var app = angular.module('contactApp', ['ngRoute', 'firebase']);

app.controller('homeController', function ($scope, ContactRepository) {
    $scope.contacts = ContactRepository.list();
});

app.controller('ContactAddController', function ($scope, ContactRepository) {
    $scope.formData = {};
    $scope.displayForm = true;
    $scope.create = function () {
        ContactRepository.create($scope.formData);
        $scope.displayForm = false;
    }
});

app.controller('ContactEditController', function ($scope, ContactRepository, $routeParams) {
    $scope.contact = ContactRepository.find($routeParams.id);
    $scope.displayForm = true;
    $scope.update = function () {
        ContactRepository.update($scope.contact);
        $scope.displayForm = false;
    }
});

app.controller('ContactDeleteController', function ($scope, ContactRepository, $routeParams) {
    $scope.contact = ContactRepository.find($routeParams.id);
    $scope.displayForm = true;
    $scope.delete = function () {
        ContactRepository.delete($scope.contact);
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

app.directive('email', function () {
    return {
        restrict: 'E',
        template: '<a href="mailto:{{ contact.email }}" ><img src="http://goo.gl/AlXUGZ" alt="contact"/>  {{ contact.email }}</a> '
    };
});

app.constant('FirebaseUrl', 'https://radiant-heat-4732.firebaseio.com/');

app.service('ContactRepository', function (FirebaseUrl, $firebase) {

    var ref = new Firebase(FirebaseUrl + '/users');

    this.list = function () {
        var sync = $firebase(ref);

        return sync.$asArray();
    };

    this.find = function (id) {
        var refFind = ref.child(id);

        var sync = $firebase(refFind);

        return sync.$asObject();
    };

    this.create = function (data) {
        var sync = $firebase(ref);

        sync.$push(data).then(function (newChildRef) {
            console.log("added record with id " + newChildRef.key());
        });
    };

    this.update = function (element) {
        element.$save();
    };

    this.delete = function (element) {

        element.$remove();
    };
});
