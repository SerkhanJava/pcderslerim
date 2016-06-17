/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package az.Vortex.SpringDevelopers.dto;

import az.Vortex.SpringDevelopers.model.CustomCategory;

/**
 *
 * @author Asus
 */
public class CustomCategoryDTO {

    private Integer id;
    private CategoryDTO categoryId1;
    private CategoryDTO categoryId2;

    public CustomCategoryDTO() {
    }

    public CustomCategoryDTO(CustomCategory cc) {
        id = cc.getId();
        
        if(cc.getCategoryId1()!=null){
        categoryId1=new CategoryDTO(cc.getCategoryId2());
        }
        if(cc.getCategoryId2()!=null){
        categoryId2=new CategoryDTO(cc.getCategoryId2());
        }
    }

    public CustomCategoryDTO(Integer id, CategoryDTO categoryId1, CategoryDTO categoryId2) {
        this.id = id;
        this.categoryId1 = categoryId1;
        this.categoryId2 = categoryId2;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public CategoryDTO getCategoryId1() {
        return categoryId1;
    }

    public void setCategoryId1(CategoryDTO categoryId1) {
        this.categoryId1 = categoryId1;
    }

    public CategoryDTO getCategoryId2() {
        return categoryId2;
    }

    public void setCategoryId2(CategoryDTO categoryId2) {
        this.categoryId2 = categoryId2;
    }

}
