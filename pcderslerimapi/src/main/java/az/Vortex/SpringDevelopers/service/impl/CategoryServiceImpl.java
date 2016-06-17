package az.Vortex.SpringDevelopers.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import az.Vortex.SpringDevelopers.dao.CategoryDAO;
import az.Vortex.SpringDevelopers.model.Category;
import az.Vortex.SpringDevelopers.service.CategoryService;

@Service
@Transactional
public class CategoryServiceImpl implements CategoryService{

	@Autowired
	private CategoryDAO dao;
	
	@Override
	public void addCategory(Category category) {
		dao.addCategory(category);
	}

	@Override
	public void updateCategory(Category category) {
		dao.updateCategory(category);
	}

	@Override
	public Category getCategory(Category category) {
		return dao.getCategory(category);
	}

	@Override
	public void deleteCategory(Category category) {
		dao.deleteCategory(category);
	}

	@Override
	public List<Category> getAllCategory() {
		return dao.getAllCategory();
	}

}
