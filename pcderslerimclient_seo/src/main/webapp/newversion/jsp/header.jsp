<%@page import="java.util.ArrayList"%>
<%@page import="dto.CategoryDTO"%>
<%@page import="dto.VideoDTO"%>
<%@page import="util.RestfulClient"%>
<%@page import="java.util.List"%>
<%@page import="dto.CustomCategoryDTO"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!Doctype HTML>
<html>
    <head>
        <title>PC Derslerim</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <link href="assets/css/style.css" rel="stylesheet" type="text/css"/>
        <link href="assets/css/class.css" rel="stylesheet" type="text/css"/>
        <link href="assets/css/jquery.bxslider.css" rel="stylesheet" type="text/css"/>
        <link href="assets/font/lyndacon/lyndacon.css" rel="stylesheet" type="text/css"/>
        <link href="assets/font/font-awesome-4.4.0/css/font-awesome.css" rel="stylesheet" type="text/css"/>
    </head>
    <body>


        <!-- HEADER BEGIN -->
        <div id="header">
            <div class="top">
                <div class="main">
                    <ul class="left">
                        <li><a href="index.jsp"><img src="assets/img/logo.png" alt="logo"></a></li>
                        <li>
                            <a href="#" class="white">Kütüphane<i class="fa fa-angle-down"></i></a>
                            <div class="menu">
                                <div class="arrow"></div>
                                <div class="shadow">
                                    <%
                                        //here we get all subcategories of library
                                        List<CustomCategoryDTO> customCategoriesOfLibrary = RestfulClient.getCustomCategoriesOfCategory(23);
                                    %>
                                    <ul class="cats">
                                        <%for (int i = 0; i < customCategoriesOfLibrary.size(); i++) {%>
                                        <li id="cat<%=i + 1%>"><a href="#"><i class="lyndacon cat-88 category-icons"></i>
                                                <%=customCategoriesOfLibrary.get(i).getCategoryId2().getType()%>
                                            </a></li>
                                            <%}%>
                                    </ul>
                                    <div class="sub">
                                        <%for (int i = 0; i < customCategoriesOfLibrary.size(); i++) {%>
                                        <div id="sub<%=i + 1%>">
                                            <%
                                                List<CustomCategoryDTO> customCategoriesOfLibrary2
                                                        = RestfulClient.getCustomCategoriesOfCategory(
                                                                customCategoriesOfLibrary.get(i).getCategoryId2().getId()
                                                        );

                                                for (int j = 0; j < customCategoriesOfLibrary2.size(); j++) {
                                            %>
                                            <ul>
                                                <li class="title">
                                                    <%
                                                        String title = customCategoriesOfLibrary2.get(j).getCategoryId2().getType();
                                                        title = title.split("_").length == 2 ? title.split("_")[1] : title;
                                                        out.println(title);
                                                    %>
                                                </li>
                                                <%
                                                    List<CustomCategoryDTO> customCategoriesOfLibrary3
                                                            = RestfulClient.getCustomCategoriesOfCategory(
                                                                    customCategoriesOfLibrary2.get(j).getCategoryId2().getId()
                                                            );

                                                    for (int k = 0; k < customCategoriesOfLibrary3.size(); k++) {
                                                %>
                                                <li><a href="category.jsp?begin=0&end=10&categoryid=<%=customCategoriesOfLibrary3.get(j).getCategoryId2().getId()%>"><%=customCategoriesOfLibrary3.get(k).getCategoryId2().getType()%></a></li>
                                                    <%}%>
                                                <li><a href="category.jsp?begin=0&end=10&categoryid=<%=customCategoriesOfLibrary2.get(j).getCategoryId2().getId()%>" class="all">Hepsi</a></li>
                                            </ul>
                                            <%}%>
                                            <br class="clear">
                                            <ul class="full">
<!--                                                <li class="title">Resources</li>
                                                <li><a href="#">Articles from our experts</a></li>-->
                                            </ul>
                                        </div>
                                        <%}%>

                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <a href="#" class="white">Uygulamalar<i class="fa fa-angle-down"></i></a>
                            <div class="submenu">
                                <div class="arrow"></div>
                                <ul>
                                    <li><a href="../../obs.html">OBS</a></li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                    <ul class="right">
<!--                        <li><a href="#" class="white">Üye Girişi</a></li>
                        <li><a href="#" class="btnsmall ltblue">Üye ol</a></li>-->
                    </ul>
                    <ul class="right">
                        <li>
                            <div style="width: 390px;
                                 margin-top: -14px;" >
                                <script>
                                    (function () {
                                        var cx = '013094207155027936339:uoisijbgmbg';
                                        var gcse = document.createElement('script');
                                        gcse.type = 'text/javascript';
                                        gcse.async = true;
                                        gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') +
                                                '//cse.google.com/cse.js?cx=' + cx;
                                        var s = document.getElementsByTagName('script')[0];
                                        s.parentNode.insertBefore(gcse, s);
                                    })();
                                </script>
                                <gcse:search></gcse:search>
                                <!--<input type="text" placeholder="Arama">-->
                                <!--<button><i class="fa fa-search"></i></button>-->
                            </div>
                        </li>
                    </ul>

                    <br class="clear">
                </div>
            </div>
            <div class="bottom">
                <div class="main">
<!--                    <ul class="left">
                        <li><a href="#">Start A Free Trial</a></li>
                        <li><a href="#">Reactivate</a></li>
                    </ul>
                    <ul class="right">
                        <li>Solutions for:</li>
                        <li>
                            <a href="#">Business<i class="fa fa-angle-down"></i></a>
                            <div class="submenu">
                                <div class="arrow"></div>
                                <ul>
                                    <li><a href="#">Small Business</a></li>
                                    <li><a href="#">Mid Market</a></li>
                                    <li><a href="#">Fortune 1000</a></li>
                                    <li><a href="#">Non Profit</a></li>
                                </ul>
                            </div>
                        </li>
                        <li><a href="#">Academic<i class="fa fa-angle-down"></i></a></li>
                        <li><a href="#">Government<i class="fa fa-angle-down"></i></a></li>
                    </ul>-->
                    <br class="clear">
                </div>
            </div>
        </div>
