<%@page import="util.DescriptionDTO"%>
<%@page import="util.ParseUtil"%>
<%@page import="java.util.List"%>
<%@page import="dto.VideoDTO"%>
<%@page import="util.RestfulClient"%>
<%@page language="java"  contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html ng-app="app">
    <%
        int videoID = Integer.parseInt(request.getParameter("video"));
        VideoDTO video = RestfulClient.getVideo(videoID);//hemin getVideo burda cagirilir ve video get olunur


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
<!--        <script>
                    (function (i, s, o, g, r, a, m) {
                        i['GoogleAnalyticsObject'] = r;
                        i[r] = i[r] || function () {
                            (i[r].q = i[r].q || []).push(arguments)
                        }, i[r].l = 1 * new Date();
                        a = s.createElement(o),
                                m = s.getElementsByTagName(o)[0];
                        a.async = 1;
                        a.src = g;
                        m.parentNode.insertBefore(a, m)
                    })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

                    ga('create', 'UA-30885300-3', 'auto');
                    ga('send', 'pageview');

        </script>-->
        <script>
                    (function (i, s, o, g, r, a, m) {
                        i['GoogleAnalyticsObject'] = r;
                        i[r] = i[r] || function () {
                            (i[r].q = i[r].q || []).push(arguments)
                        }, i[r].l = 1 * new Date();
                        a = s.createElement(o),
                                m = s.getElementsByTagName(o)[0];
                        a.async = 1;
                        a.src = g;
                        m.parentNode.insertBefore(a, m)
                    })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

                    ga('create', 'UA-68101258-2', 'auto');
                    ga('send', 'pageview');

        </script>
        <jsp:include page="header.jsp" />

        <div class="col-md-8 content" ng-controller="SelectedVideoCtrl"> 

            <div class="content video" style="width: 100%">
                <div class="video-player">    


                    <iframe src='<%=video.getUrl().replace("watch?v=", "/embed/") + "?autoplay=1"%>' 
                            frameborder='0' width='1280' height='450' scrolling='no' 
                            allowfullscreen>

                    </iframe>  
                </div>
                <!--/#video-player -->   
                <div class="panel panel-default">
                    <div class="video-info panel-body" itemprop="video"
                         itemscope itemtype="http://schema.org/VideoObject">
                        <h1 itemprop="name">
                            <%=video.getTitle()%> 
                        </h1>

                        <div class="row"  >
                            <div class="col-xs-12 col-md-9">

                                <!--  <div class="g-ytsubscribe" data-channel="afganrasulov"></div>
                                    <script src="https://apis.google.com/js/plusone.js"></script>-->

                                <iframe frameborder="0" hspace="0" marginheight="0" marginwidth="0" scrolling="no" id="myDiv"
                                        style="position: static; top: 0px; width: 214px; margin: 0px; left: 0px; visibility: visible; 
                                        height: 30px;" tabindex="0" vspace="0" width="100%" 
                                        src="http://www.youtube.com/subscribe_embed?bsv&amp;usegapi=1&amp;channel=afganrasulov;" data-gapiattached="true">

                                </iframe>


                                <div  class="row" >
                                    <div class="col-md-2" >
                                        <div google-plus="myModel.gmailUrl"></div>
                                    </div>

                                    <div class="row col-md-4">
                                        <div fb-like="myModel.fbUrl"></div>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>
                    <!--/.video-info -->
                    <div class="video-option">

                        <div class="video-description panel-body">
                            <div class="row">
                                <div class="col-sm-12">

                                    <div 
                                        >
                                        <%=video.getDescriptionAsHtml()%>
                                    </div>

                                    <div  ng-show="descriptionVisible">
                                        <ul>
                                            <%
                                                for (int i = 0; i < video.getLinks().size(); i++) {
                                            %>


                                            <li style="list-style-type: none;padding-bottom: 5px;">
                                                <button onclick="window.open('<%= video.getLinks().get(i).getUrl()%>', '_blank');" class="videoLink"   type="button" style="color: white"
                                                        >
                                                    <%= video.getLinks().get(i).getText()%>
                                                </button>

                                            </li>
                                            <%
                                                }
                                            %>
                                        </ul>
                                    </div>

                                </div>

                            </div>


                        </div>  

                        <a ng-click="goToLinkArea()">
                            <span class="downloadBtn" style="color: white;">Çalışma dosyaları indirmek için tıklayın</span>
                        </a>   

                    </div><!-- /.video-option   -->  
                </div>
                <div   google-adsense></div>
                <div class='panel panel-default' id='comments' >
                    <div class="fb-comments"  data-width="800" data-numposts="5" data-colorscheme="light"

                         dyn-fb-comment-box></div>

                </div>  
            </div>  


        </div>

        <jsp:include page="footer.jsp" />
    </body>
</html>
