/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package az.Vortex.SpringDevelopers.utils;

import java.util.List;

/**
 *
 * @author Serkhan
 */
public class CheckboxResult {
    private List<Integer> mustBeInsert;
    private List<Integer> mustBeDelete;

    public CheckboxResult() {
    }

    public CheckboxResult(List<Integer> mustBeInsert, List<Integer> mustBeDelete) {
        this.mustBeInsert = mustBeInsert;
        this.mustBeDelete = mustBeDelete;
    }

    public List<Integer> getMustBeInsert() {
        return mustBeInsert;
    }

    public void setMustBeInsert(List<Integer> mustBeInsert) {
        this.mustBeInsert = mustBeInsert;
    }

    public List<Integer> getMustBeDelete() {
        return mustBeDelete;
    }

    public void setMustBeDelete(List<Integer> mustBeDelete) {
        this.mustBeDelete = mustBeDelete;
    }

    
}
