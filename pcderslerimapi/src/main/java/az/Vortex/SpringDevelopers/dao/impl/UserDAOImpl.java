/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package az.Vortex.SpringDevelopers.dao.impl;

import az.Vortex.SpringDevelopers.dao.UserDAO;
import az.Vortex.SpringDevelopers.model.User;
import java.util.List;
import org.hibernate.Criteria;
import org.hibernate.FetchMode;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Asus
 */
@Repository
public class UserDAOImpl extends SessionFacImpl implements UserDAO {

    @Override
    public void addUser(User user) {

        getSession().save(user);
    }

    @Override
    public int sizeUser() {
        Criteria criteria = getSession().createCriteria(User.class);
        //( (Integer) getSession().createQuery("select count(*) from User").iterate().next() ).intValue();
//         return   (Integer) getSession().createQuery("select count(*) from User").iterate().next();
        Long count = ((Long) getSession().createQuery("select count(*) from User").uniqueResult());
        Integer total = count.intValue();
        return total;
    }

    @Override
    public void updateUser(User user) {
        getSession().update(user);
    }

    @Override
    public User getUser(User user) {
        Criteria criteria = getSession().createCriteria(User.class);

        if (user.getId() != null && user.getId() > 0) {
            criteria.add(Restrictions.eq("id", user.getId()));
        }
        if (user.getEmail() != null) {
            criteria.add(Restrictions.eq("email", user.getEmail()));
        }//men deyen sherti elave etmemisen deyesen
        if (user.getActivationToken() != null) {
            criteria.add(Restrictions.eq("activationToken", user.getActivationToken()));
        }
        criteria.setFetchMode("roleId", FetchMode.JOIN);
        criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);

        return (User) criteria.uniqueResult();

    }

    @Override
    public void deleteUser(User user) {
        getSession().delete(user);
    }

    @Override
    public List<User> getAllUser(User user, int begin, int end) {
        Criteria criteria = getSession().createCriteria(User.class);
        criteria.setFirstResult(begin);
        criteria.setMaxResults(end - begin);
        return criteria.list();
    }

    @Override
    public List<User> getAllUsers() {
        return getSession().getNamedQuery("User.findAll").list();
    }

    @Override
    public User getUserForLogin(User user) {
        Criteria criteria = getSession().createCriteria(User.class);

        criteria.add(Restrictions.eq("password", user.getPassword().trim()));
        criteria.add(Restrictions.eq("email", user.getEmail()));

        Criterion activationDate = Restrictions.and(Restrictions.neOrIsNotNull("activationDate", null));
        Criterion deactivationDate = Restrictions.and(Restrictions.eq("deactivationDate", null));
        criteria.add(Restrictions.or(activationDate, deactivationDate));

        return (User) criteria.uniqueResult();
    }
}
