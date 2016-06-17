package az.Vortex.SpringDevelopers.controller;

import az.Vortex.SpringDevelopers.dto.CategoryDTO;
import az.Vortex.SpringDevelopers.model.Category;
import az.Vortex.SpringDevelopers.response.CustomException;
import az.Vortex.SpringDevelopers.response.ResponseDTO;
import az.Vortex.SpringDevelopers.service.CategoryService;
import az.Vortex.SpringDevelopers.service.UserSessionService;
import az.Vortex.SpringDevelopers.service.impl.CategoryServiceImpl;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import utils.AuthorizationUtil;

/**
 *
 * @author Asus
 */
@Controller
public class CategoryController {

    AuthorizationUtil authorizationUtil = new AuthorizationUtil();

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private UserSessionService sessionService;

    @RequestMapping(value = "categories", method = RequestMethod.GET)
    public @ResponseBody
    ResponseDTO getAllCategory(HttpServletRequest request) throws Exception {
        ResponseDTO result = new ResponseDTO();
        List<CategoryDTO> categoryDTOs = new ArrayList<CategoryDTO>();

        authorizationUtil.refreshSession(sessionService, request.getHeader("token"));

        List<Category> list = categoryService.getAllCategory();

        for (int i = 0; i < list.size(); i++) {
            categoryDTOs.add(new CategoryDTO(list.get(i)));
        }

        result.setResponseObject(categoryDTOs);
        return result;
    }

    @RequestMapping(value = "categories/{categoryId}", method = RequestMethod.GET)
    public @ResponseBody
    ResponseDTO getCategory(@PathVariable Integer categoryId, HttpServletRequest request) throws Exception {
        ResponseDTO result = new ResponseDTO();
        authorizationUtil.refreshSession(sessionService, request.getHeader("token"));

        Category r = categoryService.getCategory(new Category(categoryId));

        result.setResponseObject(new CategoryDTO(r));
        return result;
    }

    @RequestMapping(value = "categories/{id}", method = RequestMethod.PUT)
    public @ResponseBody
    ResponseDTO updateCategory(@RequestBody CategoryDTO category,
            @PathVariable Integer id, HttpServletRequest request) throws Exception {
        ResponseDTO result = new ResponseDTO();
        authorizationUtil.checkUser(sessionService, request.getHeader("token"), 1);

        if (id <= 0) {
            throw new IllegalArgumentException("category id is wrong");
        }
        Category cat = categoryService.getCategory(new Category(id));

        if (cat == null) {
            throw new CustomException("trying to update category but there is  not such  category,categoryId=" + id,
                    "Can't be updated category.There is  not such category");
        }
        cat.setType(category.getType());

        categoryService.updateCategory(cat);
        result.setSuccessMessage("succesfully saved");
        return result;
    }

//    
    @RequestMapping(value = "categories", method = RequestMethod.POST)
    public @ResponseBody
    ResponseDTO addingCategory(@RequestBody CategoryDTO category, HttpServletRequest request) throws Exception {
        ResponseDTO result = new ResponseDTO();
        authorizationUtil.checkUser(sessionService, request.getHeader("token"), 1);

        Category tempCategory = new Category();
        if (category.getType() == null) {
            throw new CustomException("trying to add category but there is  not such  category",
                    "Can't be added category.Category type is empty");
        }
        tempCategory.setType(category.getType());

        categoryService.addCategory(tempCategory);

        result.setSuccessMessage("succesfully saved");
        return result;
    }

    @RequestMapping(value = "categories/{id}", method = RequestMethod.DELETE)
    public @ResponseBody
    ResponseDTO deleteCategory(@PathVariable Integer id, HttpServletRequest request) throws Exception {
        ResponseDTO result = new ResponseDTO();
        authorizationUtil.checkUser(sessionService, request.getHeader("token"), 1);
        if (id <= 0) {
            throw new IllegalArgumentException("category id is wrong");
        }
        Category temp = new Category(id);

        categoryService.deleteCategory(temp);
 
        result.setSuccessMessage("succesfully deleted");
        return result;
    }
}
