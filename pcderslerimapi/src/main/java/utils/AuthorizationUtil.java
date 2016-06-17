/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package utils;

import az.Vortex.SpringDevelopers.model.UserSession;
import az.Vortex.SpringDevelopers.service.UserSessionService;
import java.time.Instant;
import java.time.LocalDate;
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

//        LocalDateTime dateTime = LocalDateTime.now().plusMinutes(10).ofInstant(dt.toInstant(), ZoneId.systemDefault());
//        Instant instant;
//        instant = dateTime.atZone(ZoneId.systemDefault()).toInstant();
        
        
        Instant instant = Instant.ofEpochMilli(dt.getTime());
        LocalDate res = LocalDateTime.now().plusMinutes(10).ofInstant(instant, ZoneId.systemDefault()).toLocalDate();
      
        
        dt = Date.from(instant);
        System.out.println(dt);
        userSession.setExpiryDt(dt);
        serviceUserSession.updateUserSession(userSession);

        return userSession;
    }

    public UserSession checkUser(UserSessionService serviceUserSession, String token, int role) throws Exception {
        System.out.println("token=" + token);
        if (token == null) {
            throw new SessionException("no such session");
        }

        UserSession userSession = refreshSession(serviceUserSession, token);

        if (userSession == null) {
            System.out.println("user sesssion is null");
            throw new SessionException("no such session");
        }

        if (userSession.getUserId().getRoleId().getId() != role) {
            throw new Exception("you do not have permission");
        }

        return userSession;
    }
       
}
