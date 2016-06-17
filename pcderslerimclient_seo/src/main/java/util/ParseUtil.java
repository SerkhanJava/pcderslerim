/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package util;

import java.io.File;
import java.io.FileReader;
import java.io.Reader;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Zeynal
 */
public class ParseUtil {

    public static List<DescriptionDTO> parseDescription(String data) {
        List<DescriptionDTO> contents = new ArrayList<DescriptionDTO>();

        String[] arr = data.split("\n");
        for (int i = 0; i < arr.length; i++) {
            if(arr[i].trim().isEmpty()){
                continue;
            }
            if (arr[i] != null && !arr[i].trim().isEmpty() && 
                    arr[i].length() < 100 && 
                    String.valueOf(arr[i].charAt(0)).equals("-") != true && 
                    isNumeric(String.valueOf(arr[i].charAt(0))) != true) {//burda ki sherler h1-in shertine uygun gelir
                contents.add(new DescriptionDTO(
                        arr[i], null, null, new ArrayList<String>(),
                        new ArrayList<String>()
                )
                );
            } else if (String.valueOf(arr[i].charAt(0)).equals("-")) {//burdaki shertler li-nin
                contents.get(contents.size() - 1).getUlLi().add(arr[i]);
            } else if (isNumeric(String.valueOf(arr[i].charAt(0)))) {//ol-nin
                contents.get(contents.size() - 1).getOlLi().add(arr[i]);
            } else if (arr[i] != null && arr[i].length() > 100 &&
                    arr[i].length() < 170 && 
                    String.valueOf(arr[i].charAt(0)).equals("-") != true && 
                    isNumeric(String.valueOf(arr[i].charAt(0))) != true) {//h2-nin
                contents.add(new DescriptionDTO(
                        null, arr[i], null, new ArrayList<String>(),
                        new ArrayList<String>()
                )
                );
            } else if (arr[i] != null && arr[i].length() > 170 && 
                    String.valueOf(arr[i].charAt(0)).equals("-") != true && 
                    isNumeric(String.valueOf(arr[i].charAt(0))) != true) {//p-nin shertlerine uygun gelir
                contents.add(new DescriptionDTO(
                        null, null, arr[i], new ArrayList<String>(),
                        new ArrayList<String>()
                )
                );
            }
        }
//        System.out.println("contents size=" + contents.size());
//        for (DescriptionDTO ddto : contents) {
//            System.out.println("h1=" + ddto.getH1());
//            System.out.println("h2=" + ddto.getH2());
//            System.out.println("p=" + ddto.getP());
//            List<String> ulLis = ddto.getUlLi();
//            List<String> olLis = ddto.getOlLi();
//            for (String s : ulLis) {
//                System.out.println("li=" + s);
//            }
//            for (String s : olLis) {
//                System.out.println("ol=" + s);
//            }
//            System.out.println("------------");
//        }
        return contents;//contentler listini return edir
    }

    public static boolean isNumeric(String str) {
        try {
            int d = Integer.parseInt(str);
        } catch (NumberFormatException nfe) {
            return false;
        }
        return true;
    }
}
