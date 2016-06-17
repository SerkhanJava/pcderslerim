/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dto;

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
