package az.Vortex.SpringDevelopers.filters;

import az.Vortex.SpringDevelopers.response.ResponseDTO;
import az.Vortex.SpringDevelopers.response.CustomException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

@ControllerAdvice
public class CustomExceptionHandler {
    
    @ExceptionHandler(CustomException.class)
    public @ResponseBody
    ResponseDTO handleCustomException(CustomException ex, HttpServletResponse response) {
        response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
        Logger.getLogger(CustomExceptionHandler.class.getName()).log(Level.SEVERE, ex.getErrorMessageServer(), ex);
        return ex.getClientException();
    }
    
    @ExceptionHandler(Exception.class)
    public @ResponseBody
    ResponseDTO handleAllException(Exception ex, HttpServletResponse response) {
        Logger.getLogger(CustomExceptionHandler.class.getName()).log(Level.SEVERE, ex.toString(), ex);
        response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
        ResponseDTO result = new ResponseDTO();
        result.setErrorMessage("Error.Something is wrong");
        return result;        
    }
    
}
