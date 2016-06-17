package az.Vortex.SpringDevelopers.dao;

import java.util.List;

import az.Vortex.SpringDevelopers.model.User;


public interface UserDAO {
        public int sizeUser();
    
        public void addUser(User user);

	public void updateUser(User user);

	public User getUser(User user);

	public void deleteUser(User user);

	public List<User> getAllUser(User user,int begin,int end);
        
        public List<User> getAllUsers();
        
        public User getUserForLogin(User user);
}
