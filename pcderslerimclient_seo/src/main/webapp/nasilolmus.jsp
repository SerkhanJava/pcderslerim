<%@page import="java.util.List"%>
<%@page import="dto.VideoDTO"%>
<%@page import="util.RestfulClient"%>
<%@page language="java"  contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html ng-app="app">

    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Arkadaşlar nasıl olmuş?</title>      
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
        <style>

            .thumb {
                height: 75px;
                border: 1px solid #000;
                margin: 10px 5px 0 0;
            }
            div.editable {
                width: 300px;
                height: 200px;
                border: 1px solid #ccc;
                padding: 5px;
            }
            input[type="file"] {
                display: none;
            }

            .icerik div{
                width:68px;height:70px;border:1px solid #ccc;margin-left:2px;float: left;
                cursor: pointer;
            }

        </style>
    </head>
    <body class="color-1" ng-controller="IndexCtrl">
         <jsp:include page="header.jsp" />
                    <span  >
                        <div class="col-md-8 " ng-controller="SelectedVideoCtrl"> 
                            <link rel="stylesheet" type="text/css" href="assets/css/bootstrap.min.css">
                            <link rel="stylesheet" type="text/css" href="assets/css/custom.css">
                            <div class="content video" style="width: 100%;">

                                <div style="width: 56%;margin: 0 auto">
                                    <span >Çalışmanızı bizimle paylaşmak istermisiniz?</span>
                                    <textarea style="border:1px solid #ccc;margin-top: 15px;width: 100%;
                                              height: 100px;" name="textarea"  placeholder="Çalışma ile ilgili bir kaç söz.Mesela:arkadaşlar ilk çalışmam.Yorumlarsanız sevinirim"></textarea>

                                    <div class="icerik" ng-app="app" ng-controller="updateimagecontroller">
                                        <div   id="dvPreview" ng-click="funct()">
                                            <label for="files" >
											Önceki hali: <input type="file"  name="img">
                                                
                                            </label>
                                        </div>
                                        <div   ng-click="funct()">
                                            <label for="files" >
											
                                                sonrakı hali: <input type="file"  name="img" id="btnfileuploade">
                                            </label>  
                                        </div>
                                        <div  ><label for="files"  style="margin:auto">İçerik</label></div>
                                        <div  ><label for="files"  style="margin:auto">İçerik</label></div>
                                        <div  ><label for="files"  style="margin:auto">İçerik</label></div>
                                        <div  ><label for="files"  style="margin:auto">İçerik</label></div>
                                    </div>

                                    <button style="float:right;margin-top: 10px;">Yayımla</button>
                                </div>
                                <div style="margin: 0 auto;margin-top:20%;border-top: 1px solid #0099cc;padding-top: 15px;" >
                                    <center>Diğer paylaşımlar</center>
                                </div>

                            </div>  
                            <div style="margin-top: 68%;">
                                <div   google-adsense></div>
                                <div class='panel panel-default' id='comments' >
                                    <div class="fb-comments"  data-width="800" data-numposts="5" data-colorscheme="light"

                                         dyn-fb-comment-box></div>

                                </div> 
                            </div> 

                        </div>
                    </span>
                   <jsp:include page="footer.jsp" />
    </body>
</html>
