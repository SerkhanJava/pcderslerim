app.controller('VideoCtrl', ['$scope', '$http', '$routeParams', '$route', '$sce',
    function($scope, $http, $routeParams, $route, $sce) {

        $scope.statusVideo = "";
        $scope.synchSatus = 0;
        $scope.newvideo = {id: "", url: "", links: []};
        $scope.newvideos = {};
        $scope.newcategory = {};
        $scope.newvideoLinks = {};
        $scope.urlPart = true;
        $scope.descPart = false;
        $scope.tablePart = true;
        $scope.updatePart = false;
        $scope.editPart = false;
        var result = true;
        $scope.status = {};

        $http.get(apiUrl + '/videos/size').success(function(data) {
            $scope.range = [];
            var size = data.responseObject / 10;
            for (var i = 0; i <= size; i++) {
                var styleStr = '';

                if (i * 10 == $routeParams.begin) {
                    styleStr = '#f8cb1c';
                }
                $scope.range.push({begin: i * 10, end: i * 10 + 10, style: styleStr});
            }
        });


        jQuery(".dropdown dt a").on('click', function() {
            $(".dropdown dd ul").slideToggle('fast');
        });




        $scope.loadAllVideos = function() {

            var videoUrl = apiUrl + '/videos';
            videoUrl += '?begin=' + $routeParams.begin + '&end=' + $routeParams.end;
            $http.get(apiUrl + '/categories').success(function(data) {
                $scope.categories = data.responseObject;
                $http({
                    method: 'GET',
                    url: videoUrl
                }).
                        success(function(data) {
                            //Showing Success message
                            $scope.videos = data.responseObject;
                            for (i = 0; i < data.responseObject.length; i++) {
                                if (!data.responseObject[i].url) {
                                    continue;
                                }
                                $scope.videos[i].youtubeThumb = 'http://img.youtube.com/vi/' + data.responseObject[i].url.split('v=')[1] + '/0.jpg';
                                //       $scope.videos[i].description = $sce.trustAsHtml($scope.videos[i].description);
                            }//burda cox ish var e fikirlewib iwlemek laimdir bunu commit ele bu veziyyetde sabah baxaram inshALlah
                            jQuery.getJSON(apiUrl + '/categories', function(data) {
                                data = data.responseObject;
                                var items = [];
                                $.each(data, function(key, val) {
                                    items.push("<li><input  type='checkbox' value='" + val.id + "' id='rightside_" + val.id + "' />" + val.type + "</li>");
                                });
                                $("<ul/>", {
                                    html: items.join("")
                                }).appendTo(".mutliSelect");

                                $scope.cat = [];

                                $('.mutliSelect input[type="checkbox"]').on('click', function() {

                                    if ($(this).is(':checked')) {
                                        console.log('selected video id='+$(this).parent().parent().parent().attr('id'));
                                    }
                                    else {

                                    }
                                });

                            });

                        })
                        .error(function(error) {
                            //Showing error message
//                            $scope.statusVideo = 'Unable to delete  video: ' + error.message;
                        });
            });
        }


        $scope.loadAllVideos();




        $scope.loadForVideoDeleting = function(x) {
            $scope.deletingvideo = x;
        }
        $scope.refreshVideo = function(selectedVideo) {
            if (selectedVideo && selectedVideo.id && selectedVideo.id > 0) {
                $http.get(apiUrl + '/videos/' + selectedVideo.id).success(function(data) {
                    selectedVideo.links = data.responseObject.links;
                });
            }
        }
        $scope.loadVideo = function(selectedVideo, title) {
            $scope.tablePart = false;
            $scope.updatePart = true;
            $scope.urlPart = false;
            $scope.descPart = true;

            $scope.title = title;
            $scope.newvideo = selectedVideo;
            if (!$scope.newvideo.id) {
                $scope.newvideo = {id: "", url: "", links: []};
            }

            if (selectedVideo && selectedVideo.id && selectedVideo.id > 0) {
                $http.get(apiUrl + '/videos/' + selectedVideo.id).success(function(data) {
                    $scope.newvideo = data.responseObject;

                    if (selectedVideo && selectedVideo.categoryId) {
                        for (i = 0; i < $scope.categories.length; i++) {
                            if ($scope.categories[i].id == selectedVideo.categoryId.id) {
                                $scope.newvideo.categoryId = $scope.categories[i];
                                break;
                            }
                        }
                    }

                });
            }
        }


        $scope.deleteVideo = function() {
            if ($scope.deletingvideo.id < 1) {
                alert("Doesn't selected any video!!!");
                return;
            }
            var method = '';
            var url = apiUrl + '/videos/' + $scope.deletingvideo.id;

            $http({
                method: 'DELETE',
                url: url
            }).
                    success(function(data) {
                        //Showing Success message

                        $scope.videos.splice($scope.videos.indexOf($scope.deletingvideo), 1);
                        $scope.statusVideo = "deleted successfully!!!";
                    })
                    .error(function(error) {
                        //Showing error message
//                        $scope.statusVideo = 'Unable to delete  video: ' + error.message;
                    });

        };


        $scope.addVideo = function(video, refresh) {

            var method = 'POST';
            var url = apiUrl + '/videos';

            if (video.id > 0) {
                method = 'PUT';
                url += '/' + video.id;
            }


            $http({
                method: method,
                url: url,
                data: angular.toJson(video),
                headers: {'Content-Type': 'application/JSON'}
            }).
                    success(function() {
                        $scope.statusVideo = "saved successfully!!!";
                        $scope.synchSatus++;
//                         $scope.reloadRoute();
//                        if (refresh) {
//                            $scope.loadAllVideos();
//                        }
                    })
                    .error(function() {
                    });

            $scope.reloadRoute();
        }

        $scope.synchronVideos = [];

        $scope.synchroneVideosFromYoutube = function(url, update) {
            if (!url) {
                url = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=UUInW-lJBGnS8PuKqaMjsLlQ&key=AIzaSyB9DGboVYOHMDsQxJu-rxsrofoujwmKRRo';
            }

            $http.get(url)
                    .success(function(data) {

                        for (var i = 0; i < data.items.length; i++) {
                            var newvideo = {};
                            newvideo.links = [];
                            newvideo.url = 'https://www.youtube.com/watch?v=' + data.items[i].snippet.resourceId.videoId;
                            newvideo.title = data.items[i].snippet.title;
                            newvideo.date = data.items[i].snippet.publishedAt;
                            newvideo.description = data.items[i].snippet.description;
                            newvideo.categoryId = {id: 1};

                            $scope.synchronVideos.push(newvideo);
                        }

                        if (data.nextPageToken) {
                            $scope.synchroneVideosFromYoutube('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&pageToken=' + data.nextPageToken + '&playlistId=UUInW-lJBGnS8PuKqaMjsLlQ&key=AIzaSyB9DGboVYOHMDsQxJu-rxsrofoujwmKRRo', update);
                        } else {
                            $scope.synchSatusFinished = $scope.synchronVideos.length + " videos selected from Youtube.Now these are inserting into database.Please wait....";
                            for (var i = $scope.synchronVideos.length - 1; i >= 0; i--) {
                                if (update) {
                                    $scope.synchronVideos[i].id = 1;
                                    $scope.addVideo($scope.synchronVideos[i]);
                                } else {

                                    $scope.addVideo($scope.synchronVideos[i]);
                                }
                            }
                            return;
                        }

                    }).error(function(error) {
                //Showing error message
//            alert($scope.status);
            });
            ;
        }


        $scope.saveVideo = function() {
            var method = 'PUT';
            var url = apiUrl + '/videos';

            var reqVideos = [];
            for (i = 0; i < $scope.videos.length; i++) {
                var video = {};
                angular.copy($scope.videos[i], video);
                reqVideos.push(video);
                delete video.youtubeThumb;
            }

            $http({
                method: method,
                url: url,
                data: angular.toJson(reqVideos),
                headers: {'Content-Type': 'application/JSON'}
            }).
                    success(function(data) {
                        //Showing Success message

                        $scope.statusVideo = "saved successfully!!!";
//                    alert($scope.status);
                    })
                    .error(function(error) {
                        //Showing error message
//                        $scope.statusVideo = 'Unable to save: ' + error.message;
                        alert($scope.statusVideo);
                    });

        }






        $scope.addVideoLinks = function(video) {
            video.links.push({url: "", text: "", working: true});
        }

        $scope.toggleWorking = function(x) {
            x.working = !x.working;
        }


        //video link      


        var videoLinkUrl = apiUrl + '/videolinks?begin=' + $routeParams.begin + '&end=' + $routeParams.end;
        $http.get(videoLinkUrl).success(function(data) {
            $scope.videolinks = data.responseObject;
        });


        $scope.saveVideoLink = function(seletedVideoLink) {
            var method = 'PUT';
            var url = apiUrl + '/videolink/' + seletedVideoLink.id;

            $http({
                method: method,
                url: url,
                data: angular.toJson(seletedVideoLink),
                headers: {'Content-Type': 'application/JSON'}
            }).
                    success(function(data) {
                        //Showing Success message
                        $scope.statusVideo = "saved successfully!!!";
                    })
                    .error(function(error) {
                        //Showing error message
//                        $scope.statusVideo = 'Unable to create a video: ' + error.message;
                    });

        }



        $scope.deleteVideoLink = function(selectedVideo, videoLink) {
            if (!videoLink) {
                alert("Doesn't selected any video link!!!");
            }

            if (videoLink.id < 0) {
                alert("Doesn't selected any video link!!!");
            }
            if (!videoLink.id || videoLink.id == 0) {
                selectedVideo.links.splice(selectedVideo.links.indexOf(videoLink), 1);
                return;
            }

            var method = '';
            var url = apiUrl + '/videolinks/' + videoLink.id;

            $http({
                method: 'DELETE',
                url: url
            }).
                    success(function(data) {
                        //Showing Success message

                        selectedVideo.links.splice(selectedVideo.links.indexOf(videoLink), 1);


                    })
                    .error(function(error) {
                        //Showing error message
//                        $scope.statusVideo = 'Unable to delete  video Link: ' + error.message;
                    });

        };


        //add new link 



        $scope.newvideoLink = {};

        $scope.addVideoLink = function(x) {

            var method = 'POST';
            var url = apiUrl + '/videos/' + x.id + '/videolinks';

            $http({
                method: method,
                url: url,
                data: angular.toJson($scope.newvideoLink[x.id]),
                headers: {'Content-Type': 'application/JSON'}
            }).
                    success(function(data) {
                        //Showing Success message
                        $scope.statusVideo = "saved successfully!!!";
                    })
                    .error(function(error) {
                        //Showing error message
//                        $scope.statusVideo = 'Unable to create a video: ' + error.message;
                    });

        }

        $scope.reloadRoute = function() {
            $route.reload();
        }


        //update select combobox


        $scope.loadVideoforUpdating = function(selectedVideo) {
            $scope.newvideo = selectedVideo;
            if (selectedVideo && selectedVideo.id && selectedVideo.id > 0) {
                $http.get(apiUrl + '/videos/' + selectedVideo.id).success(function(data) {
                    $scope.newvideo = data.responseObject;
                });
            }
        }

        $scope.loadAndUpdate = function(selectedVideo) {
            $scope.loadVideoforUpdating(selectedVideo);
            $scope.update(selectedVideo);
        }

        $scope.update = function(selectedVideo) {
            var copiedVideo = angular.copy(selectedVideo);
            delete copiedVideo.youtubeThumb;

            var method = '';
            var url = apiUrl + '/videos';
            if ($scope.newvideo.id > 0) {
                method = 'PUT';
                url += '/' + $scope.newvideo.id;
            }

            $http({
                method: method,
                url: url,
                data: angular.toJson(copiedVideo),
                headers: {'Content-Type': 'application/JSON'}
            }).
                    success(function(data) {
                        $scope.statusVideo = "saved successfully!!!";
                    })
                    .error(function(error) {
                        //Showing error message
                        $scope.statusVideo = "Unable to create a video: ";
//                        $scope.statusVideo = 'Unable to create a video: ' + error.message;
                    });

        }






    }]);



app.controller('CategoryCtrl', ['$scope', '$http', '$route',
    function($scope, $http, $route) {

        $scope.loadAllCategories = function() {
            $http.get(apiUrl + '/categories').success(function(data) {
                $scope.categories = data.responseObject;
            });
        }
        $scope.loadAllCategories();

        $scope.loadForDeleting = function(x) {
            $scope.deletingcategory = x;
        }

        $scope.loadCategory = function(selectedCategory, title) {
            $scope.title = title;
            $scope.newcategory = selectedCategory;
        }

        $scope.deleteCategory = function() {
//        alert(JSON.stringify($scope.deletingcategory));
            if ($scope.deletingcategory.id < 1) {
                alert("Doesn't selected any category!!!");
                return;
            }
            var method = '';
            var url = apiUrl + '/categories/' + $scope.deletingcategory.id;

            $http({
                method: 'DELETE',
                url: url,
                data: angular.toJson($scope.deletingcategory),
                headers: {'Content-Type': 'application/JSON'}
            }).
                    success(function(data) {
                        //Showing Success message
                        $route.reload();

                    })
                    .error(function(error) {
                        //Showing error message
//                        $scope.status = 'Unable to delete  category: ' + error.message;
                    });

        };


        $scope.addCategory = function() {
//        alert(JSON.stringify($scope.newcategory));

            var method = '';
            var url = apiUrl + '/categories';
            if ($scope.newcategory.id > 0) {
                method = 'PUT';
                url += '/' + $scope.newcategory.id;
            } else {
                method = 'POST';
            }
            $http({
                method: method,
                url: url,
                data: angular.toJson($scope.newcategory),
                headers: {'Content-Type': 'application/JSON'}
            }).
                    success(function(data) {
                        //Showing Success message
                        $route.reload();
                        $scope.status = "saved Successfully!!!";
                    })
                    .error(function(error) {
                        //Showing error message
//                        $scope.status = 'Unable to create a video: ' + error.message;
                    });

        }

        $scope.reloadRoute = function() {
            $route.reload();
        }
    }]);






app.controller('CustomCategoryCtrl', ['$scope', '$http', '$route', '$routeParams',
    function($scope, $http, $route, $routeParams) {
        $scope.newcustomcategory = {id: "", categoryId1: "", categoryId2: []};

        $scope.selectRightPanel = function(categoryId1) {
            $http.get(apiUrl + '/customcategories?categoryid1=' + categoryId1).success(function(data) {
                data = data.responseObject;
                $('.mutliSelect input').prop('checked', false);
                $('.multiSel').html('');
                for (i = 0; i < data.length; i++) {
                    document.getElementById('rightside_' + data[i].categoryId2.id).checked = true;
                    $('.multiSel').html($('.multiSel').html() + '<span>' + data[i].categoryId2.type + ' </span>');
                }
            });
        }

        $scope.loadLeftCategories = function() {
            $http.get(apiUrl + '/categories').success(function(data) {
                $scope.categories = data.responseObject;
            });
        }

        $scope.loadLeftCategories();

        $scope.linkUrl = apiUrl + '/customcategories?begin=' + $routeParams.begin + '&end=' + $routeParams.end;

        $scope.loadAllCategories = function() {
            $http.get($scope.linkUrl).success(function(data) {
                $scope.customCategories = data.responseObject;
                $scope.customCategories.forEach(function(selectedCustomCategory) {
                    if (selectedCustomCategory && selectedCustomCategory.categoryId1) {
                        for (i = 0; i < $scope.customCategories.length; i++) {
                            if ($scope.customCategories[i].id == selectedCustomCategory.categoryId1.id) {
                                $scope.newcustomcategory.categoryId1 = $scope.customCategories[i];
                                break;
                            }
                        }
                        for (i = 0; i < $scope.customCategories.length; i++) {
                            if ($scope.customCategories[i].id == selectedCustomCategory.categoryId2.id) {
                                $scope.newcustomcategory.categoryId2 = $scope.customCategories[i];
                                break;
                            }
                        }
                    }
                })
            });
        }

        $scope.loadAllCategories();

        $scope.loadForDeleting = function(x) {
            $scope.deletingcategory = x;
        }

        $scope.loadCustomCategory = function(selectedCustomCategory, title) {
            $scope.title = title;
            $scope.newcustomcategory = selectedCustomCategory;
        }

        $scope.deleteCustomCategory = function() {
//        alert(JSON.stringify($scope.deletingcategory));
            if ($scope.deletingcustomcategory.id < 1) {
                alert("Doesn't selected any category!!!");
                return;
            }
            var method = '';
            var url = apiUrl + '/customcategories/' + $scope.deletingcustomcategory.id;

            $http({
                method: 'DELETE',
                url: url,
                data: angular.toJson($scope.deletingcustomcategory),
                headers: {'Content-Type': 'application/JSON'}
            }).
                    success(function(data) {
                        //Showing Success message
                        $route.reload();

                    })
                    .error(function(error) {
                        //Showing error message
//                        $scope.status = 'Unable to delete  category: ' + error.message;
                    });

        };


        $scope.addCustomCategory = function() {
            var method = '';
            var url = apiUrl + '/customcategories';
            if ($scope.newcustomcategory.id > 0) {
                method = 'PUT';
                url += '/' + $scope.newcustomcategory.id;
            } else {
                method = 'POST';
            }
            $http({
                method: method,
                url: url,
                data: angular.toJson($scope.newcustomcategory),
                headers: {'Content-Type': 'application/JSON'}
            }).
                    success(function(data) {
                        //Showing Success message
                        $route.reload();
                        $scope.status = "saved Successfully!!!";
                    })
                    .error(function(error) {
                        //Showing error message
//                        $scope.status = 'Unable to create a video: ' + error.message;
                    });

        }

        $scope.newcategory = {};
        $scope.addCategory = function() {
//        alert(JSON.stringify($scope.newcategory));

            var method = '';
            var url = apiUrl + '/categories';
            method = 'POST';
            $scope.httpProcess = true;
            $http({
                method: method,
                url: url,
                data: angular.toJson($scope.newcategory),
                headers: {'Content-Type': 'application/JSON'}
            }).
                    success(function(data) {
                        //Showing Success message
                        $scope.httpProcess = false;
                        $scope.loadRightPanel();
                        $scope.loadLeftCategories();
                    })
                    .error(function(error) {
                        $scope.httpProcess = false;
                        //Showing error message
                    });

        }

        $scope.reloadRoute = function() {
            $route.reload();
        }

        jQuery(".dropdown dt a").on('click', function() {
            $(".dropdown dd ul").slideToggle('fast');
        });

        jQuery(".dropdown dd ul li a").on('click', function() {
            $(".dropdown dd ul").hide();
        });

//        function getSelectedValue(id) {
//            return jQuery("#" + id).find("dt a span.value").html();
//        }
//
        jQuery(document).bind('click', function(e) {
            var $clicked = $(e.target);
            if (!$clicked.parents().hasClass("dropdown"))
                $(".dropdown dd ul").show();
        });
        $scope.loadRightPanel = function() {
            jQuery.getJSON(apiUrl + '/categories', function(data) {
                data = data.responseObject;
                var items = [];
                $.each(data, function(key, val) {
                    items.push("<li><input  type='checkbox' value='" + val.id + "' id='rightside_" + val.id + "' />" + val.type + "</li>");
                });
                $("<ul/>", {
                    html: items.join("")
                }).appendTo(".mutliSelect");


                $('.mutliSelect input[type="checkbox"]').on('click', function() {

                    if ($(this).is(':checked')) {
                        var html = '<span title="' + $(this).parent().text() + '">' + $(this).parent().text() + '</span>';

                        $('.multiSel').append(html);
//                    $(".hida").hide();
                        $scope.newcustomcategory.categoryId2 = {id: $(this).val()};
                        $.ajax({
                            type: 'POST',
                            url: apiUrl + '/customcategories',
                            data: JSON.stringify($scope.newcustomcategory),
                            success: function(data) {
//                            alert('data: ' + data);
                            },
                            contentType: "application/json",
                            dataType: 'json'
                        });

                    }
                    else {
                        $('span[title="' + $(this).parent().text() + '"]').remove();
                        var ret = $(".hida");
                        $('.dropdown dt a').append(ret);

                        $http({
                            method: 'DELETE',
                            url: apiUrl + '/ccs?c1=' + $scope.newcustomcategory.categoryId1.id +
                                    '&c2=' + $(this).val(),
                        })
                    }


                });
            });
        }

        $scope.loadRightPanel();




    }]);



//All links
app.controller('LinksCtrl', ['$scope', '$http', '$location', '$routeParams', '$route',
    function($scope, $http, $location, $routeParams, $route) {
        $scope.newvideoLinks = {};
        $scope.linksTitle = 'All links';
        $scope.changeUrl = function(begin, end, param) {
            var url = '/allLinks#begin=' + begin + '&end=' + end;

            if (param) {
                url += "&working=" + param;
            }
            $location.path(url);
        }

        var linkUrl = apiUrl + '/videolinks?begin=' + $routeParams.begin + '&end=' + $routeParams.end;

        var linkSizeUrl = apiUrl + '/videolinks/size';

        if ($routeParams.working) {
            linkSizeUrl += '?working=' + $routeParams.working;
            linkUrl += '&working=' + $routeParams.working;
            if ($routeParams.working === 'true') {
                $scope.linksTitle = 'Working links';
            } else if ($routeParams.working === 'false') {
                $scope.linksTitle = 'Broken links';
            }
        }

        $http.get(linkUrl).success(function(data) {
            $scope.videoLinks = data.responseObject;
            $scope.videoLinks.forEach(function(videoLink) {
                videoLink.videoId.youtubeThumb = 'http://img.youtube.com/vi/' +
                        videoLink.videoId.url.split('v=')[1] + '/0.jpg';
            })
        });

        $http.get(linkSizeUrl).success(function(data) {
            $scope.range = [];
            var size = data.responseObject / 10;
            for (var i = 0; i <= size; i++) {
                var styleStr = '';

                if (i * 10 == $routeParams.begin) {
                    styleStr = '#f8cb1c';
                }
                $scope.range.push({begin: i * 10, end: i * 10 + 10, working: $routeParams.working, style: styleStr});
            }
        });

        $scope.isWorking = function(data) {
            return $scope.videoLinks.working;
        };

        $scope.deleteLinks = function(x) {
            if (!x) {
                alert("Doesn't selected any video link!!!");
            }
            if (x.id < 0) {
                alert("Doesn't selected any video link!!!");
            }
            var method = '';
            var url = apiUrl + '/videolinks/' + x.id;
            $http({
                method: 'DELETE',
                url: url
            }).
                    success(function(data) {
                        //Showing Success message
//                    $scope.status = "deleted Successfully!!!";
//                    alert($scope.status);
                        $route.reload();
                    })
                    .error(function(error) {
                        //Showing error message
//                        $scope.status = 'Unable to delete  video Link: ' + error.message;
                    });

        };
        $scope.updateLinks = function() {
//        alert(JSON.stringify($scope.videoLinks));

            var url = apiUrl + '/videolinks';

            $http({
                method: "PUT",
                url: url,
                data: angular.toJson($scope.videoLinks),
                headers: {'Content-Type': 'application/JSON'}
            }).
                    success(function(data) {
                        //Showing Success message

                        $scope.status = "saved Successfully!!!";
                        alert($scope.status);
//                    $("#close_dlg").click();
                        $route.reload();
                    })
                    .error(function(error) {
                        //Showing error message
//                        $scope.status = 'Unable to create a video: ' + error.message;
                    });
        }
        $scope.toggleWorking = function(x) {
            x.working = !x.working;
        }
    }]);





//user
app.controller('UserCtrl', ['$scope', '$http', '$route', '$routeParams',
    function($scope, $http, $route, $routeParams) {
        $scope.tablePart = true;
        $scope.updatePart = false;
        $scope.newUser = {};

        $http.get(apiUrl + '/roles').success(function(data) {
            $scope.roles = data.responseObject;
        });

        var userUrl = apiUrl + '/users';
        userUrl += '?begin=' + $routeParams.begin + '&end=' + $routeParams.end;
        $http.get(userUrl).success(function(data) {
            $scope.users = data.responseObject;
        });

        $http.get(apiUrl + '/users/size').success(function(data) {
            $scope.range = [];
            var size = data.responseObject / 10;
            for (var i = 0; i <= size; i++) {
                var styleStr = '';

                if (i * 10 == $routeParams.begin) {
                    styleStr = '#f8cb1c';
                }

                $scope.range.push({begin: i * 10, end: i * 10 + 10, style: styleStr});
            }
        });

        $scope.toggleActive = function(x) {
            x.activate = x.activate == 0 ? 1 : 0;

            var method = 'PUT';
            var url = apiUrl + '/users/' + x.id + '/status';
            $http({
                method: method,
                url: url,
                data: angular.toJson(x),
                headers: {'Content-Type': 'application/JSON'}
            }).
                    success(function(data) {
//                    sadece iminna bu 1 nomrlei sehifeni 
                        $route.reload();
                        $scope.status = "saved Successfully!!!";
                    })
                    .error(function(error) {
                        //Showing error message
//                        $scope.status = 'Unable to create a user: ' + error.message;
                    });


        }


        $scope.loadUser = function(selectedUser, title) {
            $scope.tablePart = false;
            $scope.updatePart = true;
            $scope.title = title;
            $scope.newUser = selectedUser;

            if (selectedUser && selectedUser.id && selectedUser.id > 0) {
                $http.get(apiUrl + '/users/' + selectedUser.id).success(function(data) {
                    $scope.newUser = data.responseObject;
                    if (selectedUser && selectedUser.roleId) {
                        for (i = 0; i < $scope.roles.length; i++) {
                            if ($scope.roles[i].id == selectedUser.roleId.id) {
                                $scope.newUser.roleId = $scope.roles[i];
                                break;
                            }
                        }
                    }
                });
            }
        }
    }]);



app.controller('RegisterCtrl', ['$scope', '$http', '$route', '$routeParams', '$window',
    function($scope, $http, $route, $routeParams, $window) {
        localStorage.clear();
        $scope.isDisabled = false;

        $scope.title = "Kayıt ol";

        $scope.newUser = {};
        $scope.status = {};
        $scope.checkFields = function() {
            var result = true;
            $scope.status = {};

            if ($scope.newUser) {

                if (!$scope.newUser.name || $scope.newUser.name.lenght === 0) {
                    $scope.status.nameError = "İsminizi giriniz";
//                $scope.isNameEmptyStyle = "color:red";
                    result = false;
                }

                if (!$scope.newUser.surname || $scope.newUser.surname.lenght === 0) {
                    $scope.status.surnameError = "Soyisminizi giriniz";
//                $scope.isSurnameEmptyStyle = "color:red";
                    result = false;
                }

                if (!$scope.newUser.email || $scope.newUser.email.lenght === 0) {
                    $scope.status.emailError = "Emailinizi giriniz";
//                $scope.isEmailEmptyStyle = "color:red";
                    result = false;
                }

                if (!($scope.newUser.password && $scope.newUser.password.length >= 5)) {
                    $scope.status.passwordError = "min. 5 karakter";
                    result = false;
                }

                if ($scope.newUser.password !== $scope.newUser.passwordRepeat) {
                    $scope.status.passwordRepeatError = "Şifreler aynı deyil";
                    result = false;
                }

            }
            return result;
        };

        $scope.checkPasswordSame = function() {
            var result = true;
            $scope.status.passwordRepeatError = "";
            $scope.status.passwordError = "";

            if (!($scope.newUser.password && $scope.newUser.password.length >= 5)) {
                $scope.status.passwordError = "min. 5 karakter";
                result = false;
            }

            if ($scope.newUser.password !== $scope.newUser.passwordRepeat) {
                $scope.status.passwordRepeatError = "Şifreler aynı deyil";
                result = false;
            }
            return result;
        }

        $scope.addUser = function() {
            $scope.isDisabled = true;

            if (!$scope.checkFields()) {
                $scope.isDisabled = false;
                var element = document.getElementById("user_field");
                var alignWithTop = true;
                element.scrollTop;
                return;
            }

//        alert(JSON.stringify($scope.newUser));
            $http({
                method: 'POST', url: apiUrl + '/users',
                data: angular.toJson($scope.newUser),
                headers: {'Content-Type': 'application/JSON'}
            }).
                    success(function(data) {
                        //Showing Success message
                        $scope.isDisabled = false;

                        $scope.status.success = "Kayıt yaptınız";

                    })
                    .error(function(error) {
                        //Showing error message
                        $scope.isDisabled = false;

                        $scope.status = error;
                        if (error.alreadyExistError) {
                            error.alreadyExistError = "Bu email kullanılmakta.Başka email seçiniz";
                        }

//                    var element = document.getElementById("user_name");
//                    var alignWithTop = true;
//                    element.scrollIntoView(alignWithTop);

                    });

        };


        $scope.userInfo = {};

        $scope.checkUser = function() {
            $scope.isDisabled = true;

            var method = 'POST';
            var url = apiUrl + '/users/login';

            $http({
                method: method, url: url,
                data: angular.toJson($scope.userInfo),
                headers: {'Content-Type': 'application/JSON'}
            }).
                    success(function(data) {
                        //Showing Success message
                        $scope.isDisabled = false;

                        if (data.responseObject.success) {
                            data.responseObject.success = "Başarıyla giriş yaptınız";
                        }
                        $scope.status = data;

                        console.log("$window.sessionStorage.token=" + $window.sessionStorage.token);
                        $window.sessionStorage.userId = data.responseObject.user.id;
                        $window.sessionStorage.userName = data.responseObject.user.name;
                        $window.sessionStorage.userSurname = data.responseObject.user.surname;
                        localStorage.setItem("token", data.responseObject.token);
                        $window.location.href = "http://" + location.host + "/pcadmin/admin.html";
                    })
                    .error(function(error) {
                        $scope.isDisabled = false;

                        if (error.error) {
                            error.error = "Email ve ya şifrenizi doğru giriniz";
                        }

                        if (error.unknownError) {
                            error.error = "Bilinmedik hata oluştu";
                        }

                        if (error.illegalArgumentError) {
                            error.error = "Email ve ya şifre kriterlerle uyuşmuyor";
                        }

                        $scope.status = error;
                    });

        };

    }]);


app.controller('MailCtrl', ['$scope', '$http', '$route', '$routeParams', '$window',
    function($scope, $http, $route, $routeParams, $window) {
        $scope.isDisabled = false;
        $scope.sendEmail = function() {
            $scope.isDisabled = true;

//        alert(JSON.stringify($scope.newUser));
            $http({
                method: 'POST', url: apiUrl + '/mails',
                data: angular.toJson($scope.newEmail),
                headers: {'Content-Type': 'application/JSON'}
            }).
                    success(function(data) {
                        //Showing Success message
                        $scope.isDisabled = false;

                        $scope.status.success = "Emailiniz gonderildi";

                    })
                    .error(function(error) {
                        //Showing error message
                        $scope.isDisabled = false;
                        $scope.status = error;
                    });

        };
    }]);