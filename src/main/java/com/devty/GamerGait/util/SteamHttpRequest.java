package com.devty.GamerGait.util;

import com.devty.GamerGait.GamerGaitApplication;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.ProtocolException;
import java.net.URL;

@Component
public class SteamHttpRequest {

    String ggIconUrl = "res/placeholderImg.png";
    String dummyJsonWithNestedUrl =
            "    \"{\"2389880\": {\n" +
            "        \"success\": true,\n" +
            "        \"data\": {\n" +
            "            \"capsule_image\": \"" + ggIconUrl + "\"\n" +
            "            }\n" +
            "        }\n" +
            "    }\"";

    public String getGameDetails(Long id) throws IOException {
        URL url = new URL("https://store.steampowered.com/api/appdetails?appids=" + id);
        HttpURLConnection con = (HttpURLConnection) url.openConnection();
        con.setRequestMethod("GET");

        if(con.getResponseCode() != 200){
            return dummyJsonWithNestedUrl;
        }
        else{
            BufferedReader in = new BufferedReader(
                    new InputStreamReader(con.getInputStream()));
            String inputLine;
            StringBuffer content = new StringBuffer();
            while ((inputLine = in.readLine()) != null) {
                content.append(inputLine);
            }
            return content.toString();
        }
    }
}
