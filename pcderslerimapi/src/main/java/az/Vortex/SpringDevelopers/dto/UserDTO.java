/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package az.Vortex.SpringDevelopers.dto;

import az.Vortex.SpringDevelopers.model.User;
import az.Vortex.SpringDevelopers.response.CustomException;
import az.Vortex.SpringDevelopers.service.UserService;
import az.Vortex.SpringDevelopers.utils.EmailValidator;
import java.io.Serializable;
import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;

/**
 *
 * @author Asus
 */
public class UserDTO implements Serializable{

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

    public UserDTO(User user) {
        id = user.getId();
        name = user.getName();
        surname = user.getSurname();
        email = user.getEmail();
        activationToken = user.getActivationToken();
        facebookId = user.getFacebookId();
        twitterId = user.getTwitterId();
        gmailId = user.getGmailId();
        dateOfBirth = user.getDateOfBirth();
        address = user.getAddress();

        if (user.getRoleId() != null) {
            roleId = new UserRoleDTO(user.getRoleId());
        }

        if (user.getDeactivationDate() != null) {
            activate = 0;
        } else {
            activate = 1;
        }
        activationDate = user.getActivationDate();
        deactivationDate = user.getDeactivationDate();
        facebookId = user.getFacebookId();
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

    @Override
    public String toString() {
        return "UserDTO{" + "id=" + id + ", name=" + name + ", surname=" + surname + ", dateOfBirth=" + dateOfBirth + ", email=" + email + ", address=" + address + ", password=" + password + ", passwordRepeat=" + passwordRepeat + ", lastLoginDate=" + lastLoginDate + ", passwordSalt=" + passwordSalt + ", failedLoginAttempt=" + failedLoginAttempt + ", activationToken=" + activationToken + ", facebookId=" + facebookId + ", twitterId=" + twitterId + ", gmailId=" + gmailId + ", activationDate=" + activationDate + ", deactivationDate=" + deactivationDate + ", roleId=" + roleId + ", activate=" + activate + ", facebookAccessToken=" + facebookAccessToken + ", userService=" + userService + '}';
    }

    @Autowired
    private UserService userService;

    public void validate() throws CustomException {
        UserAddResponse result = new UserAddResponse();

        if (email == null || !EmailValidator.validate(email)) {
            result.setEmailError("email format is wrong");
            result.setHasError(true);
            System.out.println("here");
        }else{
            System.out.println("here 2");
        }

        if (name == null || name.length() == 0) {
            result.setHasError(true);
            result.setNameError("name is empty");
        }

        if (surname == null || surname.length() == 0) {
            result.setHasError(true);
            result.setSurnameError("surname is empty");
        }

        if (password == null || password.length() < 5) {
            result.setHasError(true);

            result.setPasswordError("password is less than 5");
        } else {
            if (passwordRepeat == null || !password.equals(passwordRepeat)) {
                result.setHasError(true);

                result.setPasswordRepeatError("passwords are not match");
            }
        }
        if (result.isHasError()) {

            CustomException ex = new CustomException();
            ex.setClientException(result);
            ex.setErrorMessageServer("Register Failed=" + result);
            throw ex;
        }
    }
}
