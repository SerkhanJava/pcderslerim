package az.Vortex.SpringDevelopers.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import az.Vortex.SpringDevelopers.dao.UserDAO;
import az.Vortex.SpringDevelopers.model.User;
import az.Vortex.SpringDevelopers.service.UserService;

@Service
@Transactional
public class UserServiceImpl implements UserService{

	@Autowired
	private UserDAO dao;
	
	@Override
	public void addUser(User user) {
		dao.addUser(user);
	}
        
        @Override
	public int sizeUser() {
         return	dao.sizeUser();
            
	}

	@Override
	public void updateUser(User user) {
		dao.updateUser(user);
	}

	@Override
	public User getUser(User user) {
		return dao.getUser(user);
	}

	@Override
	public void deleteUser(User user) {
		dao.deleteUser(user);
	}

	@Override
	public List<User> getAllUser(User user,int begin, int end){
		return dao.getAllUser(user,begin,end);
	}
        @Override
        public List<User> getAllUsers() {
        return dao.getAllUsers();
    }
        @Override
	public User getUserForLogin(User user) {
		return dao.getUserForLogin(user);
	}
}
