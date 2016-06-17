<%@page contentType="text/html" pageEncoding="UTF-8"%>
<script>
    (
            function (d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id))
                    return;
                js = d.createElement(s);
                js.id = id;
                js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.3&appId=894184297341025";
                fjs.parentNode.insertBefore(js, fjs);

            }
    (document, 'script', 'facebook-jssdk')

            );
</script>
<div id="fb-root"></div> 

<section class="col-md-12 container-fluid">
    <h4 class="top-notification" >
        Sitede kayıt olan <strong>ilk 5000 kişiye Özel Grafik Materialleri hediye edilecektir.</strong> <strong>Facebook Giriş yaparak kayıt olabilirsiniz.</strong> Tasarımlar Facebook'la kayıt olduğunuz E-mail adresinize gönderilecektir. <strong>Tasarım dosyaları ilk 5000 kişi kayıt yaptıktan <span style="color:yellow;">sonra</span> gönderilecekir.</strong>
    </h4>
</section>
<br>
<br>
<br>
<br>
<header>
    <div class="container">
        <div class="navbar navbar-inverse navbar-static-top top-nav">

            <h1 class="col-md-1 logo">

                <a href="http://www.pcderslerim.com/" onclick="_gaq.push(['_trackEvent', 'Tıklamak', 'Header Logo', 'Ana sayfaya dönüş']);" title="Pcderslerim.com Anasayfa"><strong>indir</strong></a>
            </h1>


            <div class="col-md-3 nav col-md-offset-8">           
                <ul class="nav nav-pills">

<!--                    <li class="page_item page-item-12 button" ng-show='isGuest()'>
                        <label class="control-label"><a href="userlogin.jsp" >
                                <button>
                                    Üye girişi
                                </button>
                            </a>
                        </label>
                    </li>-->

                    <li class="page_item page-item-12 active" ng-show='isGuest()'>
                        <button class="active" ng-click="FBLogin()">
                            Facebook Giriş
                        </button>
                    </li>

                    <li class="page_item page-item-13" ng-hide='isGuest()'>
                        <button ng-click="logoutUser()">Çıkış {{loggedInUser()}}
                        </button>

                    </li>

                    <li>  
                        <div id="status">
                        </div>
                    </li>

                </ul>
            </div> 

        </div>
    </div>      
</header>

<section id='main-menu'>

    <div class='container'>
        <ul class='navbar top-cat-menu'>
            <li class="active"><a href='index.jsp'><span class='fa fa-home'></span>Ana sayfa</a></li> 
            <!--  <li><a ng-click="setRoute('/videos#begin=0&end=16&more=true')" ><span class='fa fa-youtube-play'></span> Videolar</a></li>
            --> 
            <li>
                <a>
                    <span class='fa fa-newspaper-o'></span> Blog(Çok yakında)
                </a>
            </li> 
            <li>
                <a href="nasilolmus.jsp">
                    <span  class='fa fa-picture-o'></span> Nasıl olmuş?
                </a>
            </li>

        </ul>
    </div>
</section>
<section class="section-groups">
    <div class="container">
        <div class="row">
            <jsp:include page="categories.jsp" />
            <span>