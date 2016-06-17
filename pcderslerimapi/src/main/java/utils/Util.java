/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package utils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 *
 * @author Serkhan
 */
public class Util {

    public static CheckboxResult filterCheckboxes(List<Integer> existingCheckboxes,
            List<Integer> checkboxesAfterSelection) {
        CheckboxResult result = new CheckboxResult();

        List<Integer> list1 = new ArrayList(existingCheckboxes);
        List<Integer> list2 = new ArrayList(checkboxesAfterSelection);

       
        list1.removeAll(checkboxesAfterSelection);
        list2.removeAll(existingCheckboxes);

        result.setMustBeDelete(list1);
        result.setMustBeInsert(list2);

        return result;
    }
}
