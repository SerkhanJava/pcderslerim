<%-- 
    Document   : index
    Created on : Nov 8, 2015, 7:30:15 PM
    Author     : Afgan Rasulov
--%>
<%@page import="dto.CustomCategoryDTO"%>
<%@page import="dto.CategoryDTO"%>
<%@page import="util.RestfulClient"%>
<%@page import="dto.VideoDTO"%>
<%@page import="util.Util"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.List"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="java.util.Map"%>
<%@page import="java.util.HashMap"%>
<jsp:include page="header.jsp" />
 
</div>
<!-- HEADER END-->


<!-- SLIDER BEGIN -->
<div id="slider">
    <ul class="bxslider">
        <li style="background: url('assets/img/s1.jpg');"></li>
        <li style="background: url('assets/img/s2.jpg');"></li>
        <li style="background: url('assets/img/s3.jpg');"></li>
    </ul>
    <%
        Map<Integer, List<String>> kelimeler = new HashMap<Integer, List<String>>();

        //kelime1
        List<String> kelimeler1 = new ArrayList<String>();
        kelimeler1.add("PCDERSLERIM ailesine hoş geldiniz!");
        kelimeler1.add("Ücretsiz Eğitimlerimizle hizmetinizdeyiz...");
        kelimeler.put(0, kelimeler1);

        //kelime1
        List<String> kelimeler2 = new ArrayList<String>();
        kelimeler2.add("Yeni başlangıç için doğru adrestesiniz");
        kelimeler2.add("Ücretsiz Eğitimlerimizle hizmetinizdeyiz...");
        kelimeler.put(1, kelimeler2);

        //kelime1
        List<String> kelimeler3 = new ArrayList<String>();
        kelimeler3.add("PCDERSLERIM kalitesiyle, Photoshop eğitim setleri");
        kelimeler3.add("Ücretsiz Eğitimlerimizle hizmetinizdeyiz...");
        kelimeler.put(2, kelimeler3);

        //kelime1
        List<String> kelimeler4 = new ArrayList<String>();
        kelimeler4.add("Her düzeye uygun eğitim setleri.PCDERSLERIM kalitesiyle");
        kelimeler4.add("Ücretsiz Eğitimlerimizle hizmetinizdeyiz...");
        kelimeler.put(3, kelimeler4);

        Integer number = Util.randInt(0, 3);

    %>

    <div class="main">
        <div class="container">
            <h3><%=kelimeler.get(number).get(0)%></h3>
            <h5><%=kelimeler.get(number).get(1)%></h5>

<!--            <ul class="boxes mtop40">
                <li class="b1">
                    <div class="front"></div>
                    <div class="back"></div>
                </li>
                <li class="b2">
                    <div class="front"></div>
                    <div class="back">Ücretsiz Eğitimlerimizle hizmetinizdeyiz...</div>
                </li>
                <li class="b3">
                    <div class="front"></div>
                    <div class="back">Ücretsiz Eğitimlerimizle hizmetinizdeyiz...</div>
                </li>
                <li class="b4">
                    <div class="front">Salam</div>
                    <div class="back">Ücretsiz Eğitimlerimizle hizmetinizdeyiz...</div>
                </li>
                <li class="b5">
                    <div class="front">Salam</div>
                    <div class="back">Ücretsiz Eğitimlerimizle hizmetinizdeyiz...</div>
                </li>
            </ul>-->

<!--            <ul class="boxes">
                <li class="b6">
                    <div class="front">Salam</div>
                    <div class="back">Sagol</div>
                </li>
                <li class="b7">
                    <div class="front">Salam</div>
                    <div class="back">Sagol</div>
                </li>
                <li class="b8">
                    <div class="front">Salam</div>
                    <div class="back">Sagol</div>
                </li>
                <li class="b9">
                    <div class="front">Salam</div>
                    <div class="back">Sagol</div>
                </li>
                <li class="b10">
                    <div class="front">Salam</div>
                    <div class="back">Sagol</div>
                </li>
            </ul>-->
        </div>
    </div>
</div>
<!-- SLIDER END -->


<!-- RECENT BEGIN -->
<%            int totalVideosSize = RestfulClient.getVideosSize(0, null);
    List<VideoDTO> randomVideos = RestfulClient.getVideos(0, totalVideosSize, 0, null);
    totalVideosSize = randomVideos.size() - 1;
    int randomVideo1 = Util.randInt(0, totalVideosSize * 1 / 4);
    int randomVideo2 = Util.randInt(totalVideosSize * 1 / 4, totalVideosSize * 2 / 4);
    int randomVideo3 = Util.randInt(totalVideosSize * 2 / 4, totalVideosSize * 3 / 4);
    int randomVideo4 = Util.randInt(totalVideosSize * 3 / 4, totalVideosSize * 4 / 4);
%>
<ul class="catalogue main mtop60">
    <li class="first">
        <a href="course.jsp?categoryid=<%=randomVideos.get(randomVideo1).getCategoryStr() %>&videoid=<%=randomVideos.get(randomVideo1).getId()%>">
            <img src="http://img.youtube.com/vi/<%=randomVideos.get(randomVideo1).getUrl().split("v=")[1] + "/0.jpg"%>" alt="">
            <span class="title"><%=randomVideos.get(randomVideo1).getTitle()%></span>
        </a>
    </li>
    <li class="second">
        <a href="course.jsp?categoryid=<%=randomVideos.get(randomVideo2).getCategoryStr() %>&videoid=<%=randomVideos.get(randomVideo2).getId()%>">
            <img src="http://img.youtube.com/vi/<%=randomVideos.get(randomVideo2).getUrl().split("v=")[1] + "/0.jpg"%>" alt="">
            <span class="title"><%=randomVideos.get(randomVideo2).getTitle()%></span>
        </a>
    </li>
    <li class="double">
        <ul>
            <li class="mtop0">
                <a href="course.jsp?categoryid=<%=randomVideos.get(randomVideo3).getCategoryStr() %>&videoid=<%=randomVideos.get(randomVideo3).getId()%>">
                    <img src="http://img.youtube.com/vi/<%=randomVideos.get(randomVideo3).getUrl().split("v=")[1] + "/0.jpg"%>" alt="">
                    <span class="title"><%=randomVideos.get(randomVideo3).getTitle()%></span>
                </a>
            </li>
            <li>
                <a href="course.jsp?categoryid=<%=randomVideos.get(randomVideo4).getCategoryStr() %>&videoid=<%=randomVideos.get(randomVideo4).getId()%>">
                    <img src="http://img.youtube.com/vi/<%=randomVideos.get(randomVideo4).getUrl().split("v=")[1] + "/0.jpg"%>" alt="">
                    <span class="title"><%=randomVideos.get(randomVideo4).getTitle()%></span>
                </a>
            </li>
        </ul>
    </li>
</ul>
<!-- RECENT END -->


<!-- MESSAGE BEGIN -->
<div class="message main mtop60">
    <h3>Kendini geliştirmek istediğin alanı seç, <b>ücrestsiz</b> eğitime başla</h3>
    <h5>Video anlatımlarıyla uzmanlardan ücretsiz eğitim al, kendine yeni bir şeyler katmaya hemen başla.</h5>
</div>
<!-- MESSAGE END -->

<%
    List<CustomCategoryDTO> allCategories = RestfulClient.getCustomCategoriesOfCategory(39);
    int randomCategory1 = Util.randInt(0, allCategories.size() * 1 / 6);
    int randomCategory2 = Util.randInt(allCategories.size() * 1 / 6, allCategories.size() * 2 / 6);
    int randomCategory3 = Util.randInt(allCategories.size() * 2 / 6, allCategories.size() * 3 / 6);
    int randomCategory4 = Util.randInt(allCategories.size() * 3 / 6, allCategories.size() * 4 / 6);
    int randomCategory5 = Util.randInt(allCategories.size() * 4 / 6, allCategories.size() * 5 / 6);
    int randomCategory6 = Util.randInt(allCategories.size() * 5 / 6, allCategories.size() - 1 * 6 / 6);

    List<VideoDTO> videos1 = RestfulClient.getVideos(0, 6, randomCategory1, null);

%>
<!-- FILTER BEGIN -->
<div class="main mtop60">
    <ul class="category">
        <li ><a href="category.jsp?begin=0&end=10&categoryid=39&categoryid2=<%=allCategories.get(randomCategory1).getCategoryId2().getId()%>"><%=allCategories.get(randomCategory1).getCategoryId2().getType()%></a></li>
        <li ><a href="category.jsp?begin=0&end=10&categoryid=39&categoryid2=<%=allCategories.get(randomCategory2).getCategoryId2().getId()%>"><%=allCategories.get(randomCategory2).getCategoryId2().getType()%></a></li>
        <li ><a href="category.jsp?begin=0&end=10&categoryid=39&categoryid2=<%=allCategories.get(randomCategory3).getCategoryId2().getId()%>"><%=allCategories.get(randomCategory3).getCategoryId2().getType()%></a></li>
        <li ><a href="category.jsp?begin=0&end=10&categoryid=39&categoryid2=<%=allCategories.get(randomCategory4).getCategoryId2().getId()%>"><%=allCategories.get(randomCategory4).getCategoryId2().getType()%></a></li>
        <li ><a href="category.jsp?begin=0&end=10&categoryid=39&categoryid2=<%=allCategories.get(randomCategory5).getCategoryId2().getId()%>"><%=allCategories.get(randomCategory5).getCategoryId2().getType()%></a></li>
        <li ><a href="category.jsp?begin=0&end=10&categoryid=39&categoryid2=<%=allCategories.get(randomCategory6).getCategoryId2().getId()%>"><%=allCategories.get(randomCategory6).getCategoryId2().getType()%></a></li>
    </ul>
</div>
<div>
    <ul class="catalogue main mtop20">
        <li class="first">
            <a href="course.jsp?categoryid=<%=videos1.get(0).getCategoryStr()%>&videoid=<%=videos1.get(0).getId()%>" >
                <img src="http://img.youtube.com/vi/<%=videos1.get(0).getUrl().split("v=")[1] + "/0.jpg"%>" alt="">
                <span class="title"><%=videos1.get(0).getTitle()%></span>
            </a>
        </li>
        <li class="second">
            <a href="#">
                <img src="assets/img/slide1.jpg" alt="">
            </a>
        </li>
        <li>
            <a href="#">
                <img src="assets/img/slide2.jpg" alt="">
            </a>
        </li>
    </ul>

    <ul class="catalogue main">
        <li class="first">
            <a href="course.jsp?categoryid=<%=videos1.get(0).getCategoryStr()%>&videoid=<%=videos1.get(0).getId()%>">
                <img src="http://img.youtube.com/vi/<%=videos1.get(1).getUrl().split("v=")[1] + "/0.jpg"%>" alt="">
                <span class="title"><%=videos1.get(1).getTitle()%></span>
            </a>
        </li>
        <li class="second">
            <a href="course.jsp?categoryid=<%=videos1.get(1).getCategoryStr()%>&videoid=<%=videos1.get(1).getId()%>">
                <img src="http://img.youtube.com/vi/<%=videos1.get(2).getUrl().split("v=")[1] + "/0.jpg"%>" alt="">
                <span class="title"><%=videos1.get(2).getTitle()%></span>
            </a>
        </li>
        <li class="double">
            <ul>
                <li class="mtop0">
                    <a href="course.jsp?categoryid=<%=videos1.get(2).getId()%>&videoid=<%=videos1.get(2).getId() %>">
                        <img src="http://img.youtube.com/vi/<%=videos1.get(3).getUrl().split("v=")[1] + "/0.jpg"%>" alt="">
                        <span class="title"><%=videos1.get(3).getTitle()%></span>
                    </a>
                </li>
                <li>
                    <a href="course.jsp?categoryid=<%=videos1.get(3).getId()%>&videoid=<%=videos1.get(3).getId()%>">
                        <img src="http://img.youtube.com/vi/<%=videos1.get(4).getUrl().split("v=")[1] + "/0.jpg"%>" alt="">
                        <span class="title"><%=videos1.get(4).getTitle()%></span>
                    </a>
                </li>
            </ul>
        </li>
    </ul>
</div>


<div class="main center mtop20">
    <form action="category.jsp" method="GET">
        <input type="submit" class="btn blue" value="Tüm Kateqorilere Bakın">
        <input type="hidden" name="begin" value="0"/>
        <input type="hidden" name="end" value="10"/>
        <input type="hidden" name="categoryid" value="39"/>
    </form>
</div>
<!-- FILTER END -->


<!-- CATEGORY BEGIN -->
<!--        <h3 class="main mtop60 center">Hər ay yüzlərlə pulsuz <b>vektor, banner, psd</b> yaradırıq</h3>
        <ul class="catalogue main mtop20">
            <li class="first">
                <a href="#">
                    <img src="assets/img/1.jpg" alt="">
                    <span class="title">Online Minecraft 3D Yazı Yazma </span>
                </a>
            </li>
            <li class="second">
                <a href="#">
                    <img src="assets/img/2.jpg" alt="">
                    <span class="title">Webtekno Online Kafa Topu Metin Efekti Eğitimi [Photoshop Dersleri]</span>
                </a>
            </li>
            <li class="double">
                <ul>
                    <li class="mtop0">
                        <a href="#">
                            <img src="assets/img/3.jpg" alt="">
                            <span class="title">Ücretsiz Online Logo Yapımı Eğitimi 16/22</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <img src="assets/img/4.jpg" alt="">
                            <span class="title">Ücretsiz Online Logo Yapımı Eğitimi 17/22</span>
                        </a>
                    </li>
                </ul>
            </li>
        </ul>-->
<!--        <div class="main center mtop20">
            <button class="btn blue">Tüm Kateqorilere Bakın</button>
        </div>-->
<!-- CATEGORY END -->


<!--         BLOG BEGIN 
        <h3 class="main mtop60 center">Yeni <b>blog</b> yazıları</h3>
        <ul class="catalogue main mtop20">
            <li class="first">
                <a href="#">
                    <img src="assets/img/1.jpg" alt="">
                    <span class="title">Online Minecraft 3D Yazı Yazma </span>
                </a>
            </li>
            <li class="second">
                <a href="#">
                    <img src="assets/img/2.jpg" alt="">
                    <span class="title">Webtekno Online Kafa Topu Metin Efekti Eğitimi [Photoshop Dersleri]</span>
                </a>
            </li>
            <li class="double">
                <ul>
                    <li class="mtop0">
                        <a href="#">
                            <img src="assets/img/3.jpg" alt="">
                            <span class="title">Ücretsiz Online Logo Yapımı Eğitimi 16/22</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <img src="assets/img/4.jpg" alt="">
                            <span class="title">Ücretsiz Online Logo Yapımı Eğitimi 17/22</span>
                        </a>
                    </li>
                </ul>
            </li>
        </ul>
        <div class="main center mtop20">
            <button class="btn blue">Bloga git</button>
        </div>
         BLOG END -->

<jsp:include page="footer.jsp" />
