/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package az.Vortex.SpringDevelopers.dao;

import az.Vortex.SpringDevelopers.model.Category;
import java.util.List;

/**
 *
 * @author Mensure
 */
public interface CategoryDAO {

    public void addCategory(Category category);

    public void updateCategory(Category category);

    public Category getCategory(Category category);

    //    public Category getCategory(int id);
    public void deleteCategory(Category category);

    public List<Category> getAllCategory();
}
