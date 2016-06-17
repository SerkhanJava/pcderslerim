package az.Vortex.SpringDevelopers.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import az.Vortex.SpringDevelopers.dao.VideoDAO;
import az.Vortex.SpringDevelopers.model.Video;
import az.Vortex.SpringDevelopers.service.VideoService;

@Service
@Transactional
public class VideoServiceImpl implements VideoService{

	@Autowired
	private VideoDAO dao;
	
	@Override
	public void addVideo(Video video) {
		dao.addVideo(video);
	}

        @Override
	public int sizeVideo(Integer categoryId,String search) {
	   return  dao.sizeVideo(categoryId,search);
	}
        
	@Override
	public void updateVideo(Video video) {
		 dao.updateVideo(video);
	}

	@Override
	public Video getVideo(Video video) {
		return dao.getVideo(video);
	}

	@Override
	public void deleteVideo(Video video) {
		dao.deleteVideo(video);
	}

	@Override
	public List<Video> getAllVideo(Video video,int begin,int end,Integer categoryId,String search){
		return dao.getAllVideo(video,begin,end,categoryId,search);
	}
        @Override
        public List<Video> getAllVideos() {
        return dao.getAllVideos();
    }
}
