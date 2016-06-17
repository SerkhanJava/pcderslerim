package az.Vortex.SpringDevelopers.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import az.Vortex.SpringDevelopers.dao.UserRoleDAO;
import az.Vortex.SpringDevelopers.model.UserRole;
import az.Vortex.SpringDevelopers.service.UserRoleService;

@Service
@Transactional
public class UserRoleServiceImpl implements UserRoleService{

	@Autowired
	private UserRoleDAO dao;
	
	@Override
	public void addUserRole(UserRole role) {
		dao.addUserRole(role);
	}

	@Override
	public void updateUserRole(UserRole role) {
		dao.updateUserRole(role);
	}

	@Override
	public UserRole getUserRole(UserRole role) {
		return dao.getUserRole(role);
	}

	@Override
	public void deleteUserRole(UserRole role) {
		dao.deleteUserRole(role);
	}

	@Override
	public List<UserRole> getAllUserRole() {
		return dao.getAllUserRole();
	}

}
