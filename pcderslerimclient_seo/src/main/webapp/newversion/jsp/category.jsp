<%-- 
    Document   : category
    Created on : Nov 8, 2015, 7:30:47 PM
    Author     : Afgan Rasulov
--%>

<%@page import="dto.VideoDTO"%>
<%@page import="util.RestfulClient"%>
<%@page import="dto.CustomCategoryDTO"%>
<%@page import="java.util.List"%>
<jsp:include page="header.jsp" />
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<!-- HEADER END-->


<!-- MESSAGE BEGIN -->
<!--        <div class="message main mtop60 p30 taleft">
            <h3>Design Training + Tutorials</h3>
            <h4>
                Whether you want to design a logo, create ebooks, or just learn how to use a Pen tool,
                our in-depth design tutorials can help. Get to know Illustrator and InDesign, explore
                typography, and learn the nuances of designing for print.
            </h4>
        </div>-->
<!-- MESSAGE END -->


<!-- TOP NEWS SLIDER BEGIN -->
<!--        <div id="topnews" class="main mtop40">
            <ul class="bxslider">
                <li style="background: url('assets/img/slide1.jpg')">
                    <div class="caption">
                        <span class="title">Inspired Learning. Inspired Stories.</span>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vitae risus blandit,
                            faucibus tellus sed, bibendum orci. Aenean nisl turpis, bibendum vitae eleifend sed,
                            vehicula quis ipsum. Etiam ultricies leo id iaculis hendrerit. Fusce tempus turpis
                            nibh, eget bibendum mi dignissim ut. Nunc a enim urna. Ut varius ac magna nec finibus.
                            Phasellus non condimentum metus. Sed non dui bibendum metus consectetur vestibulum.
                        </p>
                        <div><a href="#" class="btnsmall ltblue mtop20">Explore Now</a></div>
                    </div>
                </li>
                <li style="background: url('assets/img/slide2.jpg')">
                    <div class="caption">
                        <span class="title">Learn graphic design</span>
                        <p>
                            Have you ever wanted to design a logo, magazine, poster, or even a website? Explore
                            our in-depth collection of design courses to learn these topics, and much much more.
                        </p>
                        <div><a href="#" class="btnsmall ltblue mtop20">Explore Now</a></div>
                    </div>
                </li>
            </ul>
            <div class="controls">
                <i onclick="slider.goToNextSlide();" class="fa fa-chevron-left"></i>
                <i onclick="slider.goToPrevSlide();" class="fa fa-chevron-right"></i>
            </div>
        </div>-->
<!-- TOP NEWS SLIDER END -->


<!-- BLUE MESSAGE BEGIN -->
<!--        <div class="message bluems main mtop40 p30 taleft">
            <h4>
                <b>Try our Design tutorials</b> — every online course includes free video tutorials.Become
                a member to keep learning, with unlimited access to every course in our library.
            </h4>
        </div>-->
<!-- BLUE MESSAGE END -->


<!-- POD BEGIN -->
<!--        <div class="pod main mtop40">
            <ul>
                <li>
                    <a href="#">
                        <img src="assets/img/pod1.jpg">
                        <div><span>Learn the foundations: Layout and composition</span></div>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <img src="assets/img/pod2.jpg">
                        <div><span>Let typography bring power and impact to your designs</span></div>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <img src="assets/img/pod3.jpg">
                        <div><span>Use color for effective designs that tell a story</span></div>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <img src="assets/img/pod4.jpg">
                        <div><span>Get insights on logo design from Von Glitschka</span></div>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <img src="assets/img/pod2.jpg">
                        <div><span>Let typography bring power and impact to your designs</span></div>
                    </a>
                </li>
            </ul>
        </div>-->
<!-- POD END -->


<!-- LESSONS BEGIN -->
<%
    int selectedCategoryId = Integer.parseInt(request.getParameter("categoryid"));
    List<CustomCategoryDTO> customCategoriesOfLibrary = RestfulClient.getCustomCategoriesOfCategory(selectedCategoryId);
    int selectedCategoryId2 = 1;
    if (request.getParameter("categoryid2") != null) {
        selectedCategoryId2 = Integer.parseInt(request.getParameter("categoryid2"));
    }
%>
<div id="lessons" class="main mtop40">
    <div class="left">
        <%for (int i = 0; i < customCategoriesOfLibrary.size(); i++) {%>
        <ul <%=i > 0 ? "class=\"mtop20\"" : ""%>>
            <li><b><%= customCategoriesOfLibrary.get(i).getCategoryId2().getType()%></b></li>
                    <%
                        List<CustomCategoryDTO> customCategoriesOfLibrary2 = RestfulClient.getCustomCategoriesOfCategory(
                                customCategoriesOfLibrary.get(i).getCategoryId2().getId()
                        );
                        for (int j = 0; j < customCategoriesOfLibrary2.size(); j++) {
                    %>
            <li><a href="category.jsp?begin=0&end=10&categoryid=<%=selectedCategoryId%>&categoryid2=<%=customCategoriesOfLibrary2.get(j).getCategoryId2().getId()%>"><%=customCategoriesOfLibrary2.get(j).getCategoryId2().getType()%> <span></span></a></li>
                <%}%>
        </ul>
        <%}%>
    </div>
    <div class="right">
        <!--                <div class="tabs">
                            <ul id="tabli" class="header">
                                <li class="active"><span>Editor's pick</span></li>
                                <li ><span>Most popular courses</span></li>
                                <li ><span>Documentaries</span></li>
                            </ul>
                            <div class="container">
                                <ul id="tabcon">
                                    <li class="active">
                                        <ul>
                                            <li>
                                                <div class="thumb">
                                                    <a href="#" class="play"></a>
                                                    <img src="assets/img/tab1.jpg" alt="">
                                                </div>
                                                <div class="info">
                                                    <span>updated 09/12/2014</span>
                                                    <a href="#">Pixel Playground</a>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="thumb">
                                                    <a href="#" class="play"></a>
                                                    <img src="assets/img/tab2.jpg" alt="">
                                                </div>
                                                <div class="info">
                                                    <span>17/02/2013</span>
                                                    <a href="#">Insight on Illustrative Design</a>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="thumb">
                                                    <a href="#" class="play"></a>
                                                    <img src="assets/img/tab3.jpg" alt="">
                                                </div>
                                                <div class="info">
                                                    <span>updated 11/06/2014</span>
                                                    <a href="#">Designing a Portfolio Website with Muse</a>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="thumb">
                                                    <a href="#" class="play"></a>
                                                    <img src="assets/img/tab4.jpg" alt="">
                                                </div>
                                                <div class="info">
                                                    <span>updated 25/10/2014</span>
                                                    <a href="#">Before & After: Graphic Design Techniques</a>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="thumb">
                                                    <a href="#" class="play"></a>
                                                    <img src="assets/img/tab5.jpg" alt="">
                                                </div>
                                                <div class="info">
                                                    <span>21/07/2015</span>
                                                    <a href="#">Designing a Logo</a>
                                                </div>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <ul>
                                            <li>
                                                <div class="thumb">
                                                    <a href="#" class="play"></a>
                                                    <img src="assets/img/tab1.jpg" alt="">
                                                </div>
                                                <div class="info">
                                                    <span>updated 09/12/2014</span>
                                                    <a href="#">2 Pixel Playground</a>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="thumb">
                                                    <a href="#" class="play"></a>
                                                    <img src="assets/img/tab2.jpg" alt="">
                                                </div>
                                                <div class="info">
                                                    <span>17/02/2013</span>
                                                    <a href="#">Insight on Illustrative Design</a>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="thumb">
                                                    <a href="#" class="play"></a>
                                                    <img src="assets/img/tab3.jpg" alt="">
                                                </div>
                                                <div class="info">
                                                    <span>updated 11/06/2014</span>
                                                    <a href="#">Designing a Portfolio Website with Muse</a>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="thumb">
                                                    <a href="#" class="play"></a>
                                                    <img src="assets/img/tab4.jpg" alt="">
                                                </div>
                                                <div class="info">
                                                    <span>updated 25/10/2014</span>
                                                    <a href="#">Before & After: Graphic Design Techniques</a>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="thumb">
                                                    <a href="#" class="play"></a>
                                                    <img src="assets/img/tab5.jpg" alt="">
                                                </div>
                                                <div class="info">
                                                    <span>21/07/2015</span>
                                                    <a href="#">Designing a Logo</a>
                                                </div>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <ul>
                                            <li>
                                                <div class="thumb">
                                                    <a href="#" class="play"></a>
                                                    <img src="assets/img/tab1.jpg" alt="">
                                                </div>
                                                <div class="info">
                                                    <span>updated 09/12/2014</span>
                                                    <a href="#">3 Pixel Playground</a>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="thumb">
                                                    <a href="#" class="play"></a>
                                                    <img src="assets/img/tab2.jpg" alt="">
                                                </div>
                                                <div class="info">
                                                    <span>17/02/2013</span>
                                                    <a href="#">Insight on Illustrative Design</a>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="thumb">
                                                    <a href="#" class="play"></a>
                                                    <img src="assets/img/tab3.jpg" alt="">
                                                </div>
                                                <div class="info">
                                                    <span>updated 11/06/2014</span>
                                                    <a href="#">Designing a Portfolio Website with Muse</a>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="thumb">
                                                    <a href="#" class="play"></a>
                                                    <img src="assets/img/tab4.jpg" alt="">
                                                </div>
                                                <div class="info">
                                                    <span>updated 25/10/2014</span>
                                                    <a href="#">Before & After: Graphic Design Techniques</a>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="thumb">
                                                    <a href="#" class="play"></a>
                                                    <img src="assets/img/tab5.jpg" alt="">
                                                </div>
                                                <div class="info">
                                                    <span>21/07/2015</span>
                                                    <a href="#">Designing a Logo</a>
                                                </div>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>-->
        <%
            int size = RestfulClient.getVideosSize(selectedCategoryId2, null);
            int begin = Integer.parseInt(request.getParameter("begin"));
            int end = begin + 10;
        %>
        <div class="listhead mtop40">
            <span class="info"><%=size%> video ders : <%=begin%>-<%=end%></span>
            <!--                    <div class="sort">
                                    <label for="sort">sort by:</label>
                                    <select id="sort">
                                        <option>release date (newest first)</option>
                                        <option>release date (oldest first)</option>
                                        <option>course title (a-z)</option>
                                        <option>course title (z-a)</option>
                                    </select>
                                </div>-->
            <br class="clear">
        </div>
        <ul class="list">
            <%
                String search = request.getParameter("search");
                List<VideoDTO> videosOfThisCategory = RestfulClient.getVideos(begin, end, selectedCategoryId2, search);
            %>

            <%
                for (int i = 0; i < videosOfThisCategory.size(); i++) {
            %>
            <li>
                <div class="thumb">
                    <a href="#" class="play"></a>
                    <img src="http://img.youtube.com/vi/<%=videosOfThisCategory.get(i).getUrl().split("v=")[1] + "/0.jpg"%>" alt="">
                </div>
                <div class="info">
                    <a href="#"><%=videosOfThisCategory.get(i).getTitle()%></a>
                    <span class="author">with David Blatner</span>
                    <p class="text">
                        <%=videosOfThisCategory.get(i).getDescription()%>
                    </p>
                    <!--                            <ul class="detail">
                                                    <li><span>19h 2m</span></li>
                                                    <li>
                                                        <img src="assets/img/level2.png" alt="">
                                                        <span>Intermediate</span>
                                                    </li>
                                                    <li><img src="assets/img/cc.png" alt=""></li>
                                                    <li><span>Viewers: 97,882</span></li>
                                                </ul>-->
                </div>
                <br class="clear">
            </li> 
            <%}%>
        </ul>
        <%
            if (size > end) {
        %>
        <form action="category.jsp" method="GET" >
            <input type="hidden" name="begin" value="<%=end%>">
            <input type="hidden" name="end" value="<%=end + 10%>">
            <input type="hidden" name="categoryid" value="<%=selectedCategoryId%>">
            <input type="submit" class="mtop40 center btn ltgray" value="Daha fazla">
        </form>
        <%}%>
    </div>
    <br class="clear">
</div>
<!-- LESSONS END -->

<jsp:include page="footer.jsp" />