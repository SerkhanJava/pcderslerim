/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package az.Vortex.SpringDevelopers.service;

import az.Vortex.SpringDevelopers.model.Picture;
import java.util.List;

/**
 *
 * @author Mensure
 */
public interface PictureService {

    public void addPicture(Picture picture);

    public void updatePicture(Picture picture);

    public Picture getPicture(Picture picture);

    public void deletePicture(Picture picture);

    public List<Picture> getAllPicture();
}
