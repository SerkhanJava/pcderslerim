/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dto;
 
/**
 *
 * @author Asus
 */
public class VideoLinksDTO {

    private Integer id;
    private String url;
    private String text;
    private Boolean working;
    private VideoDTO videoId;

    public VideoLinksDTO() {
    }
 
    public VideoLinksDTO(Integer id, String url, String text, Boolean working) {
        this.id = id;
        this.url = url;
        this.text = text;
        this.working = working;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Boolean getWorking() {
        return working;
    }

    public void setWorking(Boolean working) {
        this.working = working;
    }

    public VideoDTO getVideoId() {
        return videoId;
    }

    public void setVideoId(VideoDTO videoId) {
        this.videoId = videoId;
    }
    
}
