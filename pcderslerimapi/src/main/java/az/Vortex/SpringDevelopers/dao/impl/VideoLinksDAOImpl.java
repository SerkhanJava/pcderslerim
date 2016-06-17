/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package az.Vortex.SpringDevelopers.dao.impl;

import az.Vortex.SpringDevelopers.dao.VideoLinksDAO;
import az.Vortex.SpringDevelopers.model.VideoLinks;
import java.util.List;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Asus
 */
@Repository
public class VideoLinksDAOImpl extends SessionFacImpl implements VideoLinksDAO {

    @Override
    public void addVideoLinks(VideoLinks link) { 
           getSession().save(link);
    }

    @Override
    public int sizeVideoLinks(Boolean working) {
        Criteria criteria = getSession().createCriteria(VideoLinks.class);
        String sql = "select count(*) from VideoLinks";
        if (working != null) {
            sql += " where working = :working";

        }
        Query query = getSession().createQuery(sql);
        if (working != null) {
            query.setBoolean("working", working);
        }
//        Long f = 10L;
//        Integer g = f;
        Long count = ((Long) query.uniqueResult());
        
        return count.intValue();
    }

    @Override
    public void updateVideoLinks(VideoLinks link) {
        getSession().update(link);
    }

    @Override
    public List<VideoLinks> getVideoLinks(VideoLinks link, int begin, int end, Boolean working) {
        Criteria criteria = getSession().createCriteria(VideoLinks.class);
        if (working != null) {
            criteria.add(Restrictions.eq("working", working));
        }
        criteria.setFirstResult(begin);
        criteria.setMaxResults(end - begin);
        criteria.addOrder(Order.asc("id"));
        return criteria.list();
    }

    @Override
    public VideoLinks getVideoLink(VideoLinks link) {
        VideoLinks video = (VideoLinks) getSession().get(VideoLinks.class, link.getId());
        return video;
    }

    @Override
    public void deleteVideoLinks(VideoLinks link) {
        getSession().delete(link);
    }

    @Override
    @SuppressWarnings("unchecked")
    public List<VideoLinks> getAllVideoLinks() {
        return getSession().getNamedQuery("VideoLinks.findAll").list();
    }

}
