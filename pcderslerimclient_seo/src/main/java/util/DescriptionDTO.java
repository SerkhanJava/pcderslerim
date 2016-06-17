/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package util;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Zeynal
 */
public class DescriptionDTO {

    private String h1, h2, p;
    private List<String> ulLi;
    private List<String> olLi;

    public DescriptionDTO() {
    }

    public DescriptionDTO(String h1, String h2, String p, List<String> ulLi, List<String> olLi) {
        this.h1 = h1;
        this.h2 = h2;
        this.p = p;
        this.ulLi = ulLi;
        this.olLi = olLi;
    }

    public String getH1() {
        return h1;
    }

    public void setH1(String h1) {
        this.h1 = h1;
    }

    public String getH2() {
        return h2;
    }

    public void setH2(String h2) {
        this.h2 = h2;
    }

    public String getP() {
        return p;
    }

    public void setP(String p) {
        this.p = p;
    }

    public List<String> getUlLi() {
        return ulLi;
    }

    public void setUlLi(List<String> ulLi) {
        this.ulLi = ulLi;
    }

    public List<String> getOlLi() {
        return olLi;
    }

    public void setOlLi(List<String> olLi) {
        this.olLi = olLi;
    }

    @Override
    public String toString() {
        return "DescriptionDTO{" + "h1=" + h1 + ", h2=" + h2 + ", p=" + p + ", ulLi=" + ulLi + ", olLi=" + olLi + '}';
    }

    
    
    
}
