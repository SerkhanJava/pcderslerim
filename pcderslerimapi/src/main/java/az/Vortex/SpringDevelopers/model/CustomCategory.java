/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package az.Vortex.SpringDevelopers.model;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Asus
 */
@Entity
@Table(name = "custom_category")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "CustomCategory.findAll", query = "SELECT c FROM CustomCategory c"),
    @NamedQuery(name = "CustomCategory.findById", query = "SELECT c FROM CustomCategory c WHERE c.id = :id")})
public class CustomCategory implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @JoinColumn(name = "category_id1", referencedColumnName = "id")
    @ManyToOne(fetch = FetchType.EAGER)
    private Category categoryId1;
    @JoinColumn(name = "category_id2", referencedColumnName = "id")
    @ManyToOne(fetch = FetchType.EAGER)
    private Category categoryId2;

    public CustomCategory() {
    }

    public CustomCategory(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Category getCategoryId1() {
        return categoryId1;
    }

    public void setCategoryId1(Category categoryId1) {
        this.categoryId1 = categoryId1;
    }

    public Category getCategoryId2() {
        return categoryId2;
    }

    public void setCategoryId2(Category categoryId2) {
        this.categoryId2 = categoryId2;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof CustomCategory)) {
            return false;
        }
        CustomCategory other = (CustomCategory) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "az.Vortex.SpringDevelopers.model.CustomCategory[ id=" + id + " ]";
    }
    
}
