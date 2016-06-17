package az.Vortex.SpringDevelopers.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import az.Vortex.SpringDevelopers.dao.CustomCategoryDAO;
import az.Vortex.SpringDevelopers.model.CustomCategory;
import az.Vortex.SpringDevelopers.service.CustomCategoryService;

@Service
@Transactional
public class CustomCategoryServiceImpl implements CustomCategoryService{

	@Autowired
	private CustomCategoryDAO dao;
	
	@Override
	public void addCustomCategory(CustomCategory customCategory) {
		dao.addCustomCategory(customCategory);
	}

	@Override
	public void updateCustomCategory(CustomCategory customCategory) {
		dao.updateCustomCategory(customCategory);
	}

	@Override
	public CustomCategory getCustomCategory(CustomCategory customCategory) {
		return dao.getCustomCategory(customCategory);
	}

	@Override
	public int deleteCustomCategory(CustomCategory customCategory,Integer categoryId1,Integer categoryId2) {
		return dao.deleteCustomCategory(customCategory,categoryId1,categoryId2);
	}

        
        @Override
	public List<CustomCategory> getAllCustomCategory(CustomCategory customCategory, Integer begin, Integer end, Integer categoryId1) {
		return dao.getAllCustomCategory(customCategory,begin,end,categoryId1);
	}
        
	@Override
	public List<CustomCategory> getAllCustomCategories() {
		return dao.getAllCustomCategories();
	}

}
