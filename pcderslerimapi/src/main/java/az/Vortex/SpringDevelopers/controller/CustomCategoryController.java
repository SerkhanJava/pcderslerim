package az.Vortex.SpringDevelopers.controller;

import az.Vortex.SpringDevelopers.dto.CustomCategoryDTO;
import az.Vortex.SpringDevelopers.model.Category;
import az.Vortex.SpringDevelopers.model.CustomCategory;
import az.Vortex.SpringDevelopers.response.CustomException;
import az.Vortex.SpringDevelopers.response.ResponseDTO;
import az.Vortex.SpringDevelopers.service.CustomCategoryService;
import az.Vortex.SpringDevelopers.service.UserSessionService;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import utils.AuthorizationUtil;

/**
 *
 * @author Asus
 */
@Controller
public class CustomCategoryController {

    AuthorizationUtil authorizationUtil = new AuthorizationUtil();

    @Autowired
    private CustomCategoryService customCategoryService;

    @Autowired
    private UserSessionService sessionService;

    @RequestMapping(value = "customcategories", method = RequestMethod.GET)
    public @ResponseBody
    ResponseDTO getAllCustomCategory(
            @RequestParam(value = "begin", required = false) Integer begin,
            @RequestParam(value = "end", required = false) Integer end,
            @RequestParam(value = "categoryid1", required = false) Integer categoryId1,
            HttpServletRequest request) throws Exception {

        ResponseDTO result = new ResponseDTO();
        List<CustomCategoryDTO> customCategoryDTOs = new ArrayList<CustomCategoryDTO>();
        
        List<CustomCategory> list = customCategoryService.getAllCustomCategory(null, begin, end, categoryId1);

        for (int i = 0; i < list.size(); i++) {
            customCategoryDTOs.add(new CustomCategoryDTO(list.get(i)));
        }

        result.setResponseObject(customCategoryDTOs);
        return result;
    }

    @RequestMapping(value = "customcategories/{customCategoryId}", method = RequestMethod.GET)
    public @ResponseBody
    ResponseDTO getCustomCategory(@PathVariable Integer customCategoryId, HttpServletRequest request) throws Exception {
        ResponseDTO result = new ResponseDTO();

        CustomCategory r = customCategoryService.getCustomCategory(new CustomCategory(customCategoryId));

        result.setResponseObject(new CustomCategoryDTO(r));
        return result;
    }

    @RequestMapping(value = "customcategories/{id}", method = RequestMethod.PUT)
    public @ResponseBody
    ResponseDTO updateCustomCategory(@RequestBody CustomCategoryDTO customCategoryDTO,
            @PathVariable Integer id, HttpServletRequest request) throws Exception {
        ResponseDTO result = new ResponseDTO();
        authorizationUtil.checkUser(sessionService, request.getHeader("token"), 1);

        if (id <= 0) {
            throw new IllegalArgumentException("customCategory id is wrong");
        }
        CustomCategory tempCustomCategory = customCategoryService.getCustomCategory(new CustomCategory(id));

        if (tempCustomCategory == null) {
            throw new CustomException("trying to update customCategory but there is  not such  customCategory,customCategoryId=" + id,
                    "Can't be updated customCategory.There is  not such customCategory");
        }

        tempCustomCategory.setCategoryId1(new Category(customCategoryDTO.getCategoryId1().getId()));
        tempCustomCategory.setCategoryId2(new Category(customCategoryDTO.getCategoryId2().getId()));

        customCategoryService.updateCustomCategory(tempCustomCategory);
        result.setSuccessMessage("succesfully saved");
        return result;
    }

//    
    @RequestMapping(value = "customcategories", method = RequestMethod.POST)
    public @ResponseBody
    ResponseDTO addingCustomCategory(@RequestBody CustomCategoryDTO customCategoryDTO, HttpServletRequest request) throws Exception {
        ResponseDTO result = new ResponseDTO();
//        authorizationUtil.refreshSession(sessionService, request.getHeader("token"));

        CustomCategory tempCustomCategory = new CustomCategory();

        tempCustomCategory.setCategoryId1(new Category(customCategoryDTO.getCategoryId1().getId()));
        tempCustomCategory.setCategoryId2(new Category(customCategoryDTO.getCategoryId2().getId()));

        customCategoryService.addCustomCategory(tempCustomCategory);

        result.setSuccessMessage("succesfully saved");
        return result;
    }

    @RequestMapping(value = "/ccs", method = RequestMethod.DELETE)
    public @ResponseBody
    ResponseDTO deleteCustomCategory(
            @RequestParam(value = "c1", required = false) Integer categoryId1,
            @RequestParam(value = "c2", required = false) Integer categoryId2,
            HttpServletRequest request) throws Exception {
        ResponseDTO result = new ResponseDTO();
        authorizationUtil.checkUser(sessionService, request.getHeader("token"), 1);
        int r = 0;
        
        r = customCategoryService.deleteCustomCategory(null, categoryId1, categoryId2);

        result.setSuccessMessage("succesfully deleted");
        result.setResponseObject(r);
        return result;
    }
}
