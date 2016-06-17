package az.Vortex.SpringDevelopers.dao.impl;
 
import az.Vortex.SpringDevelopers.dao.UserSessionDAO;
import az.Vortex.SpringDevelopers.model.UserSession;
import java.util.List;
import org.hibernate.SQLQuery;

import org.springframework.stereotype.Repository;

@Repository
public class UserSessionDAOImpl extends SessionFacImpl implements UserSessionDAO {

    @Override
    public void addUserSession(UserSession userSession) {
        String queryStr
                = "insert into user_session(token,expiry_dt,login_dt,user_id) values( :token, ADDTIME(now(), SEC_TO_TIME(60*60)),now(),:user_id)";
        SQLQuery query = getSession().createSQLQuery(queryStr);

        query.setParameter("token", userSession.getToken());
        query.setParameter("user_id", userSession.getUserId().getId());

        query.executeUpdate();
    }

    @Override
    public void updateUserSession(UserSession userSession) {

        String queryStr
                = "update user_session set expiry_dt= ADDTIME(now(), SEC_TO_TIME(600))  where id =:id ";//ADDTIME(now(), SEC_TO_TIME(600))
        SQLQuery query = getSession().createSQLQuery(queryStr);
        query.setParameter("id", userSession.getId());
        query.executeUpdate();
//        UserSession us = (UserSession) getSession().get(UserSession.class, userSession.getId());
//        us.setExpiryDt(userSession.getExpiryDt());
//        us.setLoginDt(userSession.getLoginDt());
//        us.setLogoutDt(userSession.getLogoutDt());
        
        System.out.println("userSession.getId()=" + userSession.getId());
    }

    @Override
    public UserSession getUserSession(UserSession userSession) {

        String queryStr = "select * from user_session where token = :token and expiry_dt> now() ";
        SQLQuery query = getSession().createSQLQuery(queryStr);

        query.setString("token", userSession.getToken());

        return (UserSession) query.addEntity(UserSession.class).uniqueResult();
    }

    @Override
    public void deleteUserSession(UserSession userSession) {
        getSession().delete(userSession);

    }

    @Override
    @SuppressWarnings("unchecked")
    public List<UserSession> getAllUserSession() {
        return getSession().getNamedQuery("UserSession.findAll").list();
    }

    @Override
    public void invalidateAllSessions(UserSession userSession) {
        String queryStr = "update user_session set expiry_dt = now() where user_id = :userId and expiry_dt> now() ";
        SQLQuery query = getSession().createSQLQuery(queryStr);

        query.setParameter("userId", userSession.getUserId().getId());
//        query.setParameter("expireDate", userSession.getExpiryDt());
        query.executeUpdate();
    }

}
