/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package az.Vortex.SpringDevelopers.dao;

import az.Vortex.SpringDevelopers.model.UserSession;
import java.util.List;

/**
 *
 * @author Mensure
 */
public interface UserSessionDAO {
        
        public void addUserSession(UserSession userSession);

	public void updateUserSession(UserSession userSession);
        
        public void invalidateAllSessions(UserSession userSession);

	public UserSession getUserSession(UserSession userSession);
        
    //    public UserSession getUserSession(int id);

	public void deleteUserSession(UserSession userSession);

	public List<UserSession> getAllUserSession();
}
