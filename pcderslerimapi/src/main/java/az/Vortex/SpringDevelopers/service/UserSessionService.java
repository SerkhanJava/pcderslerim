/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package az.Vortex.SpringDevelopers.service;

import az.Vortex.SpringDevelopers.model.UserSession;
import java.util.List;

/**
 *
 * @author Mensure
 */
public interface UserSessionService {
        public void addUserSession(UserSession user);
    
        
        public void invalidateAllSessions(UserSession user);

	public void updateUserSession(UserSession user);

	public UserSession getUserSession(UserSession user);
        
    //    public UserSession getUserSession(int id);

	public void deleteUserSession(UserSession user);

	public List<UserSession> getAllUserSession();
}
