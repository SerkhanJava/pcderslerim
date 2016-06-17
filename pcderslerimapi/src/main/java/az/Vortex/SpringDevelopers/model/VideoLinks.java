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
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Asus
 */
@Entity
@Table(name = "video_links")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "VideoLinks.findAll", query = "SELECT v FROM VideoLinks v"),
    @NamedQuery(name = "VideoLinks.findById", query = "SELECT v FROM VideoLinks v WHERE v.id = :id"),
    @NamedQuery(name = "VideoLinks.findByUrl", query = "SELECT v FROM VideoLinks v WHERE v.url = :url"),
    @NamedQuery(name = "VideoLinks.findByText", query = "SELECT v FROM VideoLinks v WHERE v.text = :text"),
    @NamedQuery(name = "VideoLinks.findByWorking", query = "SELECT v FROM VideoLinks v WHERE v.working = :working")})
public class VideoLinks implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Size(max = 255)
    @Column(name = "url")
    private String url;
    @Size(max = 255)
    @Column(name = "text")
    private String text;
    @Basic(optional = false)
    @NotNull
    @Column(name = "working")
    private boolean working;
    @JoinColumn(name = "video_id", referencedColumnName = "id")
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private Video videoId;

    public VideoLinks() {
    }

    public VideoLinks(Integer id) {
        this.id = id;
    }

    public VideoLinks(Integer id, boolean working) {
        this.id = id;
        this.working = working;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public boolean getWorking() {
        return working;
    }

    public void setWorking(boolean working) {
        this.working = working;
    }

    public Video getVideoId() {
        return videoId;
    }

    public void setVideoId(Video videoId) {
        this.videoId = videoId;
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
        if (!(object instanceof VideoLinks)) {
            return false;
        }
        VideoLinks other = (VideoLinks) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "az.Vortex.SpringDevelopers.model.VideoLinks[ id=" + id + " ]";
    }
    
}
