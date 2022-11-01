package com.example.CLOOK.dao;

import org.springframework.stereotype.Repository;

import com.example.CLOOK.domain.GeocodingVO;

import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;
import java.io.BufferedReader;
import java.io.IOException;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

@Repository
public interface SearchRepsitory {

    public static List<String> getLocation(String address) throws IOException, ParseException {

        String apiUrl = "http://api.vworld.kr/req/search";

        String service = "search";
        String request = "search";
        String version = "2.0";
        String crs = "EPSG:900913";
        String size = "1000";
        String page = "1";
        String query = address;
        String type = "district";
        String category = "L4";
        String format = "json";
        String errorformat = "json";
        // 홈페이지에서 받은 키
        String key = "3184253A-C2B2-3AC5-B22B-187DAB8DEF7A";

        StringBuilder urlBuilder = new StringBuilder(apiUrl);
        urlBuilder.append("?" + URLEncoder.encode("service", "UTF-8") + "=" + service);
        urlBuilder.append("&" + URLEncoder.encode("request", "UTF-8") + "=" + URLEncoder.encode(request, "UTF-8"));

        urlBuilder.append("&" + URLEncoder.encode("version", "UTF-8") + "="
                + URLEncoder.encode(version, "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("crs", "UTF-8") + "=" + URLEncoder.encode(crs, "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("size", "UTF-8") + "="
                + URLEncoder.encode(size, "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("page", "UTF-8") + "="
                + URLEncoder.encode(page, "UTF-8"));

        urlBuilder.append("&" + URLEncoder.encode("query", "UTF-8") + "=" + URLEncoder.encode(query, "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("type", "UTF-8") + "=" + URLEncoder.encode(type, "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("category", "UTF-8") + "=" + URLEncoder.encode(category, "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("format", "UTF-8") + "=" + URLEncoder.encode(format, "UTF-8"));
        urlBuilder.append(
                "&" + URLEncoder.encode("errorformat", "UTF-8") + "=" + URLEncoder.encode(errorformat, "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("key", "UTF-8") + "=" + URLEncoder.encode(key, "UTF-8"));

        URL url = new URL(urlBuilder.toString());
        // 어떻게 넘어가는지 확인하고 싶으면 아래 출력분 주석 해제
        // System.out.println(url);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/json");
        System.out.println("Response code: " + conn.getResponseCode());

        BufferedReader rd;
        if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
        rd = new BufferedReader(new InputStreamReader(conn.getInputStream(),"UTF-8"));
        } else {
        rd = new BufferedReader(new InputStreamReader(conn.getErrorStream(),"UTF-8"));
        }

        GeocodingVO geocodingVO = new GeocodingVO();

        List<String> addressList = new ArrayList<String>();

        JSONParser parser = new JSONParser();
        JSONObject object = (JSONObject) parser.parse(rd.readLine());
        JSONObject response = (JSONObject) object.get("response");
        String status = (String) response.get("status");

        String resultString;

        if(status.equals("NOT_FOUND"))
        {
            resultString="잘못된 주소입니다. 다시한번 확인해 주시기 바랍니다";
            addressList.add(resultString);

        }else if(status.equals("ERROR"))
        {
            resultString="서버 에러입니다. 관리자에게 문의해주시기 바랍니다";
            addressList.add(resultString);
        }else{

            JSONObject result = (JSONObject) response.get("result");
            JSONArray items = (JSONArray) result.get("items");

            for(int i=0; i<items.size();i++){
                object = (JSONObject) items.get(i);
                String title = (String) object.get("title");
                
                addressList.add(title);
                geocodingVO.setAddress(addressList);
            }
            
            return geocodingVO.getAddress();

        }
        return addressList;



        /*JSONObject searchPoiInfo = (JSONObject) object.get("searchPoiInfo");
        JSONObject pois = (JSONObject) searchPoiInfo.get("pois");
        JSONArray poiArr = (JSONArray) pois.get("poi");
        for (int i = 0; i < poiArr.size(); i++) {
            object = (JSONObject) poiArr.get(i);
            String middleAddrName = (String) object.get("middleAddrName");
            String roadName = (String) object.get("roadName");
            String firstBuildNo = (String) object.get("firstBuildNo");

            findDto.setMiddleAddrName(middleAddrName);
            findDto.setRoadName(roadName);
            findDto.setFirstBuildNo(firstBuildNo);
        }*/

        /*
         * BufferedReader rd;
         * if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
         * rd = new BufferedReader(new InputStreamReader(conn.getInputStream(),
         * "UTF-8"));
         * } else {
         * rd = new BufferedReader(new InputStreamReader(conn.getErrorStream(),
         * "UTF-8"));
         * }
         * 
         * StringBuilder sb = new StringBuilder();
         * String line;
         * while ((line = rd.readLine()) != null) {
         * sb.append(line);
         * }
         * rd.close();
         * conn.disconnect();
         * String result = sb.toString();
         */
        
    }

}
