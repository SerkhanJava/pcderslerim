package az.Vortex.SpringDevelopers.dao.impl;

import az.Vortex.SpringDevelopers.dao.VideoDAO;
import az.Vortex.SpringDevelopers.model.Video;

import java.util.List;
import org.hibernate.Criteria;
import org.hibernate.FetchMode;
import org.hibernate.Query;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;

import org.springframework.stereotype.Repository;

@Repository
public class VideoDAOImpl extends SessionFacImpl implements VideoDAO {

    @Override
    public void addVideo(Video video) {
        getSession().save(video);
    }

    @Override
    public int sizeVideo(Integer categoryId, String search) {

        Criteria criteria = getSession().createCriteria(Video.class);
        if (categoryId != null) {
            System.out.println("String.valueOf(categoryId)=" + String.valueOf(categoryId));
            criteria.add(Restrictions.like("categoryId", String.valueOf(categoryId), MatchMode.ANYWHERE));
        }
        System.out.println("search=" + search);
        if (search != null) {
            Criterion titleCrn = Restrictions.and(Restrictions.like("title", search, MatchMode.ANYWHERE));
            Criterion descriptionCrn = Restrictions.and(Restrictions.like("description", search, MatchMode.ANYWHERE));
            criteria.add(Restrictions.or(titleCrn, descriptionCrn));
        }
        criteria.setProjection(Projections.rowCount());
        Long count = (Long) criteria.uniqueResult();
        return count.intValue();
    }

    @Override
    public void updateVideo(Video video) {
        getSession().update(video);
    }

    @Override
    public Video getVideo(Video video) {
        Criteria criteria = getSession().createCriteria(Video.class);

        if (video.getId() != null) {
            criteria.add(Restrictions.eq("id", video.getId()));
        }
        if (video.getUrl() != null) {
            criteria.add(Restrictions.eq("url", video.getUrl()));
        }

        criteria.setFetchMode("videoLinksList", FetchMode.JOIN);
        criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);

        return (Video) criteria.uniqueResult();
    }

    @Override
    public void deleteVideo(Video video) {
        Video v = getVideo(video);
        getSession().delete(v);

    }

    @Override
// 
    public List<Video> getAllVideo(Video video, int begin, int end, Integer categoryId, String search) {
        Criteria criteria = getSession().createCriteria(Video.class);

        if (categoryId != null && categoryId > 0) {
            criteria.add(Restrictions.like("categoryId", String.valueOf(categoryId), MatchMode.ANYWHERE));
        }

        if (search != null) {
            Criterion titleCrn = Restrictions.and(Restrictions.like("title", search, MatchMode.ANYWHERE));
            Criterion descriptionCrn = Restrictions.and(Restrictions.like("description", search, MatchMode.ANYWHERE));
            criteria.add(Restrictions.or(titleCrn, descriptionCrn));
        }

        criteria.setFetchMode("videoLinksList", FetchMode.JOIN);
        criteria.addOrder(Order.desc("date"));
        if (end > begin) {
            criteria.setFirstResult(begin);
            criteria.setMaxResults(end - begin);
            criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
        }
        System.out.println("begin:=" + begin + " end:=" + end + "category:=" + categoryId + "search =" + search);
        return criteria.list();

    }

    @Override
    @SuppressWarnings("unchecked")
    public List<Video> getAllVideos() {
        return getSession().getNamedQuery("VideoLinks.findAll").list();
    }
}
