package dto;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.apache.commons.lang.StringEscapeUtils;
import util.DescriptionDTO;
import util.ParseUtil;

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

    public String getDescriptionAsHtml() {
        StringBuilder str = new StringBuilder();

        List<DescriptionDTO> contents = ParseUtil.parseDescription(description);
        //desciption gonderilir parseDescriptiona ve oradan DescriptionDTO lar goturulur
        for (DescriptionDTO ddto : contents) {
            if (ddto.getH1() != null && !ddto.getH1().trim().isEmpty()) {

                str.append("<h1>" + ddto.getH1() + "</h1>");
            }

            if (ddto.getH2() != null && !ddto.getH2().trim().isEmpty()) {//""
                str.append("<h2>" + ddto.getH2() + "</h2>");
            }

            if (ddto.getP() != null && !ddto.getP().trim().isEmpty()) {
//                StringBuilder p = new StringBuilder(ddto.getP());
//                int fromIndex = 0;
//                boolean firsMatch = true;
//                while ((fromIndex = p.indexOf("\"", fromIndex)) > 0) {
//                    if (firsMatch) {
//                        p = p.insert(fromIndex, "<b>");
//                        firsMatch = false;
//                    } else {
//                        p = p.insert(fromIndex-1, "</b>");
//                        firsMatch = true;
//                    }
//                }
                str.append("<p>" + ddto.getP() + "</p>");
            }//alt+shift+f

            List<String> ulLis = ddto.getUlLi();
            List<String> olLis = ddto.getOlLi();
            if (ulLis.size() > 0) {
                str.append("<ul>");
                for (String liStr : ulLis) {
                    if (liStr.contains("http://") || liStr.contains("https://")) {
                        String foundWord = "";
                        String foundWordAsLink = "";
                        String[] tokens = liStr.split(" ");
                        for (int i = 0; i < tokens.length; i++) {
                            if (tokens[i].contains("http://") || tokens[i].contains("https://")) {
                                foundWord = tokens[i];
                                foundWordAsLink = "<a href=\"" + foundWord + "\">" + foundWord + "</a>";
                            }
                        }
                        String result = liStr.replace(foundWord, foundWordAsLink);
                        str.append("<li>" + result + "</li>");
                        continue;
                    }

                    //split edirsen butun sozleri goturursen
                    // foundWordAsLink="<a href=\"foundWord\">foundWord</a>";
                    //  String result = liStr.replace(foundWord,foundWordAsLink);
                    //str.append("<li>" + result + "</li>");
                    //butun sozler arasindan icinde http:// olan sozu tapirsan tutaq ki tapdin ve hemin sozu atdin foundWord deyishenine
                    //foundWordAsLink = <a href="foundWord">foundWord</a>
                    str.append("<li>" + liStr + "</li>");
                }
                str.append("</ul>");
            }

            if (olLis.size() > 0) {
                str.append("<ol>");
                for (String s : olLis) {
                    str.append("<li>" + s + "</li>");
                }
                str.append("</ol>");
            }
        }
        return str.toString();
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

    public void setCategoryStr(String categoryStr) {
        this.categoryStr = categoryStr;
    }

 
    
    public List<VideoLinksDTO> getLinks() {
        return videoLinksList;
    }

    public void setLinks(List<VideoLinksDTO> videoLinksList) {
        this.videoLinksList = videoLinksList;
    }

}
