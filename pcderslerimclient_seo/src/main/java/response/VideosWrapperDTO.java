/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package response;

import dto.VideoDTO;
import java.util.List;

/**
 *
 * @author User
 */
public class VideosWrapperDTO {
    private List<VideoDTO> videos;

    public VideosWrapperDTO() {
    }

    public List<VideoDTO> getVideos() {
        return videos;
    }

    public void setVideos(List<VideoDTO> videos) {
        this.videos = videos;
    }
    
    
}
