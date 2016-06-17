package az.Vortex.SpringDevelopers.controller;

import az.Vortex.SpringDevelopers.dto.VideoDTO;
import az.Vortex.SpringDevelopers.dto.VideoLinksDTO;

import az.Vortex.SpringDevelopers.model.Video;
import az.Vortex.SpringDevelopers.model.Category;
import az.Vortex.SpringDevelopers.model.VideoLinks;
import az.Vortex.SpringDevelopers.response.ResponseDTO;

import az.Vortex.SpringDevelopers.service.VideoService;
import az.Vortex.SpringDevelopers.service.CategoryService;
import az.Vortex.SpringDevelopers.service.UserSessionService;
import az.Vortex.SpringDevelopers.service.VideoLinksService;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import org.springframework.web.bind.annotation.ResponseBody;
import utils.AuthorizationUtil;

@Controller
@RequestMapping(value = "/videos")
public class VideoController {

    AuthorizationUtil authorizationUtil = new AuthorizationUtil();

    @Autowired
    private VideoService videoService;

    @Autowired
    private VideoLinksService videoLinksService;

    @Autowired
    private UserSessionService sessionService;

    @Autowired
    private CategoryService categoryService;

    @RequestMapping(value = "/{videoId}", method = RequestMethod.GET)
    public @ResponseBody
    ResponseDTO getVideo(@PathVariable Integer videoId, HttpServletRequest request) throws Exception {
        ResponseDTO result = new ResponseDTO();
        VideoDTO video = null;

        authorizationUtil.refreshSession(sessionService, request.getHeader("token"));
        Video r = videoService.getVideo(new Video(videoId));
        video = new VideoDTO(r);
        List<VideoLinks> links = r.getVideoLinksList();
        List<VideoLinksDTO> linksDTO = new ArrayList<VideoLinksDTO>();
        for (VideoLinks link : links) {
            linksDTO.add(new VideoLinksDTO(link));
        }
        video.setLinks(linksDTO);

        result.setResponseObject(video);
        return result;
    }
//

    @RequestMapping(method = RequestMethod.GET)
    public @ResponseBody
    ResponseDTO getAllVideos(@RequestParam(value = "begin", required = true) Integer begin,
            @RequestParam(value = "end", required = true) Integer end,
            @RequestParam(value = "categoryId", required = false) Integer categoryId,
            @RequestParam(value = "search", required = false) String search,
            HttpServletRequest request) throws Exception {
        ResponseDTO result = new ResponseDTO();
        List<VideoDTO> video = new ArrayList<VideoDTO>();

        authorizationUtil.refreshSession(sessionService, request.getHeader("token"));//admin lazim oaln yerde 1 yazib gonder day if zad ehtiyac yoxdur
        List<Video> list = videoService.getAllVideo(null, begin, end, categoryId, search);
        for (int i = 0; i < list.size(); i++) {
            video.add(new VideoDTO(list.get(i)));
        }
        result.setResponseObject(video);
        return result;

    }

    @RequestMapping(value = "/size", method = RequestMethod.GET, produces = "application/json")
    public @ResponseBody
    ResponseDTO sizeVideo(@RequestParam(value = "categoryId", required = false) Integer categoryId,
            @RequestParam(value = "search", required = false) String search,
            HttpServletRequest request) throws Exception {
        ResponseDTO result = new ResponseDTO();
        int r = 0;

        authorizationUtil.refreshSession(sessionService, request.getHeader("token"));
        System.out.println("categoryId size="+categoryId);
        r = videoService.sizeVideo(categoryId, search);
        System.out.println("r:=" + r);

        result.setResponseObject(r);
        return result;
    }

    public void updateVideo(VideoDTO videoDTO, Integer id) throws Exception {
        Video v = new Video();
        v.setUrl(videoDTO.getUrl());
        Video tempVideo = videoService.getVideo(v);

        tempVideo.setCategoryId(videoDTO.getCategoryStr());
//        tempVideo.setUrl(videoDTO.getUrl());
//
//        tempVideo.setTitle(videoDTO.getTitle());
//
        tempVideo.setDescription(videoDTO.getDescription());
//        tempVideo.setSeoTitle(videoDTO.getSeoTitle());
//
//        tempVideo.setSeoDescription(videoDTO.getSeoDescription());
//
//        tempVideo.setFocusedWord(videoDTO.getFocusedWord());
//
//        List<VideoLinks> videolinks = new ArrayList<VideoLinks>();
//
//        List<VideoLinksDTO> videoLinksDTO = videoDTO.getLinks();
//        if (videoLinksDTO != null) {
//            for (VideoLinksDTO dto : videoLinksDTO) {
//                VideoLinks v = new VideoLinks();
//                v.setId(dto.getId());
//                v.setText(dto.getText());
//                v.setUrl(dto.getUrl());
//                v.setVideoId(tempVideo);
//                v.setWorking(dto.getWorking());
//
//                videolinks.add(v);
//            }
//            tempVideo.setVideoLinksList(videolinks);
//        }

        videoService.updateVideo(tempVideo);

    }

    @RequestMapping(value = "{id}", method = RequestMethod.PUT)
    public @ResponseBody
    ResponseDTO updateVideoService(
            @RequestBody VideoDTO video,
            @PathVariable Integer id,
            HttpServletRequest request) throws Exception {
        ResponseDTO result = new ResponseDTO();

//        if (id < 1) {
//            throw new IllegalArgumentException("video id is wrong");
//        }
        authorizationUtil.checkUser(sessionService, request.getHeader("token"), 1);
        updateVideo(video, id);

        result.setSuccessMessage("succesfully saved");
        return result;
    }

    @RequestMapping(method = RequestMethod.POST)
    public @ResponseBody
    ResponseDTO addVideo(@RequestBody VideoDTO videoDTO, HttpServletRequest request) throws Exception {
        ResponseDTO result = new ResponseDTO();
        authorizationUtil.checkUser(sessionService, request.getHeader("token"), 1);

        Video tempVideo = new Video();

        SimpleDateFormat format = new SimpleDateFormat("dd-M-yyyy hh:mm:ss");
        String DateToStr = "";
        Date date = null;

        if (videoDTO.getDate() == null) {
            DateToStr = format.format(new Date());
            date = format.parse(DateToStr);
        } else {
            DateToStr = format.format(videoDTO.getDate());
            date = format.parse(DateToStr);
        }

        tempVideo.setCategoryId(videoDTO.getCategoryStr());
        tempVideo.setUrl(videoDTO.getUrl());
        //yazmisanda her sheyi  ne deirem ki men add nece olacaq onu soruwuram
        //add-de eyni qaydada neyi secmisense onlari gonderessen 
        //ancaq add duymesini basanda videodto-nun icine doldurub opshi gonderecen
        //
        tempVideo.setTitle(videoDTO.getTitle());
        tempVideo.setDescription(videoDTO.getDescription());
        tempVideo.setDate(date);
        tempVideo.setSeoTitle(videoDTO.getSeoTitle());
        tempVideo.setSeoDescription(videoDTO.getSeoDescription());
        tempVideo.setFocusedWord(videoDTO.getFocusedWord());

        List<VideoLinks> videolinks = new ArrayList<VideoLinks>();

        List<VideoLinksDTO> vieoLinksDTO = videoDTO.getLinks();

        for (VideoLinksDTO dto : vieoLinksDTO) {
            VideoLinks v = new VideoLinks();
            v.setText(dto.getText());
            v.setUrl(dto.getUrl());
            v.setVideoId(tempVideo);
            v.setWorking(dto.getWorking());

            videolinks.add(v);
        }
        tempVideo.setVideoLinksList(videolinks);

        videoService.addVideo(tempVideo);
        result.setSuccessMessage("succesfully saved");
        return result;

    }

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    public @ResponseBody
    ResponseDTO deleteVideo(@PathVariable Integer id, HttpServletRequest request) throws Exception {
        ResponseDTO result = new ResponseDTO();
        authorizationUtil.checkUser(sessionService, request.getHeader("token"), 1);

        if (id <= 0) {
            throw new IllegalArgumentException("video id is wrong");
        }
        Video temp = new Video(id);

        videoService.deleteVideo(temp);
        result.setSuccessMessage("succesfully deleted");
        return result;

    }

    @RequestMapping(method = RequestMethod.PUT)
    public @ResponseBody
    ResponseDTO updateVideos(@RequestBody List<VideoDTO> videos, HttpServletRequest request) throws Exception {
        ResponseDTO result = new ResponseDTO();

        authorizationUtil.checkUser(sessionService, request.getHeader("token"), 1);

        for (VideoDTO dto : videos) {
            updateVideo(dto, dto.getId());

        }
        result.setSuccessMessage("succesfully saved");
        return result;

    }

}
