package az.Vortex.SpringDevelopers.controller;

import az.Vortex.SpringDevelopers.dto.VideoLinksDTO;
import az.Vortex.SpringDevelopers.model.Video;
import az.Vortex.SpringDevelopers.model.VideoLinks;
import az.Vortex.SpringDevelopers.response.CustomException;
import az.Vortex.SpringDevelopers.response.ResponseDTO;
import az.Vortex.SpringDevelopers.service.UserSessionService;
import az.Vortex.SpringDevelopers.service.VideoLinksService;
import java.util.ArrayList;
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
public class VideoLinksController {

    AuthorizationUtil authorizationUtil = new AuthorizationUtil();

    @Autowired
    private VideoLinksService videoLinksService;

    @Autowired
    private UserSessionService sessionService;

    @RequestMapping(value = "videolinks", method = RequestMethod.GET)
    public @ResponseBody
    ResponseDTO getAllVideoLinks(@RequestParam(value = "begin", required = true) int begin,
            @RequestParam(value = "end", required = true) int end,
            @RequestParam(value = "working", required = false) Boolean working,
            HttpServletRequest request) throws Exception {
        ResponseDTO result = new ResponseDTO();
        List<VideoLinksDTO> videoLink = new ArrayList<VideoLinksDTO>();

        authorizationUtil.refreshSession(sessionService, request.getHeader("token"));

        List<VideoLinks> list = videoLinksService.getVideoLinks(null, begin, end, working);
        for (int i = 0; i < list.size(); i++) {
            videoLink.add(new VideoLinksDTO(list.get(i)));

        }

        result.setResponseObject(videoLink);
        return result;

    }

    @RequestMapping(value = "videolinks/{videoLinksId}", method = RequestMethod.GET)
    public @ResponseBody
    ResponseDTO getVideoLink(@PathVariable Integer videoLinksId, HttpServletRequest request) throws Exception {
        ResponseDTO result = new ResponseDTO();

        authorizationUtil.refreshSession(sessionService, request.getHeader("token"));
        VideoLinks r = videoLinksService.getVideoLink(new VideoLinks(videoLinksId));

        result.setResponseObject(new VideoLinksDTO(r));
        return result;
    }

    @RequestMapping(value = "videolinks/size", method = RequestMethod.GET, produces = "application/json")
    public @ResponseBody
    ResponseDTO sizeVideoLinks(@RequestParam(value = "working", required = false) Boolean working,
            HttpServletRequest request) throws Exception {
        ResponseDTO result = new ResponseDTO();
        int r = 0;

        authorizationUtil.refreshSession(sessionService, request.getHeader("token"));
        r = videoLinksService.sizeVideoLinks(working);
        System.out.println("r:=" + r);

        result.setResponseObject(r);
        return result;
    }

    @RequestMapping(value = "videolinks/{id}", method = RequestMethod.DELETE)
    public @ResponseBody
    ResponseDTO deleteVideoLinks(@PathVariable Integer id, HttpServletRequest request) throws Exception {
        ResponseDTO result = new ResponseDTO();
//            UserSession userSession = authorizationUtil.checkUser(sessionService, request.getHeader("token"), 1);

        VideoLinks temp = new VideoLinks(id);
        videoLinksService.deleteVideoLinks(temp);

        result.setSuccessMessage("succesfully deleted");
        return result;
    }

    @RequestMapping(value = "videolinks/{id}", method = RequestMethod.PUT, produces = "application/json")
    public @ResponseBody
    ResponseDTO updateVideoLink(@RequestBody VideoLinksDTO videoLinkDTO, @PathVariable Integer id,
            HttpServletRequest request) throws Exception {
        ResponseDTO result = new ResponseDTO();

//            UserSession userSession = authorizationUtil.checkUser(sessionService, request.getHeader("token"), 1);
        if (id < 1) {
            throw new IllegalArgumentException();
        }
        VideoLinks tempVideoLink = videoLinksService.getVideoLink(new VideoLinks(id));

        tempVideoLink.setWorking(false);

        videoLinksService.updateVideoLinks(tempVideoLink);
        result.setSuccessMessage("succesfully saved");
        return result;

    }

    @RequestMapping(value = "videolinks", method = RequestMethod.PUT)
    public @ResponseBody
    ResponseDTO updateVideoLinks(@RequestBody List<VideoLinksDTO> videoLinkDTOs,
            HttpServletRequest request) throws Exception {
        ResponseDTO result = new ResponseDTO();

        authorizationUtil.checkUser(sessionService, request.getHeader("token"), 1);

        for (VideoLinksDTO dto : videoLinkDTOs) {
            VideoLinks tempVideoLink = new VideoLinks();
            tempVideoLink.setId(dto.getId());

            tempVideoLink = videoLinksService.getVideoLink(tempVideoLink);

            tempVideoLink.setText(dto.getText());
            tempVideoLink.setUrl(dto.getUrl());
            tempVideoLink.setWorking(dto.getWorking());
        }

        result.setSuccessMessage("succesfully saved");
        return result;
    }

    @RequestMapping(value = "videolink/{id}", method = RequestMethod.PUT, produces = "application/json")
    public @ResponseBody
    ResponseDTO updatingVideoLink(@RequestBody VideoLinksDTO videoLinkDTO, @PathVariable Integer id,
            HttpServletRequest request) throws Exception {
        ResponseDTO result = new ResponseDTO();

//          UserSession userSession = authorizationUtil.checkUser(sessionService, request.getHeader("token"), 1);
        if (id < 1) {
            throw new IllegalArgumentException();
        }
        VideoLinks tempVideoLink = videoLinksService.getVideoLink(new VideoLinks(id));

        tempVideoLink.setUrl(videoLinkDTO.getUrl());
        tempVideoLink.setText(videoLinkDTO.getText());

        videoLinksService.updateVideoLinks(tempVideoLink);

        result.setSuccessMessage("succesfully saved");
        return result;
    }

    @RequestMapping(value = "videos/{id}/videolinks", method = RequestMethod.POST)
    public @ResponseBody
    ResponseDTO addVideoLink(@RequestBody VideoLinksDTO videoLinkDTO, @PathVariable Integer id,
            HttpServletRequest request) throws Exception {
        ResponseDTO result = new ResponseDTO();

        authorizationUtil.checkUser(sessionService, request.getHeader("token"), 1);
        if (videoLinkDTO.getUrl() == null && videoLinkDTO.getUrl().length() > 0) {
            throw new CustomException("trying to add again",
                    "Can't be added link");
        }
        VideoLinks tempVideoLink = new VideoLinks();
        tempVideoLink.setVideoId(new Video(id));
        tempVideoLink.setText(videoLinkDTO.getText());
        tempVideoLink.setUrl(videoLinkDTO.getUrl());
        tempVideoLink.setWorking(true);

        videoLinksService.addVideoLinks(tempVideoLink);
        result.setSuccessMessage("succesfully saved");
        return result;

    }

}
