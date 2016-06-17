/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package az.Vortex.SpringDevelopers.service;

import az.Vortex.SpringDevelopers.model.UserRole;
import java.util.List;

/**
 *
 * @author Mensure
 */
public interface UserRoleService {
    public void addUserRole(UserRole role);
    

	public void updateUserRole(UserRole role);

	public UserRole getUserRole(UserRole role);
        
    //    public UserRole getUserRole(int id);

	public void deleteUserRole(UserRole role);

	public List<UserRole> getAllUserRole();
}
