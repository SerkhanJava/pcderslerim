package az.Vortex.SpringDevelopers.service;

import az.Vortex.SpringDevelopers.model.CustomCategory;
import java.util.List;
 
public interface CustomCategoryService {

    public void addCustomCategory(CustomCategory customCategory);

    public void updateCustomCategory(CustomCategory customCategory);

    public CustomCategory getCustomCategory(CustomCategory customCategory);

    //    public CustomCategory getCustomCategory(int id);
    public int deleteCustomCategory(CustomCategory customCategory,Integer categoryId1,Integer categoryId2);

   public List<CustomCategory> getAllCustomCategory(CustomCategory customCategory,Integer begin,Integer end,Integer categoryId1);
    
    public List<CustomCategory> getAllCustomCategories();
}
