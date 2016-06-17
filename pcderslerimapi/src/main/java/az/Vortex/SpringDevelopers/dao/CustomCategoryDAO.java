/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package az.Vortex.SpringDevelopers.dao;

import az.Vortex.SpringDevelopers.model.CustomCategory;
import java.util.List;

/**
 *
 * @author Asus
 */
public interface CustomCategoryDAO {
      public void addCustomCategory(CustomCategory customCategory);

    public void updateCustomCategory(CustomCategory customCategory);

    public CustomCategory getCustomCategory(CustomCategory customCategory);

    //    public CustomCategory getCustomCategory(int id);
    public int deleteCustomCategory(CustomCategory customCategory,Integer categoryId1,Integer categoryId2);

    public List<CustomCategory> getAllCustomCategory(CustomCategory customCategory,Integer begin,Integer end,Integer categoryId1);
    
    public List<CustomCategory> getAllCustomCategories();
}
