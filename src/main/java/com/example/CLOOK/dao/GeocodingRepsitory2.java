package com.example.CLOOK.dao;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.text.DateFormat;
import java.text.DateFormat;
import java.io.BufferedReader;
import java.io.IOException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import com.example.CLOOK.domain.GeocodingVO;
import com.example.CLOOK.domain.SunVO;
import com.example.CLOOK.domain.UvVO;
import com.example.CLOOK.domain.WeatherVO;

import java.util.stream.Collector;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.time.LocalDate;

@Repository
public interface GeocodingRepsitory2 {

    public static GeocodingVO getData(String address) {

        GeocodingVO geocodingVO = new GeocodingVO();

        String restAPIKey = "0e460a2bbac829d7098cba2a3e967c7e";

        try {
            // String address = io.readLine();
            String addr = URLEncoder.encode(address, "UTF-8");

            // Geocoding 개요에 나와있는 API URL 입력.
            String apiURL = "https://dapi.kakao.com/v2/local/search/address.json?query=" + addr; // JSON

            URL url = new URL(apiURL);
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("GET");

            // Geocoding 개요에 나와있는 요청 헤더 입력.
            //con.setRequestProperty("X-NCP-APIGW-API-KEY-ID", clientId);
            con.setRequestProperty("Authorization", "KakaoAK " + restAPIKey);
            //con.setRequestProperty("X-NCP-APIGW-API-KEY", clientSecret);

            // 요청 결과 확인. 정상 호출인 경우 200
            int responseCode = con.getResponseCode();

            BufferedReader br;

            if (responseCode == 200) {
                br = new BufferedReader(new InputStreamReader(con.getInputStream(), "UTF-8"));
            } else {
                br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
                System.out.println("에러");
            }

            String inputLine;

            StringBuffer response = new StringBuffer();

            while ((inputLine = br.readLine()) != null) {
                response.append(inputLine);
            }

            br.close();

            List<String> addressList = new ArrayList<String>();

            

            //JSONTokener tokener = new JSONTokener(response.toString());
            JSONObject object = new JSONObject(response.toString());
            //JSONObject object2 = new JSONObject(object);
            //JSONObject documents = new JSONObject(object);
            JSONArray arr = object.getJSONArray("documents");

            //System.out.println("나와라 ::: responese ::: "+arr);

            for (int i = 0; i < arr.length(); i++) {
                JSONObject temp = (JSONObject) arr.get(i);

                double x = Double.valueOf(temp.get("x").toString()).doubleValue();
                double y = Double.valueOf(temp.get("y").toString()).doubleValue();

                geocodingVO.setLat(y);
                geocodingVO.setLon(x);
                
                //addressList.add((String) temp.get("roadAddress"));
                geocodingVO.setAddress(addressList);
            }

            System.out.println("geocodingVO ::: "+geocodingVO);

        } catch (Exception e) {
            System.out.println(e);
        }

        return geocodingVO;
    }

}
