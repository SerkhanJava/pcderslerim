<%@page import="java.util.List"%>
<%@page import="dto.VideoDTO"%>
<%@page import="util.RestfulClient"%>
<%@page language="java"  contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html ng-app="app">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Üye Kayıt</title>      
        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
        <!-- Latest compiled and minified CSS -->
        <link rel="alternate" hreflang="tr" href="http://www.pcderslerim.com" />
        <link rel="stylesheet" type="text/css" href="assets/css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href="assets/css/custom.css">
        <style>
            .selectedItem{
                background-color: #f8cb1c;
            }
        </style>
    </head>
    <body class="color-1" ng-controller="IndexCtrl">
        <jsp:include page="header.jsp" />
        <div class="col-md-8 content"  > 
            <style>
                .is-disabled {
                    opacity: .5;
                    pointer-events: none;
                }
            </style>
            <div class="col-md-8 content" id="user_field">
                <div style="width: 80%;margin:auto" class="centered form panel panel-default" ng-class="{'is-disabled' : isDisabled}">      
                    <div  id="login_form" > 
                        <div class="social">
                        </div>
                        <div class="panel-body" > 

                            <h4>
                                <i class="fa fa-angle-right"></i>
                                {{title}}
                            </h4>
                            <div class="form-group">

                                <label class="col-sm-2 col-sm-2 control-label"></label>

                                <div class="col-sm-10">
                                    <label class="control-label" style="color: red">{{status.nameError}}</label>
                                    <label class="control-label" style="isNameEmptyStyle">{{isNameEmptyText}}</label>
                                    <!--   <label class="control-label" style="{{isNameEmptyStyle}}">{{isNameEmptyText}}</label>-->
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 col-sm-2 control-label">İsim:</label>
                                <div class="col-sm-10">
                                    <input style="margin-bottom: 10px;" id="user_name" type="text" class="form-control"  ng-model="newUser.name"
                                           ng-blur="">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 col-sm-2 control-label"></label>

                                <div class="col-sm-10">
                                    <label class="control-label" style="color: red">{{status.surnameError}}</label>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 col-sm-2 control-label">Soy isim:</label>
                                <div class="col-sm-10">
                                    <input style="margin-bottom: 10px;" type="text" class="form-control"
                                           ng-model="newUser.surname">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 col-sm-2 control-label"></label>

                                <div class="col-sm-10">
                                    <label class="control-label" style="color: red">{{status.alreadyExistError}}</label>
                                    <label class="control-label" style="color: red">{{status.emailError}}</label>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 col-sm-2 control-label">Email:</label>
                                <div class="col-sm-10">
                                    <input id="user_email" style="margin-bottom: 10px;" type="text" class="form-control" 
                                           ng-model="newUser.email">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 col-sm-2 control-label"></label>

                                <div class="col-sm-10">
                                    <label class="control-label" style="color: red">{{status.passwordError}}</label>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 col-sm-2 control-label">Şifre(min. 5 karakter):</label>
                                <div class="col-sm-10">
                                    <input style="margin-bottom: 10px;" type="password" class="form-control" 
                                           ng-model="newUser.password" ng-blur="checkPasswordLength()">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 col-sm-2 control-label"></label>

                                <div class="col-sm-10">
                                    <label class="control-label" style="color: red">{{status.passwordRepeatError}}</label>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 col-sm-2 control-label">Şifre tekrar:</label>
                                <div class="col-sm-10">
                                    <input style="margin-bottom: 10px;" type="password" class="form-control" 
                                           ng-model="newUser.passwordRepeat" ng-blur="checkPasswordSame()">
                                </div>


                            </div>

                            <div class="form-group">
                                <label class="control-label" style="color: red">{{status.error}}</label><br/>
                                <label class="control-label" style="color: red">{{status.conditionsError}}</label><br/>
                                <label>
                                    <input ng-model="condition.agree" ng-value="true"
                                           type="checkbox" 
                                           name="terms" 
                                           data-class="blue">  
                                    <span >Şartları okudum ve kabul ediyorum
                                        <a style="color:red" href="page/terms.html">şartlar</a>
                                    </span>
                                </label>
                            </div>          
                            <button type="button" class="btn btn-primary" ng-click="addUser()">Bitdi</button>
                        </div>        
                    </div>      
                </div>
            </div>
        </div>
        <jsp:include page="footer.jsp" />
    </body>
</html>
