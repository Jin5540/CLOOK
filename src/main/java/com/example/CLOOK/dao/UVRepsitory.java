package com.example.CLOOK.dao;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.io.BufferedReader;
import java.io.IOException;
import org.json.simple.parser.ParseException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import com.example.CLOOK.domain.AirVO;
import com.example.CLOOK.domain.GeocodingVO;
import com.example.CLOOK.domain.UvVO;
import com.example.CLOOK.domain.WeatherVO;

import java.util.stream.Collector;
import java.util.stream.Collectors;

public interface UVRepsitory {

    public static UvVO getUV(String staionName)
            throws IOException, ParseException {

        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());
        DateFormat df = new SimpleDateFormat("yyyyMMdd");
        String currentdate = df.format(cal.getTime());

        SimpleDateFormat hhtime = new SimpleDateFormat("HH");
        String htime = hhtime.format(cal.getTime());
        int hh = Integer.parseInt(htime);

        String apiUrl = "http://apis.data.go.kr/1360000/LivingWthrIdxServiceV3/getUVIdxV3";
        // 홈페이지에서 받은 키
        String serviceKey = "lsreK53XwFXG2rEI3GpisRYQCjg97dt7uTl0HEZnBtYQvqdxXub024qirOptZW3z%2FEJyGQIDVoSWWrzXnUMBxQ%3D%3D";
        String pageNo = "1";
        String numOfRows = "10";
        String dataType = "JSON"; // 타입 xml, json
        String areaNo = "1100000000"; // 
        String time="";

        if(hh>=0&hh<3){
            time=currentdate+"00";
        }else if(hh>=3&hh<6){
            time=currentdate+"03";
        }else if(hh>=6&hh<9){
            time=currentdate+"06";
        }else if(hh>=9&hh<12){
            time=currentdate+"09";
        }else if(hh>=12&hh<15){
            time=currentdate+"12";
        }else if(hh>=15&hh<18){
            time=currentdate+"15";
        }else if(hh>=18&hh<21){
            time=currentdate+"18";
        }else{
            time=currentdate+"21";
        }

        StringBuilder urlBuilder = new StringBuilder(apiUrl);
        urlBuilder.append("?" + URLEncoder.encode("ServiceKey", "UTF-8") + "=" + serviceKey);
        urlBuilder.append("&" + URLEncoder.encode("pageNo", "UTF-8") + "=" + URLEncoder.encode(pageNo, "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("numOfRows", "UTF-8") + "="
                + URLEncoder.encode(numOfRows, "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("dataType", "UTF-8") + "=" + URLEncoder.encode(dataType, "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("areaNo", "UTF-8") + "="
                + URLEncoder.encode(areaNo, "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("time", "UTF-8") + "=" + URLEncoder.encode(time, "UTF-8"));

        // urlBuilder.append("&" + URLEncoder.encode("nx","UTF-8") + "=" +
        // URLEncoder.encode("UTF-8")); //경도
        // urlBuilder.append("&" + URLEncoder.encode("ny","UTF-8") + "=" +
        // URLEncoder.encode(ny, "UTF-8")); //위도

        URL url = new URL(urlBuilder.toString());
        // 어떻게 넘어가는지 확인하고 싶으면 아래 출력분 주석 해제
        // System.out.println(url);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/json");
        System.out.println("Response code: " + conn.getResponseCode());
        BufferedReader rd;
        if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
            rd = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
        } else {
            rd = new BufferedReader(new InputStreamReader(conn.getErrorStream(), "UTF-8"));
        }
        /*
         * StringBuilder sb = new StringBuilder();
         * String line;
         * while ((line = rd.readLine()) != null) {
         * sb.append(line);
         * }
         * rd.close();
         * conn.disconnect();
         * String result = sb.toString();
         * 
         * return result;
         */

        List<UvVO> listsunVO = new ArrayList<UvVO>();

        JSONParser parser = new JSONParser();
        JSONObject object = (JSONObject) parser.parse(rd.readLine());
        JSONObject response = (JSONObject) object.get("response");
        JSONObject body = (JSONObject) response.get("body");
        JSONObject items = (JSONObject) body.get("items");
        JSONArray item = (JSONArray) items.get("item");
        // JSONArray item = (JSONArray) items.get("item");
        UvVO uvVO = new UvVO();

        // String status = (String) response.get("status");
        for (int i = 0; i < item.size(); i++) {
            
            object = (JSONObject) item.get(i);
            String h0 = (String) object.get("h0");
            String h3 = (String) object.get("h3");
            String h6 = (String) object.get("h6");
            String h9 = (String) object.get("h9");
            String h12 = (String) object.get("h12");
            String h15 = (String) object.get("h15");
            String h18 = (String) object.get("h18");
            String h21 = (String) object.get("h21");
            String h24 = (String) object.get("h24");

            String date = (String) object.get("date");

            uvVO.setH0(h0);
            uvVO.setH3(h3);
            uvVO.setH6(h6);
            uvVO.setH9(h9);
            uvVO.setH12(h12);
            uvVO.setH15(h15);
            uvVO.setH18(h18);
            uvVO.setH21(h21);
            uvVO.setH24(h24);
            uvVO.setTime(date);

        }
        //listsunVO.addAll(item);

        return uvVO;

    }

}