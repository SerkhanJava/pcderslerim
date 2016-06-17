package az.Vortex.SpringDevelopers.controller;

import az.Vortex.SpringDevelopers.dto.PictureDTO;
import az.Vortex.SpringDevelopers.model.Picture;
import az.Vortex.SpringDevelopers.model.User;
import az.Vortex.SpringDevelopers.response.CustomException;
import az.Vortex.SpringDevelopers.response.ResponseDTO;
import az.Vortex.SpringDevelopers.service.PictureService;
import az.Vortex.SpringDevelopers.service.UserSessionService;
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

import org.springframework.web.bind.annotation.ResponseBody;
import utils.AuthorizationUtil;

/**
 *
 * @author Asus
 */
@Controller
public class PictureController {

    AuthorizationUtil authorizationUtil = new AuthorizationUtil();

    @Autowired
    private PictureService pictureService;

    @Autowired
    private UserSessionService sessionService;

    @RequestMapping(value = "pictures", method = RequestMethod.GET)
    public @ResponseBody
    ResponseDTO getAllPicture(HttpServletRequest request)throws Exception {
        ResponseDTO result = new ResponseDTO();
        List<PictureDTO> pic = new ArrayList<PictureDTO>();
       
            authorizationUtil.refreshSession(sessionService, request.getHeader("token"));

            List<Picture> list = pictureService.getAllPicture();

            for (int i = 0; i < list.size(); i++) {
                pic.add(new PictureDTO(list.get(i)));
            }
       

        result.setResponseObject(pic);
        return result;
    }

    @RequestMapping(value = "pictures/{pictureId}", method = RequestMethod.GET)
    public @ResponseBody
    ResponseDTO getPicture(@PathVariable Integer pictureId, HttpServletRequest request) throws Exception {
         ResponseDTO result = new ResponseDTO();
            authorizationUtil.refreshSession(sessionService, request.getHeader("token"));

            Picture r = pictureService.getPicture(new Picture(pictureId));
             
             
        result.setResponseObject(new PictureDTO(r));
        return result;
    }

    @RequestMapping(value = "pictures/{id}", method = RequestMethod.PUT)
    public @ResponseBody
    ResponseDTO updatePicture(@RequestBody PictureDTO picture,
            @PathVariable Integer id, HttpServletRequest request) throws Exception {
        ResponseDTO result = new ResponseDTO();

        if (id <= 0) {
            throw new IllegalArgumentException("picture id is wrong");
        }
        Picture pic = pictureService.getPicture(new Picture(id));

        if (pic == null) {
            throw new CustomException("trying to update picture but there is  not such  picture,pictureId=" + id,
                    "Can't be updated picture.There is  not such picture");
        }
        pic.setUserId(new User(picture.getUserId().getId()));
        
        pic.setId(picture.getId());
        pic.setUrl(picture.getUrl());
        pic.setText(picture.getText());
       
        pictureService.updatePicture(pic);
        result.setSuccessMessage("succesfully saved");
        return result;
    }

//    
  

    @RequestMapping(value = "pictures/{id}", method = RequestMethod.DELETE)
    public @ResponseBody
    ResponseDTO deletePicture(@PathVariable Integer id, HttpServletRequest request) throws Exception {
        ResponseDTO result = new ResponseDTO();
       
        if (id <= 0) {
            throw new IllegalArgumentException("picture id is wrong");
        }
        Picture temp = new Picture(id);

        pictureService.deletePicture(temp);

        result.setSuccessMessage("succesfully deleted");
        return result;
    }
    
    
       @RequestMapping(value = "users/{id}/pictures", method = RequestMethod.POST)
    public @ResponseBody
    ResponseDTO addPicture(@RequestBody PictureDTO picture, @PathVariable Integer id,
            HttpServletRequest request) throws Exception {
        ResponseDTO result = new ResponseDTO();

        if (picture.getUrl() == null && picture.getUrl().length() > 0) {
            throw new CustomException("trying to add again",
                    "Can't be added link");
        }
        Picture tempPicture = new Picture();
        tempPicture.setUserId(new User(id));
        tempPicture.setText(picture.getText());
        tempPicture.setUrl(picture.getUrl());
        

        pictureService.addPicture(tempPicture);
        result.setSuccessMessage("succesfully saved");
        return result;

    }
}
