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
@Table(name = "user_session")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "UserSession.findAll", query = "SELECT u FROM UserSession u"),
    @NamedQuery(name = "UserSession.findById", query = "SELECT u FROM UserSession u WHERE u.id = :id"),
    @NamedQuery(name = "UserSession.findByToken", query = "SELECT u FROM UserSession u WHERE u.token = :token"),
    @NamedQuery(name = "UserSession.findByExpiryDt", query = "SELECT u FROM UserSession u WHERE u.expiryDt = :expiryDt"),
    @NamedQuery(name = "UserSession.findByLoginDt", query = "SELECT u FROM UserSession u WHERE u.loginDt = :loginDt"),
    @NamedQuery(name = "UserSession.findByLogoutDt", query = "SELECT u FROM UserSession u WHERE u.logoutDt = :logoutDt")})
public class UserSession implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Size(max = 225)
    @Column(name = "token")
    private String token;
    @Column(name = "expiry_dt")
    @Temporal(TemporalType.TIMESTAMP)
    private Date expiryDt;
    @Column(name = "login_dt")
    @Temporal(TemporalType.TIMESTAMP)
    private Date loginDt;
    @Column(name = "logout_dt")
    @Temporal(TemporalType.TIMESTAMP)
    private Date logoutDt;
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @ManyToOne(fetch = FetchType.EAGER)
    private User userId;

    public UserSession() {
    }

    public UserSession(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Date getExpiryDt() {
        return expiryDt;
    }

    public void setExpiryDt(Date expiryDt) {
        this.expiryDt = expiryDt;
    }

    public Date getLoginDt() {
        return loginDt;
    }

    public void setLoginDt(Date loginDt) {
        this.loginDt = loginDt;
    }

    public Date getLogoutDt() {
        return logoutDt;
    }

    public void setLogoutDt(Date logoutDt) {
        this.logoutDt = logoutDt;
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
        if (!(object instanceof UserSession)) {
            return false;
        }
        UserSession other = (UserSession) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "az.Vortex.SpringDevelopers.model.UserSession[ id=" + id + " ]";
    }
    
}
