<%@page import="java.util.List"%>
<%@page import="dto.VideoDTO"%>
<%@page import="util.RestfulClient"%>
<%@page language="java"  contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html ng-app="app">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Üye girişi</title>      
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
        <%
            String token = request.getParameter("token");
            String activationResult = null;
//            if (token != null && !token.isEmpty()) {
//                activationResult = RestfulClient.activateUser(token);
//            }
//            out.println(activationResult);
            out.println(token);
        %>
        <jsp:include page="header.jsp" />

        <div class="col-md-8 content">

            <style>
                .is-disabled {
                    opacity: .5;
                    pointer-events: none;
                }
            </style>

            <div  class="col-md-8 content">
                <div   style="margin:auto;width: 50%;margin-top: 20%">
                    <div ng-class="{'is-disabled' : isDisabled}">
                        <%if (token != null) {
                                if (activationResult != null && activationResult.contains("success")) {
                        %>
                        <h4 style="color:green">Hesabınız başarıyla onaylandı.PCDERSLERIM ailesine hoş geldiniz!</h4>
                        <%} else {%>
                        <h4 style="color:red">Hesab onay aşamasında sorun oluştu.Lütfen serxanresullu@gmail.com adresine sorunu bildiriniz.Teşekkürler</h4>
                        <%}
                            }%>
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
                            <label class="control-label"><a href="userregister.jsp">Kayıt ol</a></label><br/>
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
