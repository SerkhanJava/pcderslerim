
window.fbAsyncInit = function () {
    FB.init({
        appId: '416465375206212',
        xfbml: true,
        version: 'v2.3'
    });
};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


app.controller('SelectedVideoCtrl', ['$scope', '$http', '$sce', '$route', '$routeParams', '$window',
    '$interval', '$cookieStore',
    function ($scope, $http, $sce, $route, $routeParams, $window, $interval, $cookieStore) {
        $scope.setVideoSelectedPage(true);
        $scope.reloadRoute = function () {
            $window.location.reload();
        }
        $scope.goToLinkArea = function () {
            $scope.descriptionVisible = !$scope.descriptionVisible; 
        }
        $scope.goToLink = function (videolink) {
            if (!$scope.selectedVideo.links || $scope.selectedVideo.links.length == 0) {
                $scope.selectedVideoLinkStatus = "Bu videoya dair hiç bir indirme linki yoktur";
                return;
            }
            if (!$cookieStore.get($scope.selectedVideo.youtubeId)) {
                $scope.selectedVideoLinkStatus = "İÇERİĞİ  VİDEONUN YARISINI İZLEDİKTEN SONRA İNDİRE BİLECEKSİNİZ";
                return;
            }

            if ($cookieStore.get($scope.selectedVideo.youtubeId) && videolink) {
                $window.open(videolink.url);
            }
        }





        $scope.myModel = {
            fbCommentUrl: 'http://' + location.host + '/#/video=' + $routeParams.videoId,
            fbUrl: 'http://' + location.host + '/#/video=' + $routeParams.videoId,
            gmailUrl: 'http://' + location.host + '/#/video=' + $routeParams.videoId,
            twitterUrl: 'http://twitter.com/pcderslerim',
            youtubeUrl: ' http://goo.gl/RxFw8I',
        };


        $scope.contentVisible = false;
        $scope.descriptionVisible = false;



        $scope.loadYoutubeVideoViewCount = function (selectedVideo) {
            $http({
                method: 'GET',
                url: "http://gdata.youtube.com/feeds/api/videos/" + selectedVideo.youtubeId + "?v=2&alt=json",
            }).
                    success(function (data) {
                        //Showing Success message
                        $scope.videoViewCountFromYoutube = data.responseObject;
                    })
                    .error(function (error) {

                    });
        };

        $scope.loadYoutubeVideoComments = function (selectedVideo) {
//        $http.get("http://gdata.youtube.com/feeds/api/videos/" + selectedVideo.youtubeId + "/comments?v=2&alt=json").success(function (data) {
//            $scope.videoComments = data;
//        });
        };
        $scope.YTDurationToSeconds = function (duration) {
            var match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/)

            var hours = (parseInt(match[1]) || 0);
            var minutes = (parseInt(match[2]) || 0);
            var seconds = (parseInt(match[3]) || 0);

            return hours * 3600 + minutes * 60 + seconds;
        }

        $scope.loadVideo = function (videoId) {


            $http.get(apiUrl + '/videos/' + videoId).success(function (data) {
                data = data.responseObject;
                if (data.url) {
                    data.youtubeId = data.url.split('v=')[1];
                    data.url = "http://www.youtube.com/embed/" + data.youtubeId + '?autoplay=1';
                    data.url = $sce.trustAsResourceUrl(data.url);
                    $http.get("https://www.googleapis.com/youtube/v3/videos?id="
                            + data.youtubeId + "&part=contentDetails&key=AIzaSyB9DGboVYOHMDsQxJu-rxsrofoujwmKRRo")
                            .success(function (data) {
                                data.items[0].contentDetails.duration
                                if (data && data.items && data.items[0] &&
                                        data.items[0].contentDetails && data.items[0].contentDetails.duration &&
                                        data.items[0].contentDetails.duration.length > 0) {
                                    var duration = data.items[0].contentDetails.duration;
                                    if (duration) {
                                        $scope.selectedVideo.duration = $scope.YTDurationToSeconds(duration);
                                        console.log('duration=' + $scope.selectedVideo.duration);
                                        console.log('data.youtubeId=' + $scope.selectedVideo.youtubeId);
                                        console.log('$cookieStore.get(data.youtubeId)=' + $cookieStore.get($scope.selectedVideo.youtubeId));
                                        if (!$cookieStore.get($scope.selectedVideo.youtubeId)) {
                                            console.log('first look');
                                            $scope.mytimeout = $interval(function () {
                                                console.log('makge video can access');
                                                $cookieStore.put($scope.selectedVideo.youtubeId, "canAccess");
                                                $interval.cancel($scope.mytimeout);
                                            }, ($scope.selectedVideo.duration / 2) * 1000);// 
                                        }

                                    }
                                }
                            })
                }
                if (data.tags) {
                    data.tags = data.tags.split(";");
                }

                $scope.selectedVideo = data;

                $scope.loadYoutubeVideoViewCount($scope.selectedVideo);
//            $scope.loadYoutubeVideoComments($scope.selectedVideo);
            });
        };

        if ($routeParams.videoId) {
            $scope.loadVideo($routeParams.videoId);
        }

        $scope.reportLink = function (videoLink) {
            $http({
                method: 'PUT', url: apiUrl + '/videolinks/' + videoLink.id,
                data: angular.toJson({}),
                headers: {'Content-Type': 'application/JSON'}
            }).
                    success(function () {
                        //Showing Success message
                        videoLink.success =
                                "Raporunuz ulaştı.Kısa zamanda problemi hall etmeye çalışacağız.Teşekkürler";
                    })
                    .error(function () {
                        //Showing error message
                        videoLink.error = "Raporunuz ulaşamadı.Bilinmedik bir hata oluştu";
                    });
        };

        $scope.loggedInUser = {};
        $scope.refreshUser = function () {
            $scope.loggedInUser.name = $window.sessionStorage.userName;
            $scope.loggedInUser.surname = $window.sessionStorage.userSurname;
            $scope.loggedInUser.id = $window.sessionStorage.userId;
        };

    }]);

app.controller('MainCtrl', ['$scope', '$http', '$route', '$routeParams', '$location', '$window',
    function ($scope, $http, $route, $routeParams, $location, $window) {

        $scope.moreVideos = true;

//        if ($routeParams.moreVideos) {
//            $scope.moreVideos = true;
//        }

        $scope.begin = $routeParams.begin;
        $scope.end = $routeParams.end;

        if (!$scope.begin) {
            $scope.begin = 0;
        }

        if (!$scope.end) {
            $scope.end = 16;
        }

        $scope.setRoute = function (route) {
//        $scope.moreVideos = !$scope.moreVideos;
            var url = route;
//            if ($routeParams.categoryId) {
//                url += "&categoryId=" + $routeParams.categoryId;
//            }
            if ($routeParams.search) {
                url += "&search=" + $routeParams.search;
            }
            $location.path(url);



        };

        $scope.loadAllVideos($scope.begin, $scope.end);
    }]);




app.controller('IndexCtrl', ['$scope', '$http', '$route', '$routeParams', '$location', '$window',
    function ($scope, $http, $route, $routeParams, $location, $window) {
        $scope.setRoute = function (route) {
            $location.path(route);
           
        };

        $scope.reloadPage = function() {
            window.location.reload();
        }



        $scope.videoSelectedPage = false;
        $scope.channelId = 'UCInW-lJBGnS8PuKqaMjsLlQ';
        $scope.setVideoSelectedPage = function (val) {
            $scope.videoSelectedPage = val;
        }

        $scope.setVideoSelectedPage(false);
        $scope.loggedInUser = function () {
            return $window.sessionStorage.userName + ' ' + $window.sessionStorage.userSurname;
        };

        $scope.isGuest = function () {
            return (!($window.sessionStorage.userName && $window.sessionStorage.userName.length > 0));
        };

        $scope.isYoutubeSubscribed = function () {
            return false;
        }

        $scope.isGooglePlussed = function () {
            return true;
        }

        $scope.FBLogin = function () {
            FB.login(function (response) {

                if (response.authResponse) {
                    console.log('logged in');
                    if (!$scope.videoSelectedPage) {
//                        $scope.setRoute("/");
                        console.log("$scope.videoSelectedPage=" + $scope.videoSelectedPage);
                    }

                    FB.api('/me', function (response) {
                        console.log('name=' + angular.toJson(response));
                        var accessToken = FB.getAuthResponse();
                        console.log('accessToken=' + angular.toJson(accessToken));
                        var temp = {};
                        temp.name = response.first_name;
                        temp.surname = response.last_name;
                        temp.email = response.email;
                        temp.facebookAccessToken = accessToken.accessToken;
                        console.log(angular.toJson(temp));
                        var method = 'POST';
                        var url = apiUrl + '/users/login';
                        $http({
                            method: method, url: url,
                            data: angular.toJson(temp),
                            headers: {'Content-Type': 'application/JSON'}
                        }).
                                success(function (data) {
                                    data = data.responseObject;
                                    $scope.status = data;

                                    $window.sessionStorage.token = data.token;
                                    $window.sessionStorage.userName = data.user.name;
                                    $window.sessionStorage.userSurname = data.user.surname;
                                })
                                .error(function (error) {
                                    $scope.status = error.errorMessage;
                                });
                    });
                } else {
                    console.log('cancelled');
                }
            }, {scope: 'public_profile,email'})
        }
        $scope.refreshUser = function () {
            $scope.loggedInUser.name = $window.sessionStorage.userName;
            $scope.loggedInUser.surname = $window.sessionStorage.userSurname;
            $scope.loggedInUser.id = $window.sessionStorage.userId;
        };

        $scope.refreshUser();

        $scope.successMessage = {};

        $scope.setRoute = function (route) {
            $location.path(route);
        };

        $scope.loadVideosSize = function (begin, end, categoryId, search) {
            var url = apiUrl + '/videos/size';

            if (categoryId) {
                url += '?categoryId=' + categoryId;
            }
            if (search) {
                url += '?search=' + search;
            }

            $http.get(url).success(function (data)
            {
                data = data.responseObject;
                $scope.range = [];
                var size = data / 16;
                for (var i = 0; i <= size; i++) {
                    var styleStr = '';

                    if (i * 16 == begin) {
                        styleStr = '#f8cb1c';
                    }

                    $scope.range.push({begin: i * 16, end: i * 16 + 16, categoryId: categoryId, search: search, style: styleStr});

                }
            });
        }

        $scope.loadAllVideos = function (begin, end, categoryId, search) {
            $scope.loadVideosSize(begin, end, categoryId, search);

            var videoUrl = apiUrl + '/videos';
            videoUrl += '?begin=' + begin + '&end=' + end;
            if (categoryId) {
                videoUrl += '&categoryId=' + categoryId;
            }
            if (search) {
                videoUrl += '&search=' + search;
            }

            $http({
                method: 'GET',
                url: videoUrl
            }).
                    success(function (data) {
                        //Showing Success message
//                    $route.reload();
                        data = data.responseObject;
                        $scope.videoContainers = [];

                        for (i = 0; i < data.length; i++) {
                            if (i == 0 || i == 7) {
                                $scope.videoContainers.push({videos: []});
                            }
                            if (!data[i].url) {
                                continue;
                            }
                            var containerIndex = 0;
                            if (i > 7) {
                                containerIndex = 1;
                            }
                            data[i].youtubeThumb = 'http://img.youtube.com/vi/' + data[i].url.split('v=')[1] + '/0.jpg';
                            $scope.videoContainers[containerIndex].videos.push(data[i]);
                        }

                    })
                    .error(function (error) {
                        //Showing error message
                    });
        }

        $scope.loadAllCategories = function () {
            $http.get(apiUrl + '/categories').success(function (data) {
                $scope.categories = data.responseObject;
            });
        }

        $scope.loadAllCategories();

        $scope.logoutUser = function () {
            $http({
                method: 'POST',
                url: apiUrl + '/users/logout?token=' + $window.sessionStorage.token,
                headers: {'Content-Type': 'application/json'}
            }).
                    success(function (data) {

                        $window.sessionStorage.token = "";
                        $window.sessionStorage.userId = 0;
                        $window.sessionStorage.userName = "";
                        $window.sessionStorage.userSurname = "";

                        $scope.refreshUser();
                        $scope.setRoute('/');
                        //Showing Success message
                    })
                    .error(function (error) {
                        alert("Xəta baş verdi");
                        //Showing error message
                    });
        };
        
        //UserCtrl
          $scope.isDisabled = false;

        $scope.setSelectedPage = function (selectedPage) {
            $scope.selectedPage = selectedPage;
        }

        $scope.activateUser = function (token) {
            $http({
                method: 'GET',
                url: apiUrl + '/users/activation?token=' + token
            }).
                    success(function (data) {
                        $scope.status = {success: "PCDERSLERIM ailesine hoş geldiniz.Hesabınız başarıyla onaylandı.Giriş yapa bilirsiniz"}
                    }).error(function (data) {
                $scope.status = {error: "Onay zamanı hata oluştu!Lütfen pcderslerim@fastmail.com emailine hatayı bildiriniz"}
            });
        }
        console.log('$routeParams.token=' + $routeParams.token);
        if ($routeParams.token) {
            console.log('here');
            $scope.activateUser($routeParams.token);
        }

        $scope.setSelectedPage('login');


        $scope.title = "Kayıt ol";

        $scope.newUser = {};

        $scope.status = {};
        $scope.condition = {};
        $scope.checkFields = function () {
            var result = true;
            $scope.status = {};
            if ($scope.newUser) {
                if (!$scope.condition.agree) {
                    $scope.status.conditionsError = "Kayıt olmanız için şartları kabul etmeniz gerekli";
                    result = false;
                }
                if (!$scope.newUser.name || $scope.newUser.name.lenght === 0) {
                    $scope.status.nameError = "İsminizi giriniz";
//                $scope.isNameEmptyStyle = "color:red";
                    result = false;
                }

                if (!$scope.newUser.surname || $scope.newUser.surname.lenght === 0) {
                    $scope.status.surnameError = "Soyisminizi giriniz";
//                $scope.isSurnameEmptyStyle = "color:red";
                    result = false;
                }

                if (!$scope.newUser.email || $scope.newUser.email.lenght === 0) {
                    $scope.status.emailError = "Emailinizi giriniz";
//                $scope.isEmailEmptyStyle = "color:red";
                    result = false;
                }

                if (!($scope.newUser.password && $scope.newUser.password.length >= 5)) {
                    $scope.status.passwordError = "min. 5 karakter";
                    result = false;
                }

                if ($scope.newUser.password !== $scope.newUser.passwordRepeat) {
                    $scope.status.passwordRepeatError = "Şifreler aynı deyil";
                    result = false;
                }

            }
            return result;
        };

        $scope.checkPasswordSame = function () {
            var result = true;
            $scope.status.passwordRepeatError = "";
            $scope.status.passwordError = "";

            if (!($scope.newUser.password && $scope.newUser.password.length >= 5)) {
                $scope.status.passwordError = "min. 5 karakter";
                result = false;
            }

            if ($scope.newUser.password !== $scope.newUser.passwordRepeat) {
                $scope.status.passwordRepeatError = "Şifreler aynı deyil";
                result = false;
            }
            return result;
        }

        $scope.addUser = function () {
            $scope.isDisabled = true;

            if (!$scope.checkFields()) {
                var element = document.getElementById("user_field");
                var alignWithTop = true;
                element.scrollTop;
                 $scope.isDisabled = false;
                return;
            }
            $http({
                method: 'POST', url: apiUrl + '/users',
                data: angular.toJson($scope.newUser),
                headers: {'Content-Type': 'application/JSON'}
            }).
                    success(function (data) {
                        //Showing Success message
                        $scope.isDisabled = false;
                        $scope.status.success = "Kayıt oldunuz.Onay linki emailinize gönderilmiştir.Inbox ve ya Spam klasörünüzü kontrol ediniz.";
                        $scope.setSelectedPage('login');
                    })
                    .error(function (error) {
                        //Showing error message
                        $scope.isDisabled = false;
                        $scope.status = error;
                        $scope.status.error = "Kayıt zamanı hata oluştu,Lütfen serxanresullu@gmail.com adresine hatayı bildiriniz";
                        if (error.alreadyExistError) {
                            error.alreadyExistError = "Bu email kullanılmakta.Başka email seçiniz";
                        }
                        
                        if (error.emailError) {
                            error.emailError = "Email yanlış.Lütfen kontrol ediniz";
                        }

                    });

        };



        $scope.userInfo = {};

        $scope.checkUser = function () {
            $scope.buttonPart = true;
            $scope.isDisabled = true;

            var method = 'POST';
            var url = apiUrl + '/users/login';

            $http({
                method: method, url: url,
                data: angular.toJson($scope.userInfo),
                headers: {'Content-Type': 'application/JSON'}
            }).
                    success(function (data) {

                        $scope.isDisabled = false;

                        $scope.status = {success: "Başarıyla giriş yaptınız"};
                        data = data.responseObject;//akilli cocuk
                        $window.sessionStorage.token = data.token;

                        $window.sessionStorage.userId = data.user.id;
                        $window.sessionStorage.userName = data.user.name;
                        $window.sessionStorage.userSurname = data.user.surname;
                        $scope.refreshUser();
                        if (!$scope.videoSelectedPage) {
                            $scope.setRoute("/");
                        }
                    })
                    .error(function (error) {
                        $scope.isDisabled = false;
                        $scope.status = {error: "Email ve ya şifreyi yanlış girdiniz"};
                    });

        };

    

    }]);

//user

app.controller('UserCtrl', ['$scope', '$http', '$route', '$routeParams', '$location', '$window',
    function UserCtrl($scope, $http, $route, $routeParams, $location, $window) {
        $scope.isDisabled = false;

        $scope.setSelectedPage = function (selectedPage) {
            $scope.selectedPage = selectedPage;
        }

        $scope.activateUser = function (token) {
            $http({
                method: 'GET',
                url: apiUrl + '/users/activation?token=' + token
            }).
                    success(function (data) {
                        $scope.status = {success: "PCDERSLERIM ailesine hoş geldiniz.Hesabınız başarıyla onaylandı.Giriş yapa bilirsiniz"}
                    }).error(function (data) {
                $scope.status = {error: "Onay zamanı hata oluştu!Lütfen pcderslerim@fastmail.com emailine hatayı bildiriniz"}
            });
        }
        console.log('$routeParams.token=' + $routeParams.token);
        if ($routeParams.token) {
            console.log('here');
            $scope.activateUser($routeParams.token);
        }

        $scope.setSelectedPage('login');


        $scope.title = "Kayıt ol";

        $scope.newUser = {};

        $scope.status = {};
        $scope.condition = {};
        $scope.checkFields = function () {
            var result = true;
            $scope.status = {};
            if ($scope.newUser) {
                if (!$scope.condition.agree) {
                    $scope.status.conditionsError = "Kayıt olmanız için şartları kabul etmeniz gerekli";
                    result = false;
                }
                if (!$scope.newUser.name || $scope.newUser.name.lenght === 0) {
                    $scope.status.nameError = "İsminizi giriniz";
//                $scope.isNameEmptyStyle = "color:red";
                    result = false;
                }

                if (!$scope.newUser.surname || $scope.newUser.surname.lenght === 0) {
                    $scope.status.surnameError = "Soyisminizi giriniz";
//                $scope.isSurnameEmptyStyle = "color:red";
                    result = false;
                }

                if (!$scope.newUser.email || $scope.newUser.email.lenght === 0) {
                    $scope.status.emailError = "Emailinizi giriniz";
//                $scope.isEmailEmptyStyle = "color:red";
                    result = false;
                }

                if (!($scope.newUser.password && $scope.newUser.password.length >= 5)) {
                    $scope.status.passwordError = "min. 5 karakter";
                    result = false;
                }

                if ($scope.newUser.password !== $scope.newUser.passwordRepeat) {
                    $scope.status.passwordRepeatError = "Şifreler aynı deyil";
                    result = false;
                }

            }
            return result;
        };

        $scope.checkPasswordSame = function () {
            var result = true;
            $scope.status.passwordRepeatError = "";
            $scope.status.passwordError = "";

            if (!($scope.newUser.password && $scope.newUser.password.length >= 5)) {
                $scope.status.passwordError = "min. 5 karakter";
                result = false;
            }

            if ($scope.newUser.password !== $scope.newUser.passwordRepeat) {
                $scope.status.passwordRepeatError = "Şifreler aynı deyil";
                result = false;
            }
            return result;
        }

        $scope.addUser = function () {
            $scope.isDisabled = true;

            if (!$scope.checkFields()) {
                var element = document.getElementById("user_field");
                var alignWithTop = true;
                element.scrollTop;
                 $scope.isDisabled = false;
                return;
            }
            $http({
                method: 'POST', url: apiUrl + '/users',
                data: angular.toJson($scope.newUser),
                headers: {'Content-Type': 'application/JSON'}
            }).
                    success(function (data) {
                        //Showing Success message
                        $scope.isDisabled = false;
                        $scope.status.success = "Kayıt oldunuz.Onay linki emailinize gönderilmiştir.Inbox ve ya Spam klasörünüzü kontrol ediniz.";
                        $scope.setSelectedPage('login');
                    })
                    .error(function (error) {
                        //Showing error message
                        $scope.isDisabled = false;
                        $scope.status = error;
                        $scope.status.error = "Kayıt zamanı hata oluştu,Lütfen serxanresullu@gmail.com adresine hatayı bildiriniz";
                        if (error.alreadyExistError) {
                            error.alreadyExistError = "Bu email kullanılmakta.Başka email seçiniz";
                        }
                        
                        if (error.emailError) {
                            error.emailError = "Email yanlış.Lütfen kontrol ediniz";
                        }

                    });

        };



        $scope.userInfo = {};

        $scope.checkUser = function () {
            $scope.buttonPart = true;
            $scope.isDisabled = true;

            var method = 'POST';
            var url = apiUrl + '/users/login';

            $http({
                method: method, url: url,
                data: angular.toJson($scope.userInfo),
                headers: {'Content-Type': 'application/JSON'}
            }).
                    success(function (data) {

                        $scope.isDisabled = false;

                        $scope.status = {success: "Başarıyla giriş yaptınız"};
                        data = data.responseObject;//akilli cocuk
                        $window.sessionStorage.token = data.token;

                        $window.sessionStorage.userId = data.user.id;
                        $window.sessionStorage.userName = data.user.name;
                        $window.sessionStorage.userSurname = data.user.surname;
                        $scope.refreshUser();
                        if (!$scope.videoSelectedPage) {
                            $scope.setRoute("/");
                        }
                    })
                    .error(function (error) {
                        $scope.isDisabled = false;
                        $scope.status = {error: "Email ve ya şifreyi yanlış girdiniz"};
                    });

        };

    }
]);


//video controller
app.controller('VideoCtrl', ['$scope', '$http', '$route', '$routeParams', '$location', '$window',
    function VideoCtrl($scope, $http, $route, $routeParams, $location, $window) {


        $scope.pagination = true;
        $scope.paginationCategory = false;
        $scope.paginationSearch = false;
        var videoUrl = apiUrl + '/videos';
        var begin = $routeParams.begin;
        var end = $routeParams.end;

        if (!begin) {
            begin = 0;
        }

        if (!end) {
            end = 16;
        }
        if ($routeParams.categoryId) {
            $scope.pagination = false;
            $scope.paginationCategory = true;
            $scope.paginationSearch = false;
        }
        if ($routeParams.search) {
            $scope.pagination = false;
            $scope.paginationCategory = false;
            $scope.paginationSearch = true;
        }

        videoUrl += '?begin=' + begin + '&end=' + end;
        if ($routeParams.categoryId) {
            videoUrl += '&categoryId=' + $routeParams.categoryId;

        }
        if ($routeParams.search) {
            videoUrl += '&search=' + $routeParams.search;

        }
        $http({
            method: 'GET',
            url: videoUrl
        }).
                success(function (data) {
                    //Showing Success message
//                    $route.reload();
                    data = data.responseObject;
                    $scope.videoContainers = [];

                    for (i = 0; i < data.length; i++) {
                        if (i == 0 || i == 7) {
                            $scope.videoContainers.push({videos: []});
                        }
                        if (!data[i].url) {
                            continue;
                        }
                        var containerIndex = 0;
                        if (i > 7) {
                            containerIndex = 1;
                        }
                        data[i].youtubeThumb = 'http://img.youtube.com/vi/' + data[i].url.split('v=')[1] + '/0.jpg';
                        $scope.videoContainers[containerIndex].videos.push(data[i]);
                    }

                })
                .error(function (error) {
                    //Showing error message

                });

        var sizeUrl = apiUrl + '/videos/size';
        sizeUrl += '?begin=' + $routeParams.begin + '&end=' + $routeParams.end;
        if ($routeParams.categoryId) {
            sizeUrl += '&categoryId=' + $routeParams.categoryId;
        }
        if ($routeParams.search) {
            sizeUrl += '&search=' + $routeParams.search;
        }



        $http.get(sizeUrl).success(function (data) {
            data = data.responseObject;
            $scope.range = [];
            var size = data / 16;
            for (var i = 0; i < size; i++) {
                var styleStr = '';

                if (i * 16 == $routeParams.begin) {
                    styleStr = '#f8cb1c';
                }
                $scope.range.push({begin: i * 16, end: i * 16 + 16, categoryId: $routeParams.categoryId, search: $routeParams.search, style: styleStr});
            }
        });

    }]);


app.controller('PictureCtrl', ['$scope', '$http', '$route', '$routeParams', '$location', '$window',
    function PictureCtrl($scope, $http, $route, $routeParams, $location, $window, fileReader) {
        $scope.newPicture = {};


        $http.get(apiUrl + '/pictures').success(function (data) {
            $scope.pictures = data.responseObject;
        })

        //upload image

        window.onload = function () {
            var fileUpload = document.getElementById("files");
            fileUpload.onchange = function () {
                if (typeof (FileReader) != "undefined") {
                    var dvPreview = document.getElementById("dvPreview");
                    dvPreview.innerHTML = "";
                    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.gif|.png|.bmp)$/;
                    for (var i = 0; i < fileUpload.files.length; i++) {
                        var file = fileUpload.files[i];
                        if (regex.test(file.name.toLowerCase())) {
                            var reader = new FileReader();
                            reader.onload = function (e) {
                                var img = document.createElement("IMG");
                                img.height = "100";
                                img.width = "100";
                                img.src = e.target.result;
                                dvPreview.appendChild(img);
                            }
                            reader.readAsDataURL(file);
                        } else {
                            alert(file.name + " is not a valid image file.");
                            dvPreview.innerHTML = "";
                            return false;
                        }
                    }
                } else {
                    alert("This browser does not support HTML5 FileReader.");
                }
            }
        };



        $scope.addPicture = function (x) {
            var method = 'POST';
            var url = apiUrl + '/users/' + x.id + '/pictures';

            $http({
                method: method,
                url: url,
                data: angular.toJson($scope.newPicture),
                headers: {'Content-Type': 'application/JSON'}
            }).
                    success(function () {
                        $scope.statusVideo = "saved successfully!!!";
                        $scope.synchSatus++;
                    })
                    .error(function () {
                    });
        }

    }]);
app.controller('updateimagecontroller',['$scope',function($scope) {
        $scope.funct=function() {
        document.getElementById('btnfileuploade').click();
		
    };
}
    
]);
 