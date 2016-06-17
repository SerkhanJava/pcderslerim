<%-- 
    Document   : footer
    Created on : Dec 13, 2015, 5:09:49 PM
    Author     : Sarkhan Rasullu
--%>

<%@page import="dto.CustomCategoryDTO"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="dto.CategoryDTO"%>
<%@page import="util.RestfulClient"%>
<%@page import="dto.VideoDTO"%>
<%@page import="util.Util"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.List"%>
<%@page import="java.util.Map"%>
<%@page import="java.util.HashMap"%>
<!-- FOOTER BEGIN -->
<div id="footer" class="mtop60">
    <div class="links">
        <div class="main">
            <div class="item">
                <h3 class="title">Hakkımızda</h3>
                <ul>
                    <li><a href="#">Hakkımızda</a></li>
                </ul>
            </div>
            <div class="item">
                <h3 class="title">Kateqoriler</h3>
                <ul>

                    <%
                        List<CustomCategoryDTO> allCategories = RestfulClient.getCustomCategoriesOfCategory(40);
                        int randomCategory1 = Util.randInt(0, allCategories.size() * 1 / 6);
                        int randomCategory2 = Util.randInt(allCategories.size() * 1 / 6, allCategories.size() * 2 / 6);
                        int randomCategory3 = Util.randInt(allCategories.size() * 2 / 6, allCategories.size() * 3 / 6);
                        int randomCategory4 = Util.randInt(allCategories.size() * 3 / 6, allCategories.size() * 4 / 6);
                        int randomCategory5 = Util.randInt(allCategories.size() * 4 / 6, allCategories.size() * 5 / 6);
                        int randomCategory6 = Util.randInt(allCategories.size() * 5 / 6, allCategories.size() - 1 * 6 / 6);

                        List<VideoDTO> videos1 = RestfulClient.getVideos(0, 6, randomCategory1, null);

                        int headerRandomCategory1 = Util.randInt(0, allCategories.size() - 1);
                        int headerRandomCategory2 = Util.randInt(0, allCategories.size() - 1);
                        int headerRandomCategory3 = Util.randInt(0, allCategories.size() - 1);
                        int headerRandomCategory4 = Util.randInt(0, allCategories.size() - 1);
                        int headerRandomCategory5 = Util.randInt(0, allCategories.size() - 1);
                        int headerRandomCategory6 = Util.randInt(0, allCategories.size() - 1);
                    %>

                    <li><a href="category.jsp?categoryid=<%=allCategories.get(headerRandomCategory1).getId()%>"><%= allCategories.get(headerRandomCategory1).getCategoryId2().getType()%></a></li>
                    <li><a href="category.jsp?categoryid=<%=allCategories.get(headerRandomCategory2).getId()%>"><%= allCategories.get(headerRandomCategory2).getCategoryId2().getType()%></a></li>
                    <li><a href="category.jsp?categoryid=<%=allCategories.get(headerRandomCategory3).getId()%>"><%= allCategories.get(headerRandomCategory3).getCategoryId2().getType()%></a></li>
                    <li><a href="category.jsp?categoryid=<%=allCategories.get(headerRandomCategory4).getId()%>"><%= allCategories.get(headerRandomCategory4).getCategoryId2().getType()%></a></li>
                    <li><a href="category.jsp?categoryid=<%=allCategories.get(headerRandomCategory5).getId()%>"><%= allCategories.get(headerRandomCategory5).getCategoryId2().getType()%></a></li>
                    <li><a href="category.jsp?categoryid=<%=allCategories.get(headerRandomCategory6).getId()%>"><%= allCategories.get(headerRandomCategory6).getCategoryId2().getType()%></a></li>
                </ul>
            </div>
            <div class="item">
                <h3 class="title">Uygulamalarımız</h3>
                <ul>
                    <li><a href="#">OBS</a></li>
                </ul>
            </div>
            <div class="item connect">
                <h3 class="title">İrtibat</h3>
                <ul>
                    <li><a href="#"><i class="fa fa-rss"></i></a></li>
                    <li><a href="#"><i class="fa fa-envelope"></i></a></li>
                    <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                </ul>
            </div>
        </div>
    </div>
    <div class="copyright">
        <div class="main">
            <ul>
                <li>© 2015 PC Derslerim</li>
                <!--                        <li><a href="#">Site Map</a></li>
                                        <li><a href="#">Partner Program</a></li>
                                        <li><a href="#">Privacy Policy</a></li>
                                        <li><a href="#">Website Use Policy</a></li>-->
            </ul>
            <a href="#"><img src="assets/img/logo.png" class="logo" alt="logo"></a>
            <br class="clear">
        </div>
    </div>
</div>
<!-- FOOTER END -->


<script src="assets/js/jquery.min.js"></script>
<script src="assets/js/jquery.bxslider.js"></script>
<script>
    $('.bxslider').bxSlider({
        mode: 'fade',
        pager: false,
        auto: true,
        speed: 2000,
        pause: 5000
    });
</script>
<script>
    $("#cat1").on("mouseover", function () {
        $(".menu .sub div").removeClass("show");
        $(".menu ul.cats li a").removeClass("active");
        $("#cat1 a").addClass("active");
        $("#sub1").addClass("show");
    });
    $("#cat2").on("mouseover", function () {
        $(".menu .sub div").removeClass("show");
        $(".menu ul.cats li a").removeClass("active");
        $("#cat2 a").addClass("active");
        $("#sub2").addClass("show");
    });
    $("#cat3").on("mouseover", function () {
        $(".menu .sub div").removeClass("show");
        $(".menu ul.cats li a").removeClass("active");
        $("#cat3 a").addClass("active");
        $("#sub3").addClass("show");
    });
</script>


</body>
</html>