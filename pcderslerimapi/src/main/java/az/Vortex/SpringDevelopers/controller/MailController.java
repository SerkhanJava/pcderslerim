package az.Vortex.SpringDevelopers.controller;

import az.Vortex.SpringDevelopers.dto.MailDTO;
import az.Vortex.SpringDevelopers.model.User;
import az.Vortex.SpringDevelopers.response.ResponseDTO;
import az.Vortex.SpringDevelopers.service.PictureService;
import az.Vortex.SpringDevelopers.service.UserService;
import az.Vortex.SpringDevelopers.service.UserSessionService;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import org.springframework.web.bind.annotation.ResponseBody;
import utils.AuthorizationUtil;
import utils.EmailValidator;
import utils.MailUtil;

/**
 *
 * @author Asus
 */
@Controller
public class MailController {

    AuthorizationUtil authorizationUtil = new AuthorizationUtil();

    @Autowired
    private PictureService pictureService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserSessionService sessionService;

    @RequestMapping(value = "mails", method = RequestMethod.POST)
    public @ResponseBody
    ResponseDTO sendEmail(@RequestBody MailDTO mailDTO,
            HttpServletRequest request) throws Exception {
        authorizationUtil.checkUser(sessionService, request.getHeader("token"), 1);

        List<User> users = userService.getAllUsers();
        if (mailDTO.getTo() == null || mailDTO.getTo().isEmpty()) {
            String to = "afganrasulov@gmail.com";
            if (users != null) {
                for (int i = 0; i < users.size(); i++) {
                    if (EmailValidator.validate(users.get(i).getEmail())) {
                        mailDTO.setTo(users.get(i).getEmail());
                        MailUtil.sendEmail(mailDTO);
                    }
                }
            }
        }

        ResponseDTO result = new ResponseDTO();
        MailUtil.sendEmail(mailDTO);
        result.setSuccessMessage("succesfully saved");
        return result;

    }
}
