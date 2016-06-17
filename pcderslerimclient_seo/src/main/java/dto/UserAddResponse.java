/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dto;

/**
 *
 * @author SerkhanJava
 */
public class UserAddResponse {
    private String nameError;
    private String surnameError;
    private String emailError;
    private String alreadyExistError;
    private String passwordError;
    private String passwordRepeatError;
    private String mobileError;
    private String success;
    private String unknownError;
    private boolean hasError;
    
    public UserAddResponse() {
    }

    public String getNameError() {
        return nameError;
    }

    public void setNameError(String nameError) {
        this.nameError = nameError;
    }

    public String getSurnameError() {
        return surnameError;
    }

    public void setSurnameError(String surnameError) {
        this.surnameError = surnameError;
    }

    public String getEmailError() {
        return emailError;
    }

    public void setEmailError(String emailError) {
        this.emailError = emailError;
    }

    public String getPasswordError() {
        return passwordError;
    }

    public void setPasswordError(String passwordError) {
        this.passwordError = passwordError;
    }

    public String getPasswordRepeatError() {
        return passwordRepeatError;
    }

    public void setPasswordRepeatError(String passwordRepeatError) {
        this.passwordRepeatError = passwordRepeatError;
    }

    public String getMobileError() {
        return mobileError;
    }

    public void setMobileError(String mobileError) {
        this.mobileError = mobileError;
    }

    public boolean isHasError() {
        return hasError;
    }

    public void setHasError(boolean hasError) {
        this.hasError = hasError;
    }

    public String getSuccess() {
        return success;
    }

    public void setSuccess(String success) {
        this.success = success;
    }

    public String getUnknownError() {
        return unknownError;
    }

    public void setUnknownError(String unknownError) {
        this.unknownError = unknownError;
    }

    public String getAlreadyExistError() {
        return alreadyExistError;
    }

    public void setAlreadyExistError(String alreadyExistError) {
        this.alreadyExistError = alreadyExistError;
    }
     
    
}
