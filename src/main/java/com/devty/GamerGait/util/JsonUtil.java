package com.devty.GamerGait.util;

public class JsonUtil {
    public static String reWrapToGameReadyJson(String json){
        json = json.substring(json.indexOf("d") - 1, json.length() -2 );
        //Rewrapping Json
        json = ("{" + json + "}");
        return json;
    }
}
