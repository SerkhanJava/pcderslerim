/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package az.Vortex.SpringDevelopers.service.impl;

import az.Vortex.SpringDevelopers.dao.VideoLinksDAO;
import az.Vortex.SpringDevelopers.model.VideoLinks;
import az.Vortex.SpringDevelopers.service.VideoLinksService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Asus
 */
@Service
@Transactional
public class VideoLinksServiceImpl implements VideoLinksService {

    @Autowired
    VideoLinksDAO dao;

    @Override
    public void addVideoLinks(VideoLinks link) {
        dao.addVideoLinks(link);
    }
    @Override
    public int sizeVideoLinks(Boolean working) {
      return  dao.sizeVideoLinks(working);
    }

    @Override
    public void updateVideoLinks(VideoLinks link) {
        dao.updateVideoLinks(link);
    }

    @Override
    public List<VideoLinks>  getVideoLinks(VideoLinks link,int begin,int end,Boolean working) {
        return dao.getVideoLinks(link,begin,end,working);

    }
    
    @Override
    public VideoLinks getVideoLink(VideoLinks link) {
        return dao.getVideoLink(link);

    }

    @Override
    public void deleteVideoLinks(VideoLinks link) {
        dao.deleteVideoLinks(link);
    }

    @Override
    public List<VideoLinks> getAllVideoLinks() {
        return dao.getAllVideoLinks();
    }

}
