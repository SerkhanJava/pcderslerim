package az.Vortex.SpringDevelopers.response;

import java.io.Serializable;

public class ResponseDTO implements Serializable{

    private String successMessage;
    private String errorMessage;
    private Object responseObject;

    public ResponseDTO() {
    }

    public ResponseDTO(String successMessage, String errorMessage, Object responseObject) {
        this.successMessage = successMessage;
        this.errorMessage = errorMessage;
        this.responseObject = responseObject;
    }
    
    public String getSuccessMessage() {
        return successMessage;
    }

    public void setSuccessMessage(String successMessage) {
        this.successMessage = successMessage;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public Object getResponseObject() {
        return responseObject;
    }

    public void setResponseObject(Object responseObject) {
        this.responseObject = responseObject;
    }

}
