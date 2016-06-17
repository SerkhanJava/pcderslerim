package az.Vortex.SpringDevelopers.dao.impl;

import org.hibernate.*;
import org.springframework.beans.factory.annotation.Autowired;

public class SessionFacImpl {

    @Autowired
    protected SessionFactory sessionFactory;

    public Session getSession() {
        return sessionFactory.getCurrentSession();
    }
}
