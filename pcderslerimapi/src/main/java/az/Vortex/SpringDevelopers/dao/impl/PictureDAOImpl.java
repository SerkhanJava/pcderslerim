package az.Vortex.SpringDevelopers.dao.impl;

import az.Vortex.SpringDevelopers.dao.PictureDAO;
import az.Vortex.SpringDevelopers.model.Picture;
import java.util.List;

import org.springframework.stereotype.Repository;

@Repository
public class PictureDAOImpl extends SessionFacImpl implements PictureDAO {

    @Override
    public void addPicture(Picture picture) {
        getSession().save(picture);
    }

    @Override
    public void updatePicture(Picture picture) {
        getSession().update(picture);
    }

    @Override
	public Picture getPicture(Picture picture) {
//		return (Picture)getSession().get(Picture.class, picture);
              Picture c = (Picture) getSession().get(Picture.class, picture.getId());
                return c;
	}
    @Override
    public void deletePicture(Picture picture) {
        
            getSession().delete(picture);
       
    }

    @Override
    @SuppressWarnings("unchecked")
    public List<Picture> getAllPicture() {
        return getSession().getNamedQuery("Picture.findAll").list();
    }

    
    
}

