<%@page import="util.RestfulClient"%>
<%@page import="dto.CategoryDTO"%>
<%@page import="java.util.List"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<div class="col-md-4 hidden-xs sidebar">
    <div class='panel panel-default' id='sidebar_social'>

        <div class="fb-page" 
             data-href="https://www.facebook.com/pcderslerim" 
             data-width="300" data-height="400"
             data-hide-cover="false" data-show-facepile="true" 
             data-show-posts="false">
            <div class="fb-xfbml-parse-ignore">
                <blockquote cite="https://www.facebook.com/pcderslerim">
                    <a href="https://www.facebook.com/pcderslerim">
                        pcderslerim | online bilgisayar derslerim
                    </a>
                </blockquote>
            </div>
        </div>
        <div class='panel-body' style='padding-bottom: 10px'>
            <div class="pull-left">
                <a href="https://twitter.com/pcderslerim" class="twitter-follow-button" 
                   data-show-count="false" data-show-screen-name="false">
                    Follow Us
                </a>
                <script>!function (d, s, id) {
                        var js, fjs = d.getElementsByTagName(s)[0], p = /^http:/.test(d.location) ? 'http' : 'https';
                        if (!d.getElementById(id)) {
                            js = d.createElement(s);
                            js.id = id;
                            js.src = p + '://platform.twitter.com/widgets.js';
                            fjs.parentNode.insertBefore(js, fjs);
                        }
                    }(document, 'script', 'twitter-wjs');</script>
            </div>
            <div class="pull-left" style="width: 80px; max-width:80px; margin-left: 20px;">
                <iframe style="max-width:100px; max-height: 25px; border:none; overflow:hidden; height:21px;" 
                        src="http://www.facebook.com/plugins/like.php?href=https://www.facebook.com/pcderslerim&amp;width&amp;layout=button_count&amp;action=like&amp;show_faces=false&amp;share=false&amp;height=21" 
                        scrolling="no" frameborder="0"  allowTransparency="true">

                </iframe>
            </div>
            <div class="pull-left" style="width: 80px; margin-left: 20px;">
                <script type="text/javascript"
                        src="https://maps.googleapis.com/maps/api/js?libraries=geometry">
                </script>
                <script type="text/javascript"
                        src="https:/apis.google.com/js/platform.js">
                </script> 

                <div class="g-plusone" data-size="medium" data-count="true"
                     data-href="https://plus.google.com/+afganrasulov"></div>

            </div>

        </div>
    </div>
    <div class='panel panel-default' id='sidebar_categories'>
        <div class='panel-heading'>Kategoriler</div>
        <div >
            <ul class='categories left-cat-menu'>
                <li>

                    <a href="index.jsp?begin=0&end=10" title='Hepsi'>Hepsi</a>
                </li>
                <%
                    List<CategoryDTO> categories = RestfulClient.getCategories();

                    for (int i = 0; i < categories.size(); i++) {%>
                <li>
                    <a href="index.jsp?begin=0&end=16&categoryId=<%=categories.get(i).getId()%>" 
                       title='<%= categories.get(i).getType()%>'>
                        <%= categories.get(i).getType()%>
                    </a>
                </li>
                <%
                    }
                %>

            </ul>
        </div>
    </div> 
</div>
<div class="col-md-8" google-adsense></div>
<div class="col-md-8 search">
    <!--  <form action="#"  id="main-search">-->
    <div class="input-group">
        <form class="ng-pristine ng-valid ng-submitted"
              method="GET"
              action="index.jsp">
            <input type="hidden" name="begin" value="0">
            <input type="hidden" name="end" value="16">
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
            <!--            <input type="text" 
                               class="form-control" 
                               id="search-input" 
                               placeholder="Hangı eğitimi aramamı istersin...?" 
                               name="search" 
                               autocomplete="off"
                               style="width: 80%"
                               >
                        <input type="submit" value="Ara" style="height: 34px;width: 100px;">-->
        </form>
    </div>
    <!--   </form>-->
</div> 

