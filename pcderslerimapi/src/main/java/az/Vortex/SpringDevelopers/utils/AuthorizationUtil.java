/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package az.Vortex.SpringDevelopers.utils;

import az.Vortex.SpringDevelopers.model.UserSession;
import az.Vortex.SpringDevelopers.service.UserSessionService;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import org.hibernate.SessionException;

public class AuthorizationUtil {

    public UserSession refreshSession(UserSessionService serviceUserSession, String token) throws Exception {
        UserSession userSession = null;
        if (token != null && !token.isEmpty()) {
            userSession = new UserSession();
            userSession.setToken(token);
            userSession = serviceUserSession.getUserSession(userSession);
        }

        if (userSession == null) {
            return null;
        }
//        LocalDateTime ldt = LocalDateTime.now().plusMinutes(10);
//        Date dt = Date.from(ldt.atZone(ZoneId.systemDefault()).toInstant());
        Date dt = new Date();
        LocalDateTime ldt = LocalDateTime.ofInstant(dt.toInstant(), ZoneId.systemDefault());

        userSession.setExpiryDt(dt);
        serviceUserSession.updateUserSession(userSession);

        return userSession;
    }

    public UserSession checkUser(UserSessionService serviceUserSession, String token, int role) throws Exception {
        if (token == null) {
            throw new SessionException("no such session");
        }

        UserSession userSession = refreshSession(serviceUserSession, token);

        if (userSession == null) {
            throw new SessionException("no such session");
        }

        if (userSession.getUserId().getRoleId().getId() != role) {
            throw new Exception("you do not have permission");
        }

        return userSession;
    }
}
