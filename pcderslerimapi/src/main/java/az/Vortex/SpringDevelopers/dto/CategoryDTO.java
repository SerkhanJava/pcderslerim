/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package az.Vortex.SpringDevelopers.dto;

import az.Vortex.SpringDevelopers.model.Category;

/**
 *
 * @author Mensure
 */
public class CategoryDTO {

    private Integer id;
    private String type;

    public CategoryDTO() {
        
    }

//    public static void main(String[] args) {
//        Queue q = new LinkedList();
//        q.add("dd");
//        HashSet d = new HashSet();
//        d.stream().sorted();
//        ArrayList ar = new ArrayList();
//        Matcher dd;
//    }

    public CategoryDTO(Category category) {
        id = category.getId();
        type = category.getType();

    }

    public CategoryDTO(Integer id, String type) {
        this.id = id;
        this.type = type;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

}
