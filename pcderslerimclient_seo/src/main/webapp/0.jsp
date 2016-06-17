<%@page import="java.util.List"%>
<%@page import="dto.VideoDTO"%>
<%@page import="util.RestfulClient"%>
<%@page language="java"  contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html ng-app="app">
    <%
        int videoID = Integer.parseInt(request.getParameter("video"));
        VideoDTO video = RestfulClient.getVideo(videoID);
    %>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title><%= video.getTitle()%></title>      
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
        <div class="col-md-8 content" ng-controller="UserCtrl" > 
            <style>
                .is-disabled {
                    opacity: .5;
                    pointer-events: none;
                }
            </style>

            <div  class="col-md-8 content">
                <div   style="margin:auto;width: 50%;margin-top: 20%">
                    <div ng-class="{'is-disabled' : isDisabled}">

                        <h4 style="color:green">{{status.success}}</h4>
                        <h4 style="color:red">{{status.error}}</h4>

                        <div class="form-group">
                            <label class="col-sm-2 col-sm-2 control-label">Email:</label>
                            <div class="col-sm-10">
                                <input class="form-control" type="text"  style="margin-bottom: 10px;"   
                                       ng-model="userInfo.email">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-2 col-sm-2 control-label">Şifre:</label>
                            <div class="col-sm-10">
                                <input class="form-control" type="password" style="margin-bottom: 10px;" 
                                       ng-model="userInfo.password">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label"><a ng-click="setSelectedPage('register')">Kayıt ol</a></label><br/>
                            <!--<label class="control-label"><a>Şifrəmi unutmuşam</a></label><br/>-->
                        </div>

                        <button type="button" class="btn btn-primary" style="padding: 10px"  ng-click="checkUser()">Login</button>
                        <button ng-click="FBLogin()">
                            FB login
                        </button>
                    </div> 
                </div>

            </div>
        </div>
        <jsp:include page="footer.jsp" />
    </body>
</html>
