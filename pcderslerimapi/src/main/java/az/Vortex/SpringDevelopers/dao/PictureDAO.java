package az.Vortex.SpringDevelopers.dao;

import az.Vortex.SpringDevelopers.model.Picture;
import java.util.List;

public interface PictureDAO {

    public void addPicture(Picture picture);

    public void updatePicture(Picture picture);

    public Picture getPicture(Picture picture);

    public void deletePicture(Picture picture);

    public List<Picture> getAllPicture();
}
