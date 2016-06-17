//var successMessage = '';
//
//function UserCtrl($scope, $http, $location, $window) {//$route, $routeParams,
//    $scope.isDisabled = false;
//    $scope.title = "Kayıt ol";
//    $scope.status = successMessage;
//
//    $scope.tablePart = true;
//    $scope.updatePart = false;
//    $scope.newUser = {};
//    $scope.checkFields = function () {
//        var result = true;
//        if ($scope.newUser) {
//            if (!$scope.newUser.name || $scope.newUser.name.lenght === 0) {
//                $scope.isNameEmptyText = "Adınızı daxil edin";
//                $scope.isNameEmptyStyle = "color:red";
//                result = false;
//            } else {
//                $scope.isNameEmptyText = "";
//                $scope.isNameEmptyStyle = "";
//            }
//
//            if (!$scope.newUser.surname || $scope.newUser.surname.lenght === 0) {
//                $scope.isSurnameEmptyText = "Soyadınızı daxil edin";
//                $scope.isSurnameEmptyStyle = "color:red";
//                result = false;
//
//            } else {
//                $scope.isSurnameEmptyText = "";
//                $scope.isSurnameEmptyStyle = "";
//            }
//
//            if (!$scope.newUser.email || $scope.newUser.email.lenght === 0) {
//                $scope.isEmailEmptyText = "Emailinizi daxil edin";
//                $scope.isEmailEmptyStyle = "color:red";
//                result = false;
//
//            } else {
//                $scope.isEmailEmptyText = "";
//                $scope.isEmailEmptyStyle = "";
//            }
//
//            if (!$scope.newUser.phoneNumber || $scope.newUser.phoneNumber.lenght === 0) {
//                $scope.isMobileEmptyText = "Mobil nömrənizi daxil edin";
//                $scope.isMobileEmptyStyle = "color:red";
//                result = false;
//
//            } else {
//                $scope.isMobileEmptyText = "";
//                $scope.isMobileEmptyStyle = "";
//            }
//
//            if (!$scope.checkPasswordLength()) {
//                result = false;
//            }
//
//            if (!$scope.checkPasswordSame()) {
//                result = false;
//            }
//
//        }
//        return result;
//    };
//
//    $scope.checkPasswordLength = function () {
//
//
//        if ($scope.newUser.password && $scope.newUser.password.length >= 5) {
//            $scope.isItMinLengthText = '';
//            $scope.isItMinLengthStyle = '';
//            return true;
//        } else {
//            $scope.isItMinLengthText = 'Şifrə ən az 5 hərfdən ibarət olmalıdır';
//            $scope.isItMinLengthStyle = 'color:red';
//            return false;
//        }
//    };
//
//    $scope.checkPasswordSame = function () {
//        if (!$scope.newUser.passwordRepeat || $scope.newUser.passwordRepeat.length === 0) {
//            return false;
//        }
//
//        if ($scope.newUser.password === $scope.newUser.passwordRepeat) {
//            $scope.isItSameText = "Eynidir";
//            $scope.isItSameStyle = "color:green";
//            return true;
//        } else {
//            $scope.isItSameStyle = "color:red";
//            $scope.isItSameText = "Şifrələr fərqlidir!";
//            return false;
//        }
//    };
//
//
//    $scope.addUser = function () {
//        $scope.isDisabled = true;
//
//        if (!$scope.checkFields()) {
////            var element = document.getElementById("user_field");
////            var alignWithTop = true;
////            element.scrollTop;
//            return;
//        }
//
//        var method = '';
//        var url = 'http://pcderslerim.j.layershift.co.uk/pcderslerimapi/users';
//        if ($scope.newUser.id > 0) {
//            method = 'PUT';
//            url += '/' + $scope.newUser.id;
//        } else {
//            method = 'POST';
//        }
////        alert(JSON.stringify($scope.newUser));
//        $http({
//            method: method,
//            url: url,
//            data: angular.toJson($scope.newUser),
//            headers: {'Content-Type': 'application/JSON'}
//        }).
//                success(function (data) {
//                    //Showing Success message
//                    $scope.isDisabled = false;
//
//
//                    successMessage.success = "Müvəffəqiyyətlə qeydiyyatdan keçdiniz.Zəhmət olmasa emailinizi yoxlayın";
//                    $scope.setRoute('/login');
//
////                    alert($scope.status.success);
////                    $route.reload();
////                    $("#close_dlg").click();
//                })
//                .error(function (error) {
//                    //Showing error message
//                    $scope.isDisabled = false;
//
//                    $scope.status = error;
////                    var element = document.getElementById("user_name");
////                    var alignWithTop = true;
////                    element.scrollIntoView(alignWithTop);
//
//                });
//
//    };
//
//
///////////////////
//    $scope.userInfo = {};
//
//    $scope.checkUser = function () {
//        $scope.isDisabled = true;
//
//        var method = 'POST';
//        var url = 'http://pcderslerim.j.layershift.co.uk/pcderslerimapi/users/login';
//
////        alert(JSON.stringify($scope.userInfo));
//        $http({
//            method: method,
//            url: url,
//            data: angular.toJson($scope.userInfo),
//            headers: {'Content-Type': 'application/JSON'}
//        }).
//                success(function (data) {
//                    //Showing Success message
//                    $scope.isDisabled = false;
//
//                    currentToken = data.token;
//                    $scope.status = data;
////                    alert(angular.toJson(data));
//                    $window.sessionStorage.loggedInUser = data.user;
//                    $window.sessionStorage.token = data.token;
//                    $scope.setRoute("/");
////                    $("#close_dlg").click();
//                })
//                .error(function (error) {
//                    $scope.isDisabled = false;
//
//                    delete $window.sessionStorage.token;
////                    var element = document.getElementById("user_email");
////                    var alignWithTop = true;
////                    element.scrollIntoView(alignWithTop);
//                    //Showing error message
//                    $scope.status = error;
//                });
//
//    };
//
//}
