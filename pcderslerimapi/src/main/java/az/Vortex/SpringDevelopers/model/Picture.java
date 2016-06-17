/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package az.Vortex.SpringDevelopers.model;

import java.io.Serializable;
import java.util.Date;
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
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Asus
 */
@Entity
@Table(name = "picture")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Picture.findAll", query = "SELECT p FROM Picture p"),
    @NamedQuery(name = "Picture.findById", query = "SELECT p FROM Picture p WHERE p.id = :id"),
    @NamedQuery(name = "Picture.findByDislikeCount", query = "SELECT p FROM Picture p WHERE p.dislikeCount = :dislikeCount"),
    @NamedQuery(name = "Picture.findByLikeCount", query = "SELECT p FROM Picture p WHERE p.likeCount = :likeCount"),
    @NamedQuery(name = "Picture.findByUrl", query = "SELECT p FROM Picture p WHERE p.url = :url"),
    @NamedQuery(name = "Picture.findByWowCount", query = "SELECT p FROM Picture p WHERE p.wowCount = :wowCount"),
    @NamedQuery(name = "Picture.findByConfirmationDate", query = "SELECT p FROM Picture p WHERE p.confirmationDate = :confirmationDate"),
    @NamedQuery(name = "Picture.findByInsertDate", query = "SELECT p FROM Picture p WHERE p.insertDate = :insertDate"),
    @NamedQuery(name = "Picture.findByText", query = "SELECT p FROM Picture p WHERE p.text = :text")})
public class Picture implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Column(name = "dislike_count")
    private Integer dislikeCount;
    @Column(name = "like_count")
    private Integer likeCount;
    @Size(max = 255)
    @Column(name = "url")
    private String url;
    @Column(name = "wow_count")
    private Integer wowCount;
    @Column(name = "confirmation_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date confirmationDate;
    @Column(name = "insert_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date insertDate;
    @Size(max = 255)
    @Column(name = "text")
    private String text;
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @ManyToOne(fetch = FetchType.EAGER)
    private User userId;

    public Picture() {
    }

    public Picture(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getDislikeCount() {
        return dislikeCount;
    }

    public void setDislikeCount(Integer dislikeCount) {
        this.dislikeCount = dislikeCount;
    }

    public Integer getLikeCount() {
        return likeCount;
    }

    public void setLikeCount(Integer likeCount) {
        this.likeCount = likeCount;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Integer getWowCount() {
        return wowCount;
    }

    public void setWowCount(Integer wowCount) {
        this.wowCount = wowCount;
    }

    public Date getConfirmationDate() {
        return confirmationDate;
    }

    public void setConfirmationDate(Date confirmationDate) {
        this.confirmationDate = confirmationDate;
    }

    public Date getInsertDate() {
        return insertDate;
    }

    public void setInsertDate(Date insertDate) {
        this.insertDate = insertDate;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public User getUserId() {
        return userId;
    }

    public void setUserId(User userId) {
        this.userId = userId;
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
        if (!(object instanceof Picture)) {
            return false;
        }
        Picture other = (Picture) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "az.Vortex.SpringDevelopers.model.Picture[ id=" + id + " ]";
    }
    
}
