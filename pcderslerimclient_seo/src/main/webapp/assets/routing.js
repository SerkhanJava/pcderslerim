var apiUrl = 'http://' + location.host + '/PCDERSLERIMAPI';

var app = angular.module('app', ['ngRoute', 'ngSanitize', 'angulike', 'ngCookies']);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

        $routeProvider
                .when("/",
                        {templateUrl: "videos.html", controller: 'VideoCtrl'})

                .when("/video=:videoId",
                        {templateUrl: "view/myvideo.html", controller: 'SelectedVideoCtrl'})

                .when("/videos#begin=:begin&end=:end&search=:search",
                        {templateUrl: "videos.html", controller: 'VideoCtrl'})

                .when("/videos#begin=:begin&end=:end&categoryId=:categoryId",
                        {templateUrl: "videos.html", controller: 'VideoCtrl'})


                .when("/videos#begin=:begin&end=:end",
                        {templateUrl: "videos.html", controller: 'VideoCtrl'})

                .when("/login#token=:token",
                        {templateUrl: "user/loginWrapper.html", controller: 'UserCtrl'})
                .when("/login",
                        {templateUrl: "user/loginWrapper.html", controller: 'UserCtrl'})

                .otherwise({redirectTo: "/", templateUrl: "videos.html"});
    }]);
app.run(['$rootScope', '$location', function ($rootScope, $location) {
        $rootScope.facebookAppId = '[FacebookAppId]'; // set your facebook app id here
    }
]);

app.directive('dynFbCommentBox', function () {
    function createHTML(href, numposts, colorscheme) {
        return '<div class="fb-comments" ' +
                'data-href="' + href + '" ' +
                'data-numposts="' + numposts + '" ' +
                'data-colorsheme="' + colorscheme + '">' +
                '</div>';
    }

    return {
        restrict: 'A',
        scope: {},
        link: function postLink(scope, elem, attrs) {
            attrs.$observe('pageHref', function (newValue) {
                var href = newValue;
                var numposts = attrs.numposts || 5;
                var colorscheme = attrs.colorscheme || 'light';

                elem.html(createHTML(href, numposts, colorscheme));
                FB.XFBML.parse(elem[0]);
            });
        }
    };
});
//
//app.directive('ads', function() {
//    return {
//        restrict: 'A',
//        templateUrl: 'partiels/adsTpl',
//        controller: function() {
//            (adsbygoogle = window.adsbygoogle || []).push({});
//        }
//    };
//});


app.factory('authInterceptor', function ($rootScope, $q, $window) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers.alma = $window.sessionStorage.token;
            }
            return config;
        },
        response: function (response) {
            if (response.status === 401) {
                // handle the case where the user is not authenticated
            }
            return response || $q.when(response);
        }
    };
});


app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
});


app.filter('nl2br', ['$sanitize', function ($sanitize) {
        var tag = (/xhtml/i).test(document.doctype) ? '<br />' : '<br>';
        return function (msg) {
            // ngSanitize's linky filter changes \r and \n to &#10; and &#13; respectively
            msg = (msg + '').replace(/(\r\n|\n\r|\r|\n|&#10;&#13;|&#13;&#10;|&#10;|&#13;)/g, tag + '$1');
            return $sanitize(msg);
        };
    }]);



app.filter('nl2brLimited', ['$sanitize', function ($sanitize) {
        var tag = (/xhtml/i).test(document.doctype) ? '<br />' : '<br>';
        return function (msg) {
            // ngSanitize's linky filter changes \r and \n to &#10; and &#13; respectively
            msg = (msg + '').replace(/(\r\n|\n\r|\r|\n|&#10;&#13;|&#13;&#10;|&#10;|&#13;)/g, tag + '$1');
            return $sanitize(msg.substring(0, msg.length > 255 ? 255 : msg.length) + "...");
        };
    }]);



app.directive("ngFileSelect", function () {
    return {
        link: function ($scope, el) {
            el.bind("change", function (e) {
                $scope.file = (e.srcElement || e.target).files[0];
                $scope.getFile();
            });
        }
    }
})

//app.directive('myAdSense', function() {
//    return {
//        restrict: 'A',
//        transclude: true,
//        replace: true,
//        template: '<div ng-transclude></div>',
//        link: function($scope, element, attrs) {
//        }
//    }
//})

var adSenseTpl = '<ins class="ad-div adsbygoogle responsive" style="display:inline-block;width:800px;height:90px" \n\
data-ad-client="ca-pub-6743841412690718" data-ad-slot="3369518980" ></ins>';


app.directive('googleAdsense', function ($window, $compile) {
    return {
        restrict: 'A',
        transclude: true,
        template: adSenseTpl,
        link: function postLink(scope, element, iAttrs) {
            element.html("");
            element.append(angular.element($compile(adSenseTpl)(scope)));
            if (!$window.adsbygoogle) {
                $window.adsbygoogle = [];
            }
            window.setInterval("javascript function", 3000);
            $window.adsbygoogle.push({});


        }
    };
});

