package dto;

public class UserLoginResponseObject  {

    private String token;
    private UserDTO user;

    public UserLoginResponseObject() {
    }



    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

}
