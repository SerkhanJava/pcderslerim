package az.Vortex.SpringDevelopers.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import az.Vortex.SpringDevelopers.dao.PictureDAO;
import az.Vortex.SpringDevelopers.model.Picture;
import az.Vortex.SpringDevelopers.service.PictureService;

@Service
@Transactional
public class PictureServiceImpl implements PictureService{

	@Autowired
	private PictureDAO dao;
	
	@Override
	public void addPicture(Picture picture) {
		dao.addPicture(picture);
	}

	@Override
	public void updatePicture(Picture picture) {
		dao.updatePicture(picture);
	}

	@Override
	public Picture getPicture(Picture picture) {
		return dao.getPicture(picture);
	}

	@Override
	public void deletePicture(Picture picture) {
		dao.deletePicture(picture);
	}

	@Override
	public List<Picture> getAllPicture() {
		return dao.getAllPicture();
	}

}
