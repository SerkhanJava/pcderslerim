/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package az.Vortex.SpringDevelopers.dao;

import az.Vortex.SpringDevelopers.model.VideoLinks;
import java.util.List;

/**
 *
 * @author Asus
 */
public interface VideoLinksDAO {
    public int sizeVideoLinks(Boolean working);
    
    public void addVideoLinks(VideoLinks link);
    
    public void updateVideoLinks(VideoLinks link);
    
    public List<VideoLinks>  getVideoLinks(VideoLinks link,int begin,int end,Boolean working);
    
    public VideoLinks getVideoLink(VideoLinks link);
    
    public void deleteVideoLinks(VideoLinks link);
    
    public List<VideoLinks> getAllVideoLinks();
    
    
}
