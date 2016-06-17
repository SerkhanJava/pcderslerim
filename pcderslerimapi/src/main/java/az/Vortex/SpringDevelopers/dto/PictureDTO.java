/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package az.Vortex.SpringDevelopers.dto;

import az.Vortex.SpringDevelopers.model.Picture;
import az.Vortex.SpringDevelopers.model.User;
import java.util.Date;

/**
 *
 * @author Asus
 */
public class PictureDTO {

    private Integer id;
    private String url;
    private String text;
    private Integer likeCount;
    private Integer dislikeCount;
    private Integer wowCount;
    private Date insertDate;
    private Date confirmationDate;
    private User userId;
    
    
    public PictureDTO(){
    
    }
    public PictureDTO(Picture picture){
        id=picture.getId();
        url=picture.getUrl();
        text=picture.getText();
        likeCount=picture.getLikeCount();
        dislikeCount=picture.getDislikeCount();
        wowCount=picture.getWowCount();
    
    }

    public PictureDTO(Integer id, String url, String text, Integer likeCount, Integer dislikeCount, Integer wowCount, Date insertDate, Date confirmationDate, User userId) {
        this.id = id;
        this.url = url;
        this.text = text;
        this.likeCount = likeCount;
        this.dislikeCount = dislikeCount;
        this.wowCount = wowCount;
        this.insertDate = insertDate;
        this.confirmationDate = confirmationDate;
        this.userId = userId;
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

    public Integer getLikeCount() {
        return likeCount;
    }

    public void setLikeCount(Integer likeCount) {
        this.likeCount = likeCount;
    }

    public Integer getDislikeCount() {
        return dislikeCount;
    }

    public void setDislikeCount(Integer dislikeCount) {
        this.dislikeCount = dislikeCount;
    }

    public Integer getWowCount() {
        return wowCount;
    }

    public void setWowCount(Integer wowCount) {
        this.wowCount = wowCount;
    }

    public Date getInsertDate() {
        return insertDate;
    }

    public void setInsertDate(Date insertDate) {
        this.insertDate = insertDate;
    }

    public Date getConfirmationDate() {
        return confirmationDate;
    }

    public void setConfirmationDate(Date confirmationDate) {
        this.confirmationDate = confirmationDate;
    }

    public User getUserId() {
        return userId;
    }

    public void setUserId(User userId) {
        this.userId = userId;
    }

   
   
}
