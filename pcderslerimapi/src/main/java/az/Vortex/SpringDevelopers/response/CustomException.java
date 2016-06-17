package az.Vortex.SpringDevelopers.response;

public class CustomException extends Exception {
    //for server side
    private String errorMessageServer;
    
    //for client side
    private ResponseDTO clientException;

    public CustomException() {
    }

    public CustomException(String errorMessageServer, String errorMessageClient) {
        this.errorMessageServer = errorMessageServer;
        clientException = new ResponseDTO();
        clientException.setErrorMessage(errorMessageClient);
    }

    public String getErrorMessageServer() {
        return errorMessageServer;
    }

    public void setErrorMessageServer(String errorMessageServer) {
        this.errorMessageServer = errorMessageServer;
    }

    public ResponseDTO getClientException() {
        return clientException;
    }

    public void setClientException(ResponseDTO clientException) {
        this.clientException = clientException;
    } 
}
