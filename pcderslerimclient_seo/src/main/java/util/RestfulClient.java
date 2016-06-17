package util;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.TypeFactory;
import dto.CategoryDTO;
import dto.CustomCategoryDTO;
import dto.VideoDTO;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.apache.commons.lang.StringEscapeUtils;
import response.ResponseDTO;

public class RestfulClient {

    public static List<CustomCategoryDTO> getCustomCategoriesOfCategory(int categoryId) {
        ObjectMapper mapper = new ObjectMapper();
        List<CustomCategoryDTO> result = new ArrayList<CustomCategoryDTO>();
        try {
            String url = "http://localhost:8080/PCDERSLERIMAPI/customcategories?categoryid1=" + categoryId;

            String resultStr = callRestful(url);
            if (resultStr != null && !resultStr.isEmpty()) {
                ResponseDTO responseDTO = mapper.readValue(resultStr, ResponseDTO.class);
                if (responseDTO != null && responseDTO.getResponseObject() != null) {
                    result = mapper.readValue(
                            mapper.writeValueAsString(responseDTO.getResponseObject()),
                            TypeFactory.defaultInstance().constructCollectionType(List.class, CustomCategoryDTO.class));
                }
            }
            return result;
        } catch (Exception ex) {
            Logger.getLogger(RestfulClient.class.getName()).log(Level.SEVERE, null, ex);
        }

        return result;

    }

    public static List<VideoDTO> getVideos(
            int begin, int end, int categoryId, String search) {
        ObjectMapper mapper = new ObjectMapper();
        List<VideoDTO> result = new ArrayList<VideoDTO>();
        try {
            String url = "http://localhost:8080/PCDERSLERIMAPI/videos?t=1";

//            if (end > 0 && end > begin) {
            url += "&begin=" + begin + "&" + "end=" + end;
//            }

            if (categoryId > 0) {
                url += "&categoryId=" + categoryId;
            }

            if (search != null && !search.isEmpty()) {
                url += "&search=" + search;
            }
            System.out.println("url=" + url);
            String resultStr = callRestful(url);
            if (resultStr != null && !resultStr.isEmpty()) {
                ResponseDTO responseDTO = mapper.readValue(resultStr, ResponseDTO.class);
                if (responseDTO != null && responseDTO.getResponseObject() != null) {
                    result = mapper.readValue(
                            mapper.writeValueAsString(responseDTO.getResponseObject()),
                            TypeFactory.defaultInstance().constructCollectionType(List.class, VideoDTO.class));
                }
            } 

//            for (int i = result.size(); i < 6; i++) {
//                result.add(new VideoDTO());
//            }

            return result;
        } catch (Exception ex) {
            Logger.getLogger(RestfulClient.class.getName()).log(Level.SEVERE, null, ex);
        }

        return result;
    }

    public static VideoDTO getVideo(int videoId) {//bu method ile videonu cekirik
        ObjectMapper mapper = new ObjectMapper();
        VideoDTO result = null;
        if (videoId <= 0) {
            return null;
        }
        try {
            String url = "http://localhost:8080/PCDERSLERIMAPI/videos/" + videoId;

            String resultStr = callRestful(url);
            if (resultStr != null && !resultStr.isEmpty()) {
                ResponseDTO responseDTO = mapper.readValue(resultStr, ResponseDTO.class);
                if (responseDTO != null && responseDTO.getResponseObject() != null) {
                    result = mapper.readValue(
                            mapper.writeValueAsString(responseDTO.getResponseObject()),
                            VideoDTO.class);
                }
            }

//            StringBuilder description = new StringBuilder(StringEscapeUtils.escapeHtml(result.getDescription()));
//
//            result.setDescription(description.toString());
//           
            return result;
        } catch (Exception ex) {
            Logger.getLogger(RestfulClient.class.getName()).log(Level.SEVERE, null, ex);
        }

        return result;
    }

    public static List<CategoryDTO> getCategories() {
        List<CategoryDTO> result = null;
        try {
            String resultStr = callRestful("http://localhost:8080/PCDERSLERIMAPI/categories");
            ResponseDTO responseDTO = new ObjectMapper().readValue(resultStr, ResponseDTO.class);
            if (responseDTO != null && responseDTO.getResponseObject() != null) {
                result = new ObjectMapper().readValue(
                        new ObjectMapper().writeValueAsString(responseDTO.getResponseObject()),
                        TypeFactory.defaultInstance().constructCollectionType(List.class, CategoryDTO.class)
                );

            }
        } catch (Exception ex) {
            Logger.getLogger(RestfulClient.class.getName()).log(Level.SEVERE, null, ex);
        }

        return result;
    }

    public static int getVideosSize(int categoryId, String search) {
        int result = 0;
        try {
            String url = "http://localhost:8080/PCDERSLERIMAPI/videos/size?t=1";

            if (categoryId > 0) {
                url += "&categoryId=" + categoryId;
            }

            if (search != null && !search.isEmpty()) {
                url += "&search=" + search;
            }
            String resultStr = callRestful(url);

            ResponseDTO responseDTO = new ObjectMapper().readValue(resultStr, ResponseDTO.class);
            if (responseDTO != null && responseDTO.getResponseObject() != null) {
                result = new ObjectMapper().readValue(
                        new ObjectMapper().writeValueAsString(responseDTO.getResponseObject()),
                        Integer.class
                );

            }
        } catch (Exception ex) {
            Logger.getLogger(RestfulClient.class.getName()).log(Level.SEVERE, null, ex);
        }

        return result;
    }

    public static String callRestful(String uri) throws MalformedURLException, IOException, Exception {
        URL url = new URL(uri);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();

        conn.setRequestMethod("GET");
        conn.setRequestProperty("Accept", "application/json");

        if (conn.getResponseCode() != 200) {
            throw new Exception("Failed : HTTP error code : "
                    + conn.getResponseCode());
        }

        BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));

        String output;
        StringBuilder resultStr = new StringBuilder();

        while ((output = br.readLine()) != null) {
            resultStr.append(new String(output.getBytes(), "UTF-8"));
        }

        conn.disconnect();

        String resultStr_ = resultStr.toString();

        return resultStr_;
    }

    public static String activateUser(String token) throws Exception {
//        
        String url = "http://localhost:8080/PCDERSLERIMAPI/users/activation?token=" + token;
        String result = callRestful(url);
        return result;
    }
}
