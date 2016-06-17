package az.Vortex.SpringDevelopers.dao.impl;

import az.Vortex.SpringDevelopers.dao.CustomCategoryDAO;
import az.Vortex.SpringDevelopers.model.CustomCategory;
import java.util.List;
import org.hibernate.Criteria;
import org.hibernate.FetchMode;
import org.hibernate.Query;
import org.hibernate.criterion.Restrictions;

import org.springframework.stereotype.Repository;

@Repository
public class CustomCategoryDAOImpl extends SessionFacImpl implements CustomCategoryDAO {

    @Override
    public void addCustomCategory(CustomCategory customCategory) {
        getSession().save(customCategory);
    }

    @Override
    public void updateCustomCategory(CustomCategory customCategory) {
        getSession().update(customCategory);
    }

    @Override
    public CustomCategory getCustomCategory(CustomCategory customCategory) {
        Criteria criteria = getSession().createCriteria(CustomCategory.class);

        criteria.setFetchMode("categoryId", FetchMode.JOIN);
        return (CustomCategory) criteria.uniqueResult();
    }

    @Override
    public int deleteCustomCategory(CustomCategory customCategory, Integer categoryId1, Integer categoryId2) {

        Criteria criteria = getSession().createCriteria(CustomCategory.class);
        String sql = "DELETE  from CustomCategory where category_id1 = :categoryId1 AND category_id2 = :categoryId2";

        Query query = getSession().createQuery(sql);
        System.out.println("categoryId1= "+categoryId1+"categoryId2= "+categoryId2);
        if (categoryId1 != null) {
            query.setInteger("categoryId1", categoryId1);
        }

         if (categoryId2 != null) {
            query.setInteger("categoryId2", categoryId2);
        }
        
        int row = query.executeUpdate();
        if (row == 0) {
            System.out.println("Doesnt deleted any row!");
        } else {
            System.out.println("Deleted Row: " + row);
        }

        return row;

    }

    @Override
// 
    public List<CustomCategory> getAllCustomCategory(CustomCategory video, Integer begin, Integer end, Integer categoryId1) {
        Criteria criteria = getSession().createCriteria(CustomCategory.class);

        if (categoryId1 != null && categoryId1 > 0) {
            criteria.add(Restrictions.eq("categoryId1.id", categoryId1));
        }
        if (begin != null && end != null && end > begin) {
            criteria.setFirstResult(begin);
            criteria.setMaxResults(end - begin);
        }
        criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
        return criteria.list();

    }

    @Override
    @SuppressWarnings("unchecked")
    public List<CustomCategory> getAllCustomCategories() {
        List<CustomCategory> result = getSession().getNamedQuery("CustomCategory.findAll").list();
        return result;
    }

}
