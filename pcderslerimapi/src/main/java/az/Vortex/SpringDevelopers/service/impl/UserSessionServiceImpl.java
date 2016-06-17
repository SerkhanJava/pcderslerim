package az.Vortex.SpringDevelopers.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import az.Vortex.SpringDevelopers.dao.UserSessionDAO;
import az.Vortex.SpringDevelopers.model.UserSession;
import az.Vortex.SpringDevelopers.service.UserSessionService;

@Service
@Transactional
public class UserSessionServiceImpl implements UserSessionService{

	@Autowired
	private UserSessionDAO dao;
	
	@Override
	public void addUserSession(UserSession user) {
		dao.addUserSession(user);
	}

	@Override
	public void updateUserSession(UserSession user) {
		dao.updateUserSession(user);
	}

	@Override
	public UserSession getUserSession(UserSession user) {
		return dao.getUserSession(user);
	}

	@Override
	public void deleteUserSession(UserSession user) {
		dao.deleteUserSession(user);
	}

	@Override
	public List<UserSession> getAllUserSession() {
		return dao.getAllUserSession();
	}

    @Override
    public void invalidateAllSessions(UserSession user) {
     
    }

    

}
