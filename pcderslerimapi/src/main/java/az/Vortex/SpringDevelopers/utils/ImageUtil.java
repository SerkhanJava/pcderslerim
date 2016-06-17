package az.Vortex.SpringDevelopers.utils;


import az.Vortex.SpringDevelopers.response.CustomException;
import az.Vortex.SpringDevelopers.response.ResponseDTO;
import com.sun.org.apache.xerces.internal.impl.dv.util.Base64;
import java.io.File;
import java.io.FileOutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import javax.activation.MimetypesFileTypeMap;

public class ImageUtil {

    SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddhhmmssSSS");

    public ResponseDTO uploadImage(String imageDataString) throws Exception {

        String[] str1 = imageDataString.split("data:image/");
        String[] str2 = str1[1].split(";base64,");
        String imageType = str2[0];
        String imageData = str2[1];

        File dir = new File(System.getProperty("catalina.base") + File.separator + "/docroot/"+ File.separator + "/images");
        if (!dir.exists()) {
            dir.mkdirs();
        }
        byte[] imageByteArray = Base64.decode(imageData);

        String fileName = sdf.format(new Date());

        File serverFile = new File(dir.getAbsolutePath() + File.separator + fileName + "." + imageType);

        FileOutputStream imageOutFile = new FileOutputStream(serverFile);
        imageOutFile.write(imageByteArray);
        imageOutFile.close();

        String mimetype = new MimetypesFileTypeMap().getContentType(serverFile);
        String type = mimetype.split("/")[0];

        if (!type.equals("image")) {
            throw new CustomException("Uploading file is not an image", "Uploading Failed");
        }
        System.out.println(serverFile.getAbsolutePath());
        ResponseDTO result = new ResponseDTO();
        result.setSuccessMessage("Image successfully uploaded");
        result.setResponseObject(serverFile.getName());
        return result;
    }
}
