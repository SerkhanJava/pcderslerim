package az.Vortex.SpringDevelopers.controller;

import az.Vortex.SpringDevelopers.dto.UserSessionDTO;
import az.Vortex.SpringDevelopers.model.UserSession;
import az.Vortex.SpringDevelopers.response.ResponseDTO;
import az.Vortex.SpringDevelopers.service.UserSessionService;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author Asus
 */
@Controller
public class UserSessionController {

    @Autowired
    private UserSessionService sessionService;

    @RequestMapping(value = "sessions", method = RequestMethod.GET)
    public @ResponseBody
    ResponseDTO getAllUserSession() throws Exception {
        ResponseDTO result = new ResponseDTO();
        List<UserSessionDTO> userSession = new ArrayList<UserSessionDTO>();

        List<UserSession> list = sessionService.getAllUserSession();
        for (int i = 0; i < list.size(); i++) {
            userSession.add(new UserSessionDTO(list.get(i)));
        }
        result.setResponseObject(userSession);
        return result;
    }

    @RequestMapping(value = "sessions/{sessionId}", method = RequestMethod.GET)
    public @ResponseBody
    ResponseDTO getUserSession(@PathVariable Integer sessionId) throws Exception  {
        ResponseDTO result = new ResponseDTO();
        UserSession r = sessionService.getUserSession(new UserSession(sessionId));

        result.setResponseObject(new UserSessionDTO(r));
        return result;
        
    }

}
