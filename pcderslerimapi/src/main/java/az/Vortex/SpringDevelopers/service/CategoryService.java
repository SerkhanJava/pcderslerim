package az.Vortex.SpringDevelopers.service;

import az.Vortex.SpringDevelopers.model.Category;
import java.util.List;
 
public interface CategoryService {

    public void addCategory(Category category);

    public void updateCategory(Category category);

    public Category getCategory(Category category);

    //    public Category getCategory(int id);
    public void deleteCategory(Category category);

    public List<Category> getAllCategory();
}
