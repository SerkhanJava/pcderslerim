package az.Vortex.SpringDevelopers.dto;

import az.Vortex.SpringDevelopers.model.Video;
import az.Vortex.SpringDevelopers.model.VideoLinks;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 *
 * @author Mensure
 */
public class VideoDTO {

    private Integer id;
    private String title;
    private String url;
    private String description;
    private Date date;
    private String focusedWord;
    private String tags;
    private String seoTitle;
    private String seoDescription;
    private String categoryStr;
    private List<VideoLinksDTO> videoLinksList;

    public VideoDTO() {
    }

    public VideoDTO(Integer id, String url) {
        this.id = id;
        this.url = url;
    }

    public VideoDTO(String categoryId) {
        this.categoryStr = categoryId;
    }

    public VideoDTO(Integer id, String title, String url, String description, Date date, String focusedWord, String tags, String seoTitle, String seoDescription, String categoryId, List<VideoLinksDTO> videoLinksList) {
        this.id = id;
        this.title = title;
        this.url = url;
        this.description = description;
        this.date = date;
        this.focusedWord = focusedWord;
        this.tags = tags;
        this.seoTitle = seoTitle;
        this.seoDescription = seoDescription;
        this.categoryStr = categoryId;
        this.videoLinksList = videoLinksList;
    }

    
    
    public VideoDTO(Video video) {
        id = video.getId();
        title = video.getTitle();
        url = video.getUrl();
        description = video.getDescription();
        date = video.getDate();
        tags = video.getTags();
        focusedWord = video.getFocusedWord();
        seoTitle = video.getSeoTitle();
        seoDescription = video.getSeoDescription();

        categoryStr = video.getCategoryId();
        videoLinksList = new ArrayList<VideoLinksDTO>();

        List<VideoLinks> list = video.getVideoLinksList();
        for (int i = 0; i < list.size(); i++) {
            if (list.get(i) != null) {
                videoLinksList.add(new VideoLinksDTO(list.get(i)));
            }
        }
    }
 

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {

        this.title = title;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getFocusedWord() {
        return focusedWord;
    }

    public void setFocusedWord(String focusedWord) {
        this.focusedWord = focusedWord;
    }

    public String getTags() {
        return tags;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }

    public String getSeoTitle() {
        return seoTitle;
    }

    public void setSeoTitle(String seoTitle) {
        this.seoTitle = seoTitle;
    }

    public String getSeoDescription() {
        return seoDescription;
    }

    public void setSeoDescription(String seoDescription) {
        this.seoDescription = seoDescription;
    }

    public String getCategoryStr() {
        return categoryStr;
    }

    public void setCategoryStr(String categoryId) {
        this.categoryStr = categoryId;
    }

    public List<VideoLinksDTO> getLinks() {
        return videoLinksList;
    }

    public void setLinks(List<VideoLinksDTO> videoLinksList) {
        this.videoLinksList = videoLinksList;
    }

}
