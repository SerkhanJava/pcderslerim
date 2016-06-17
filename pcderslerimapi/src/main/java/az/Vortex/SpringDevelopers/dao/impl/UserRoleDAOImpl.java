package az.Vortex.SpringDevelopers.dao.impl;

import az.Vortex.SpringDevelopers.dao.UserRoleDAO;
import az.Vortex.SpringDevelopers.model.UserRole;
import java.util.List;

import org.springframework.stereotype.Repository;

@Repository
public class UserRoleDAOImpl extends SessionFacImpl implements UserRoleDAO {

    @Override
    public void addUserRole(UserRole role) {
        getSession().save(role);
    }

    @Override
    public void updateUserRole(UserRole role) {
        getSession().update(role);
    }

    @Override
	public UserRole getUserRole(UserRole role) {
//		return (UserRole)getSession().get(UserRole.class, role);
              UserRole c = (UserRole) getSession().get(UserRole.class, role.getId());
                return c;
	}
    @Override
    public void deleteUserRole(UserRole role) {
        
            getSession().delete(role);
       
    }

    @Override
    @SuppressWarnings("unchecked")
    public List<UserRole> getAllUserRole() {
        return getSession().getNamedQuery("UserRole.findAll").list();
    }

    
    
}

