var app = angular.module('app', ['ngRoute', 'ui.tinymce', 'ngSanitize']);
var apiUrl = "http://" + location.host + "/PCDERSLERIMAPI";
//var apiUrl = "http://localhost:8080/PCDERSLERIMAPI";
app.config(function($routeProvider) {

    $routeProvider
            .when("/", {templateUrl: "home.html"})
            .when("/videos#begin=:begin&end=:end", {templateUrl: "video.html", controller: 'VideoCtrl'})

            .when("/category", {templateUrl: "category.html", controller: 'CategoryCtrl'})

            .when("/custom#begin=:begin&end=:end&categoryId1=:categoryId1", {templateUrl: "customCategory.html", controller: 'CustomCategoryCtrl'})

            .when("/custom#begin=:begin&end=:end", {templateUrl: "customCategory.html", controller: 'CustomCategoryCtrl'})

            .when("/allLinks#begin=:begin&end=:end&working=:working", {templateUrl: "allLinks.html", controller: 'LinksCtrl'})
            .when("/allLinks#begin=:begin&end=:end", {templateUrl: "allLinks.html", controller: 'LinksCtrl'})

            .when("/seo#begin=:begin&end=:end", {templateUrl: "seo.html", controller: 'VideoCtrl'})

            .when("/users#begin=:begin&end=:end", {templateUrl: "user.html", controller: 'UserCtrl'})
            .when("/users/register", {templateUrl: "register.html", controller: 'RegisterCtrl'})
            .when("/login", {templateUrl: "loginUser.html", controller: 'LoginCtrl'})
            .otherwise({redirectTo: "/"});
});


        
      

app.controller('MainCtrl', ['$scope', '$location', '$window', '$route', '$routeParams',
    function($scope, $location, $window, $route, $routeParams) {
        $scope.$route = $route;
        $scope.$location = $location;

        $scope.setRoute = function(route) {
            $location.path(route);
        };

        $window.sessionStorage.token = localStorage.getItem('token');
        if (!$window.sessionStorage.token) {
            $window.location.href = "index.html";
        }

    }]);

app.factory('authInterceptor', function($rootScope, $q, $window) {
    return {
        request: function(config) {
            config.headers = config.headers || {};
            console.log('localStorage.getItem("token")=' + localStorage.getItem("token"));
            if ($window.sessionStorage.token) {
                config.headers.token = localStorage.getItem("token");
            }
            return config;
        },
        response: function(response) {
            if (response.status === 401) {
                $window.sessionStorage.token = "";
                // handle the case where the user is not authenticated
            }
            return response || $q.when(response);
        }
    };
});


app.config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
});

app.filter('nl2br', ['$sanitize', function($sanitize) {
        var tag = (/xhtml/i).test(document.doctype) ? '<br />' : '<br>';
        return function(msg) {
            // ngSanitize's linky filter changes \r and \n to &#10; and &#13; respectively
            msg = (msg + '').replace(/(\r\n|\n\r|\r|\n|&#10;&#13;|&#13;&#10;|&#10;|&#13;)/g, tag + '$1');
            return $sanitize(msg);
        };
    }]);


app.filter('nl2brLimited', ['$sanitize', function($sanitize) {
        var tag = (/xhtml/i).test(document.doctype) ? '<br />' : '<br>';
        return function(msg) {
            // ngSanitize's linky filter changes \r and \n to &#10; and &#13; respectively
            msg = (msg + '').replace(/(\r\n|\n\r|\r|\n|&#10;&#13;|&#13;&#10;|&#10;|&#13;)/g, tag + '$1');
            return $sanitize(msg.substring(0, msg.length > 255 ? 255 : msg.length) + "...");
        };
    }]);


