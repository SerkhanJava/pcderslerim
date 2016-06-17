/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package dto;
 
import java.util.Date;

/**
 *
 * @author Asus
 */
public class UserSessionDTO {
    private Integer id;
    private String token;
    private Date expiryDt;
    private Date loginDt;
    private Date logoutDt;
    private UserDTO userId;
    
    public UserSessionDTO(){
    }
     
    public UserSessionDTO(Integer id, String token, Date expiryDt, Date loginDt, Date logoutDt, UserDTO userId) {
        this.id = id;
        this.token = token;
        this.expiryDt = expiryDt;
        this.loginDt = loginDt;
        this.logoutDt = logoutDt;
        this.userId = userId;
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

    public UserDTO getUserId() {
        return userId;
    }

    public void setUserId(UserDTO userId) {
        this.userId = userId;
    }
     
     
}
