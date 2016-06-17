package az.Vortex.SpringDevelopers.dao.impl;

import az.Vortex.SpringDevelopers.dao.CategoryDAO;
import az.Vortex.SpringDevelopers.model.Category;
import java.util.List;

import org.springframework.stereotype.Repository;

@Repository
public class CategoryDAOImpl extends SessionFacImpl implements CategoryDAO {

    @Override
    public void addCategory(Category category) {
        getSession().save(category);
    }

    @Override
    public void updateCategory(Category category) {
        getSession().update(category);
    }

    @Override
    public Category getCategory(Category category) {
        Category c = (Category) getSession().get(Category.class, category.getId());
        return c;
    }

    @Override
    public void deleteCategory(Category c) {
        getSession().delete(c);
    }

    @Override
    @SuppressWarnings("unchecked")
    public List<Category> getAllCategory() {
        List<Category> result = getSession().getNamedQuery("Category.findAll").list();
        return result;
    }

}
