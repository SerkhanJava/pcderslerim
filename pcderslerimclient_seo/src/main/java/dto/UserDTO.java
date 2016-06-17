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
public class UserDTO {

    private Integer id;
    private String name;
    private String surname;
    private Date dateOfBirth;
    private String email;
    private String address;
    private String password;
    private String passwordRepeat;
    private Date lastLoginDate;
    private String passwordSalt;
    private Integer failedLoginAttempt;
    private String activationToken;

    private String facebookId;
    private String twitterId;
    private String gmailId;
    private Date activationDate;
    private Date deactivationDate;
    private UserRoleDTO roleId;
    private Integer activate;
    
    private String facebookAccessToken;

    public UserDTO() {

    } 
    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getSurname() {
        return surname;
    }

    public String getEmail() {
        return email;
    }

    public String getFacebookId() {
        return facebookId;
    }

    public String getTwitterId() {
        return twitterId;
    }

    public String getGmailId() {
        return gmailId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Date getActivationDate() {
        return activationDate;
    }

    public Date getDeactivationDate() {
        return deactivationDate;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Date getLastLoginDate() {
        return lastLoginDate;
    }

    public void setLastLoginDate(Date lastLoginDate) {
        this.lastLoginDate = lastLoginDate;
    }

    public String getPasswordSalt() {
        return passwordSalt;
    }

    public void setPasswordSalt(String passwordSalt) {
        this.passwordSalt = passwordSalt;
    }

    public Integer getFailedLoginAttempt() {
        return failedLoginAttempt;
    }

    public void setFailedLoginAttempt(Integer failedLoginAttempt) {
        this.failedLoginAttempt = failedLoginAttempt;
    }

    public UserRoleDTO getRoleId() {
        return roleId;
    }

    public void setRoleId(UserRoleDTO roleId) {
        this.roleId = roleId;
    }

    public Integer getActivate() {
        return activate;
    }

    public void setActivate(Integer activate) {
        this.activate = activate;
    }

    public String getPasswordRepeat() {
        return passwordRepeat;
    }

    public void setPasswordRepeat(String passwordRepeat) {
        this.passwordRepeat = passwordRepeat;
    }

    public String getFacebookAccessToken() {
        return facebookAccessToken;
    }

    public void setFacebookAccessToken(String facebookAccessToken) {
        this.facebookAccessToken = facebookAccessToken;
    }

    public String getActivationToken() {
        return activationToken;
    }

    public void setActivationToken(String activationToken) {
        this.activationToken = activationToken;
    }
     
}
