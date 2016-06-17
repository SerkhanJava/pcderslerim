<%@page import="dto.CategoryDTO"%>
<%@page import="java.util.List"%>
<%@page import="dto.VideoDTO"%>
<%@page import="util.RestfulClient"%>
<%@page language="java"  contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html ng-app="app">
    <head>
        <meta property="og:url" content="www.pcderslerim.com/index.jsp" />
        <meta property="og:image" content="http://pcderslerim.com/assets/images/pcderslerim-logo.png" /> 

        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Pcderslerim | Online Photoshop Dersleri</title>      
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
        <!--       
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
        <div class="col-md-8 content panel panel-default type-video">
            <!-- Pcderslerim Below Post Title -->

            <div  google-adsense></div>

            <div class="panel-heading">
                Videolar

            </div>
            <%
                int categoryId = 0;
                int begin = 0;
                int end = 16;
                String search = request.getParameter("search");

                try {
                    begin = Integer.parseInt(request.getParameter("begin"));
                    end = Integer.parseInt(request.getParameter("end"));
                    categoryId = Integer.parseInt(request.getParameter("categoryId"));
                } catch (Exception ex) {

                }
                List<VideoDTO> videos = RestfulClient.getVideos(begin, end, categoryId, search);
            %>
            <ul class="media media-latest">
                <%
                    if (videos != null) {
                        for (int i = 0; i < videos.size(); i++) {
                            if (videos.get(i) != null) {
                %>
                <li class='video video-13' id='media-165'>
                    <div class='mediathumb'>
                        <a href="myvideo.jsp?video=<%=videos.get(i).getId()%>" 
                           title='<%=videos.get(i).getTitle()%>'>
                            <span class='mediabg' 
                                  style="background-image:url('http://img.youtube.com/vi/<%=videos.get(i).getUrl().split("v=")[1] + "/0.jpg"%>')"> 
                            </span>

                        </a>                  	                  
                    </div> 
                    <div class='mediainfo' >
                        <h4>
                            <a href="myvideo.jsp?video=<%=videos.get(i).getId()%>" 
                               title='<%=videos.get(i).getTitle()%>' class='medialink'>
                                <%=videos.get(i).getTitle()%></a>
                        </h4>                               
                    </div>
                </li>
                <%                                            }
                        }
                    }
                %>
                <div google-adsense></div>

            </ul>  
            <div class="panel-body" >
                <ul class="pagination pagination-sm">     
                    <%
                        int count = RestfulClient.getVideosSize(categoryId, search);
                        if (count > 16) {
                            count = count / 16;
                        } else {
                            count = 1;
                        }

                        for (int i = 0; i < count; i++) {
                    %>
                    <li  style='display:inline-block;margin-left:2px'>

                        <a  style="background-color:<%=i == begin ? "#f8cb1c" : ""%>" 
                            href="index.jsp?begin=<%=i%>&end=<%=i + 16%>&categoryId=<%=categoryId%>" 
                            style="cursor:pointer;">
                            <%=i + 1%>
                        </a> 
                    </li>
                    <%
                        }
                    %>
                </ul>
            </div>
        </div>
        <jsp:include page="footer.jsp" />
    </body>
</html>
