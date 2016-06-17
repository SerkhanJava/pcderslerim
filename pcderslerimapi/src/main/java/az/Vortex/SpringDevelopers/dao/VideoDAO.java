package az.Vortex.SpringDevelopers.dao;

import java.util.List;

import az.Vortex.SpringDevelopers.model.Video;


public interface VideoDAO {
       
        public int sizeVideo(Integer categoryId,String search);
    
        public void addVideo(Video video);

	public void updateVideo(Video video);

	public Video getVideo(Video video);

	public void deleteVideo(Video video);

	public List<Video> getAllVideo(Video video,int begin,int end,Integer categoryId,String search);
        
        public List<Video> getAllVideos();
}
