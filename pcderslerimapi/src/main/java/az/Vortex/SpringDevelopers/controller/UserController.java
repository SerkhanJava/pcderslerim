package az.Vortex.SpringDevelopers.controller;

import az.Vortex.SpringDevelopers.dto.MailDTO;
import az.Vortex.SpringDevelopers.dto.UserAddResponse;
import az.Vortex.SpringDevelopers.dto.UserDTO;
import az.Vortex.SpringDevelopers.dto.UserLoginResponseObject;
import az.Vortex.SpringDevelopers.model.User;
import az.Vortex.SpringDevelopers.model.UserRole;
import az.Vortex.SpringDevelopers.model.UserSession;
import az.Vortex.SpringDevelopers.response.CustomException;
import az.Vortex.SpringDevelopers.response.ResponseDTO;
import az.Vortex.SpringDevelopers.service.UserService;
import az.Vortex.SpringDevelopers.service.UserSessionService;
import az.Vortex.SpringDevelopers.utils.MailUtil;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.nio.charset.Charset;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.ws.Response;
import org.apache.commons.lang.StringEscapeUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;
import utils.AuthorizationUtil;
import utils.EmailValidator;
import utils.SecurityUtils;

@Controller
@RequestMapping("users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserSessionService sessionService;
    AuthorizationUtil authorizationUtil = new AuthorizationUtil();

    @RequestMapping(method = RequestMethod.GET, produces = "application/json")
    public   ResponseDTO getUsers(@RequestParam(value = "begin", required = true) int begin,
            @RequestParam(value = "end", required = true) int end,
            HttpServletRequest request) throws CustomException, Exception {
        ResponseDTO result = new ResponseDTO();
        List<UserDTO> user = new ArrayList<UserDTO>();

        System.out.println("token=" + request.getHeader("token"));

        UserSession userSession = authorizationUtil.refreshSession(sessionService, request.getHeader("token"));
        if (userSession.getUserId().getRoleId().getId() != 1) {
            throw new CustomException("you don't have permission, user_id=" + userSession.getUserId().getId(), "you don't have permission");
        }

        List<User> list = userService.getAllUser(null, begin, end);
        for (int i = 0; i < list.size(); i++) {
            user.add(new UserDTO(list.get(i)));

        }
        System.out.println("size:=" + list.size());
        result.setResponseObject(user);
        return result;
    }

    @RequestMapping(value = "size", method = RequestMethod.GET, produces = "application/json")
    public @ResponseBody ResponseDTO  sizeUsers() throws Exception {
        ResponseDTO result = new ResponseDTO();
        int r = userService.sizeUser();
        System.out.println("r:=" + r);
        result.setResponseObject(r);
        return result;

    }

    @RequestMapping(value = "{userId}", method = RequestMethod.GET)
    public @ResponseBody ResponseDTO  getUser(@PathVariable Integer userId) throws Exception {
        ResponseDTO result = new ResponseDTO();
        User r = userService.getUser(new User(userId));

        result.setResponseObject(new UserDTO(r));
        return result;
    }

    @RequestMapping(value = "{id}", method = RequestMethod.PUT)
    public 
    ResponseDTO updateUser(@RequestBody UserDTO userDto, @PathVariable Integer id) throws UnsupportedEncodingException, NoSuchAlgorithmException {
        ResponseDTO result = new ResponseDTO();
        if (id < 1) {
            throw new IllegalArgumentException();
        }
        User tempUser = userService.getUser(new User(id));

        tempUser.setRoleId(new UserRole(userDto.getRoleId().getId()));
        tempUser.setId(userDto.getId());
        tempUser.setName(userDto.getName());
        tempUser.setSurname(userDto.getSurname());
        tempUser.setEmail(userDto.getEmail());

        tempUser.setFacebookId(userDto.getFacebookId());
        tempUser.setGmailId(userDto.getGmailId());
        tempUser.setTwitterId(userDto.getTwitterId());
        tempUser.setActivationDate(userDto.getActivationDate());
        tempUser.setDeactivationDate(userDto.getDeactivationDate());

        byte[] bpwd = userDto.getPassword().getBytes("UTF-8");
        byte[] salt = SecurityUtils.generateSalt();
        byte[] password = SecurityUtils.generateHash(1000, bpwd, salt);

        tempUser.setPasswordSalt(SecurityUtils.byteToBase64(salt));
        tempUser.setPassword(SecurityUtils.byteToBase64(password));

        userService.updateUser(tempUser);

        result.setSuccessMessage("succesfully saved");
        return result;

    }

    @RequestMapping(value = "activation", method = RequestMethod.GET)
    public @ResponseBody ResponseDTO  activateUser(
            @RequestParam(value = "token", required = true) String activationToken,
            HttpServletResponse response) throws CustomException {
        ResponseDTO result = new ResponseDTO();
        User temp = new User();

        temp.setActivationToken(activationToken);
        temp = userService.getUser(temp);

        if (temp == null) {
            throw new CustomException("no such activation token", "no such activation token");
        }
        if (temp.getActivationDate() != null) {
            result.setSuccessMessage("already activated");
            return result;
        }
        temp.setActivationDate(new Date());

        userService.updateUser(temp);

        result.setSuccessMessage("succesfully saved");
        return result;
    }

    @RequestMapping(method = RequestMethod.POST)
    public @ResponseBody ResponseDTO  addUser(@RequestBody UserDTO userDto, HttpServletResponse response) throws CustomException, UnsupportedEncodingException, NoSuchAlgorithmException {
        userDto.validate();
        ResponseDTO result = new ResponseDTO();
        UserAddResponse urr = new UserAddResponse();

        User user = new User();
        user.setRoleId(new UserRole(2));
        user.setEmail(userDto.getEmail());
        if (userService.getUser(user) != null) {
            urr.setAlreadyExistError("Already exist");
            CustomException ex = new CustomException();
            ex.setClientException(urr);
            ex.setErrorMessageServer("Already exist:" + userDto.getEmail());
            throw ex;
        }

//            user.setRoleId(new UserRole(userDto.getRoleId().getId()));
        user.setName(userDto.getName());
        user.setSurname(userDto.getSurname());

//            user.setFacebookId(userDto.getFacebookId());
//            user.setGmailId(userDto.getGmailId());
//            user.setTwitterId(userDto.getTwitterId());
//            user.setActivationDate(userDto.getActivationDate());
//            user.setDeactivationDate(userDto.getDeactivationDate());
        byte[] bpwd = userDto.getPassword().getBytes("UTF-8");
        byte[] salt = SecurityUtils.generateSalt();
        byte[] password = SecurityUtils.generateHash(1000, bpwd, salt);

        user.setPasswordSalt(SecurityUtils.byteToBase64(salt));
        user.setPassword(SecurityUtils.byteToBase64(password));

        String token = UUID.randomUUID().toString();
        user.setActivationToken(token);
//            MailUtil.sendEmail("localhost", "noreply@az.Vortex.SpringDevelopers.az", user.getEmail(), "Aktivasiya linki - Butelefon.az", "Profilinizi aktivl??dirm?k üçün link? daxil olun:<a href="
//                    + InetAddress.getLocalHost().toString() + "/users/activation?token=" + token + ">aktivasiya linki</a>");
        userService.addUser(user);
        String url = "www.pcderslerim.com/userlogin.jsp?token=" + token;

        MailDTO mail = new MailDTO();
        mail.setTo(userDto.getEmail());
        mail.setSubject("www.PCDERSLERIM.com hesab onay linki");
        mail.setMessage(
                "www.PCDERSLERIM.com hesab onay linki:\n "
                + url + user.getActivationToken()
        );
        MailUtil.sendEmail(mail);
        urr.setSuccess("Successfully Registered.Check your email");
        result.setResponseObject(urr);
        return result;

    }

    @RequestMapping(value = "{userId}/status", method = RequestMethod.PUT)
    public @ResponseBody ResponseDTO  activateUser(@RequestBody UserDTO user, @PathVariable Integer userId) throws Exception {
        ResponseDTO result = new ResponseDTO();
        if (user.getRoleId().getId() != 1) {

            result.setErrorMessage("false");
            return result;
        }

        User tempUser = new User(userId);
        tempUser.setId(user.getId());

        User rev = userService.getUser(tempUser);
        if (user.getActivate() == 1) {
            rev.setDeactivationDate(null);
            rev.setActivationDate(new Date());
        } else if (user.getActivate() == 0) {
            rev.setDeactivationDate(new Date());
        }

        userService.updateUser(rev);

        result.setSuccessMessage("succesfully saved");
        return result;

    }

    @RequestMapping(value = "logout", method = RequestMethod.POST)
    public @ResponseBody ResponseDTO  logoutUser(@RequestParam(value = "token") String token, HttpServletResponse response) throws Exception {
        ResponseDTO result = new ResponseDTO();
//        UserLoginResponseObject logoutResponse = new UserLoginResponseObject();

        if (token.isEmpty()) {
            throw new IllegalArgumentException("token is empty");
        }

        UserSession userSession = new UserSession();
        userSession.setToken(token);
        userSession = sessionService.getUserSession(userSession);
        if (userSession != null) {
            userSession.setExpiryDt(new Date());
            userSession.setLogoutDt(new Date());

            sessionService.updateUserSession(userSession);
            result.setSuccessMessage("logged out");
        } else {
            throw new CustomException("unknown token logout", "can not logout.No such user");
        }

        return result;
    }

    public @ResponseBody ResponseDTO  facebookLogin(String facebookAccessToken) throws IOException, Exception {
        ResponseDTO result = new ResponseDTO();
        if (facebookAccessToken == null || facebookAccessToken.length() == 0) {
            result.setResponseObject(null);
            return result;
        }
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.getMessageConverters()
                .add(0, new StringHttpMessageConverter(Charset.forName("UTF-8")));
        String facebook = restTemplate.getForObject(
                "https://graph.facebook.com/me?access_token=" + facebookAccessToken,
                String.class);
        System.out.println("facebook=" + facebook);
        if (facebook == null || facebook.length() == 0) {
            result.setResponseObject(null);
            return result;
        }
        facebook = StringEscapeUtils.unescapeJava(facebook);
        System.out.println("facebook=" + facebook);
        String email = facebook.split("email\":\"")[1].split("\",\"")[0];
        String firstname = facebook.split("first_name\":\"")[1].split("\",\"")[0];
        String lastname = facebook.split("last_name\":\"")[1].split("\",\"")[0];
        String fUserId = facebook.split("id\":\"")[1].split("\",\"")[0];

        if (email == null || email.isEmpty()
                || firstname == null || firstname.isEmpty()
                || lastname == null || lastname.isEmpty()
                || fUserId == null || fUserId.isEmpty()) {
            throw new Exception("facebook data is wrong");
        }

        User userTemp = new User();
        userTemp.setEmail(email);
        userTemp = userService.getUser(userTemp);
        if (userTemp == null) {
            userTemp = new User();
            userTemp.setFacebookId(fUserId);
            userTemp.setEmail(email);
            userTemp.setName(firstname);
            userTemp.setSurname(lastname);
            userTemp.setActivationToken("facebook_user");
            userTemp.setActivationDate(new Date());
            userTemp.setPassword("facebook_user");
            userTemp.setRoleId(new UserRole(2));
            userService.addUser(userTemp);

        } else if (userTemp.getFacebookId() == null || userTemp.getFacebookId().isEmpty()) {
            userTemp.setFacebookId(fUserId);
            userTemp.setName(firstname);
            userTemp.setSurname(lastname);
            userTemp.setActivationDate(new Date());
            userService.updateUser(userTemp);
        }
        result.setResponseObject(addOrUpdateSession(userTemp));
        return result;

    }

    @RequestMapping(value = "login", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ResponseDTO  loginUser(@RequestBody UserDTO userDto) throws Exception {
        System.out.println("login=" + userDto);
        ResponseDTO result = new ResponseDTO();

        String exStr = "";
        if (userDto.getEmail() == null || !EmailValidator.validate(userDto.getEmail())) {
            exStr = "email is not filled right";
        }

        if (userDto.getPassword() == null || userDto.getPassword().length() == 0) {
            exStr += " password is not filled right";
        }

        if (exStr.length() > 0) {
            throw new IllegalArgumentException(exStr);
        }

        User userTemp = new User();
        userTemp.setEmail(userDto.getEmail());

        userTemp = userService.getUser(userTemp);

        if (userTemp == null) {
            throw new CustomException("This email doesn't exist", "Email or password is not right");
        }
        System.out.println(userDto.getPassword());
        userTemp.setPassword(userDto.getPassword());
 
        userTemp = userService.getUserForLogin(userTemp);
        if (userTemp == null) {
            throw new CustomException("Password is incorrect,owner email:" + userDto.getEmail(), "Email or password is not right");
        }
        result.setResponseObject(addOrUpdateSession(userTemp));
        result.setSuccessMessage("Successfully logged in");
        return result;
    }

    public UserLoginResponseObject addOrUpdateSession(User user) throws Exception {

        UserLoginResponseObject result = new UserLoginResponseObject();
        UserSession userSessionTemp = new UserSession();
        userSessionTemp.setUserId(user);

        sessionService.invalidateAllSessions(userSessionTemp);

        String token = UUID.randomUUID().toString();
        userSessionTemp.setToken(token);
        sessionService.addUserSession(userSessionTemp);

        result.setToken(token);
        result.setUser(new UserDTO(user));

        return result;
    }
}
