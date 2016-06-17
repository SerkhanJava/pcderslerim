<%@page import="dto.CustomCategoryDTO"%>
<%@page import="java.util.List"%>
<%@page import="util.RestfulClient"%>
<%@page import="dto.VideoDTO"%>
<%@page import="dto.VideoDTO"%>
<jsp:include page="header.jsp" />
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<%
    int selectedVideo = Integer.parseInt(request.getParameter("videoid"));
    VideoDTO video = RestfulClient.getVideo(selectedVideo);

    int selectedCategoryId = Integer.parseInt(request.getParameter("categoryid"));
    List<CustomCategoryDTO> categoriesOfThisCategory = RestfulClient.getCustomCategoriesOfCategory(selectedCategoryId);
%>

<!-- COURSE BEGIN -->
<div id="course" class="main mtop60">
    <div class="header">
        <div class="left">
            <%=video.getTitle()%>
            <!--<span class="author"> <a href="#"></a></span>-->
        </div>
        <div class="right">
            <!--            <a href="#" class="btnsmall gray">Share  with</a>
                        <a href="#" class="btnsmall gray">Example Button</a>-->
        </div>
        <br class="clear">
    </div>
<!--    <video controls="controls" poster="http://img.youtube.com/vi/<%=video.getUrl().split("v=")[1] + "/0.jpg"%>">
        <source src="<%=video.getUrl()%>">
    </video>-->
            <iframe style="width: 100%" src='<%=video.getUrl().replace("watch?v=", "/embed/") + "?autoplay=1"%>' 
            frameborder='0' width='1280' height='450' scrolling='no' 
            allowfullscreen>

    </iframe>  
    <ul class="lessons">
        <li class="left">
            <!--            <div class="search">
                            <input type="text">
                            <button>Search</button>
                        </div>-->
            <div class="nano">
                <div class="nano-content">
                    <%
                        for (int i = 0; i < categoriesOfThisCategory.size(); i++) {
                            List<VideoDTO> videosOfThisCategory = RestfulClient.getVideos(0, 0, categoriesOfThisCategory.get(i).getCategoryId2().getId(), null);
                    %>
                    <ul class="parts">
                        <li class="title">
                            <a href="#">
                                <i class="fa fa-chevron-circle-down"></i>
                                <%=categoriesOfThisCategory.get(i).getCategoryId2().getType()%>
                                <span class="duration"></span>
                            </a>
                        </li>
                        <%for (int k = 0; k < videosOfThisCategory.size(); k++) {%>
                        <li class="active">
                            <a href="#">
                                <i class="fa fa-play-circle"></i>
                                <%=videosOfThisCategory.get(k).getTitle()%><span class="duration"></span>
                            </a>
                        </li> 
                        <%}%>
                    </ul> 
                    <%}%>
                    <%

                        List<VideoDTO> videosOfThisCategory = RestfulClient.getVideos(0, 0, selectedCategoryId, null);
                    %>
                    <ul class="parts">
                        <li class="title">
                            <a href="#">
                                <i class="fa fa-chevron-circle-down"></i>
                                Bu setdeki diğer videolar
                                <span class="duration"> </span>
                            </a>
                        </li>
                        <%for (int k = 0; k < videosOfThisCategory.size(); k++) {%>
                        <li class="active">
                            <a href="#">
                                <i class="fa fa-play-circle"></i>
                                <%=videosOfThisCategory.get(k).getTitle()%><span class="duration">1m 58s</span>
                            </a>
                        </li> 
                        <%}%>
                    </ul>  
                </div>
            </div>
        </li>
        <li class="right">
            <ul id="tabli" class="tabs">
                <li class="active"><a>Açıklama</a></li>
                <!--                <li><a>Transcript</a></li>
                                <li><a>FAQs</a></li>-->
            </ul>
            <ul id="tabcon" class="contents">
                <li class="active">
                    <h3><%=video.getTitle()%></h3>
                    <p class="mtop20">
                        <%=video.getDescriptionAsHtml()%>
                    </p>

                    <!--<p class="mtop40"><b>Kateqori:</b> <button class="btnsmall gray"></button></p>-->
                    <!--<p class="mtop20"><b>Author:</b> <button class="btnsmall gray">Ina Saltz</button></p>-->
                </li>
                <li>
                    <h3>Welcome</h3>
                    <p class="mtop20">
                        Typography is a deep and wonderful universe. Looking at Letterforms, we can see that there
                        are independently beautiful as works of art. In addition to being beautiful, Letterforms
                        also form words, sentences, and thoughts. These are the very foundation of our history.
                        Letterforms enable us to communicate with one another and to transmit every aspect of our
                        civilization from one generation to the next. I'm Ina Saltz, and I'd like to welcome you
                        to the world of Typography. Typography is everywhere.
                    </p>
                    <p class="mtop20">
                        It has traditions, practices, functions, and a language all its own. Type plays a vital
                        role in every form of media. The whole idea of this course is to give you a solid foundation
                        in the basics of Typography. Whether, you're designing a brand identity, a book, a website,
                        or just a brochure for a local business. If you've never had any formal training in Typography,
                        there will be plenty of material in this course to help you make better decisions about your
                        Typographic usage.
                    </p>
                    <p class="mtop20">
                        Even if you're not new to the field, I think you'll find this course to be a great refresher,
                        and you may even discover some new concepts and practices that will improve your use of
                        Typography. We'll explore universal and timeless principles of Typography and explain good
                        Typography practices. We're going to get up close to the details of type so you can get a
                        better sense of why it works the way it does. We're going to talk about basic principles of
                        Type to help you make the best design choices for your projects.
                    </p>
                    <p class="mtop20">
                        And we'll go over naming conventions. So you can speak about Type with professionalism and
                        confidence. I'm passionate about letterforms. For more than 30 years, I've been deeply involved
                        in the world of Type, and I'm excited to share with you the Foundations of Typography.
                    </p>
                </li>
                <li>
                    There are currently no FAQs about Foundations of Typography.
                    <button class="btnsmall gray mtop20">Ask a question</button>
                </li>
            </ul>
        </li>
    </ul>
    <%
        if (videosOfThisCategory.size() > 0) {
    %>
    <div class="watched">
        <p>İlginizi çeke bilecek videolar</p>
        <ul>
            <%
                for (int i = 0; i < 5; i++) {
            %>
            <li>
                <a href="course.jsp?categoryid=<%=videosOfThisCategory.get(i).getCategoryStr()%>&videoid=<%=videosOfThisCategory.get(i).getId()%>">
                    <img src="http://img.youtube.com/vi/<%=videosOfThisCategory.get(i).getUrl().split("v=")[1] + "/0.jpg"%>" alt=""/>
                </a>
                <a href="course.jsp?categoryid=<%=videosOfThisCategory.get(i).getCategoryStr()%>&videoid=<%=videosOfThisCategory.get(i).getId()%>"><%=videosOfThisCategory.get(i).getTitle()%></a>
            </li> 
            <%}%>
        </ul>
    </div>
    <%}%>
</div>
<!-- COURSE END -->
<jsp:include page="footer.jsp" />
