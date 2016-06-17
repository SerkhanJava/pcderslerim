package az.Vortex.SpringDevelopers.controller;

import az.Vortex.SpringDevelopers.dto.UserRoleDTO;
import az.Vortex.SpringDevelopers.model.UserRole;
import az.Vortex.SpringDevelopers.response.ResponseDTO;
import az.Vortex.SpringDevelopers.service.UserRoleService;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author Asus
 */
@Controller
public class UserRoleController {

    @Autowired
    private UserRoleService roleService;

    @RequestMapping(value = "roles", method = RequestMethod.GET)
    public @ResponseBody
    ResponseDTO getAllUserRole() throws Exception {
        ResponseDTO result = new ResponseDTO();
        List<UserRoleDTO> userRole = new ArrayList<UserRoleDTO>();

        List<UserRole> list = roleService.getAllUserRole();
        for (int i = 0; i < list.size(); i++) {
            userRole.add(new UserRoleDTO(list.get(i)));
        }
        result.setResponseObject(userRole);
        return result;
    }

    @RequestMapping(value = "roles/{roleId}", method = RequestMethod.GET)
    public @ResponseBody
    ResponseDTO getUserRole(@PathVariable Integer roleId) throws Exception {
        ResponseDTO result = new ResponseDTO();
        UserRole r = roleService.getUserRole(new UserRole(roleId));
//        UserRoleDTO result = new UserRoleDTO(r);

        result.setResponseObject(new UserRoleDTO(r));
        return result;
    }

}
