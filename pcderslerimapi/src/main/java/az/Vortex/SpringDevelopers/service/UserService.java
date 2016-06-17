/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package az.Vortex.SpringDevelopers.service;

import az.Vortex.SpringDevelopers.model.User;
import java.util.List;

/**
 *
 * @author Asus
 */
public interface UserService {
  
       public int sizeUser();
       
       public void addUser(User user);

       public void updateUser(User user);

       public User getUser(User user);

       public void deleteUser(User user);

       public List<User> getAllUser(User user,int begin, int end);
        
       public List<User> getAllUsers();
       
       public User getUserForLogin(User user);
}
