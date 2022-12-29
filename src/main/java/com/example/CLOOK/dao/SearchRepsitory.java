package com.example.CLOOK.dao;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;
import org.json.JSONTokener;
import org.json.simple.JSONValue;
import org.json.simple.parser.JSONParser;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.io.BufferedReader;
import java.io.IOException;
import org.json.simple.parser.ParseException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.CLOOK.domain.GeocodingVO;

//import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import lombok.AllArgsConstructor;

@Repository
public interface SearchRepsitory {

    public static GeocodingVO searchData(String address) {

        /*
         * GeocodingVO geocodingVO = new GeocodingVO();
         * 
         * // 주소 입력 -> 위도, 경도 좌표 추출.
         * // BufferedReader io = new BufferedReader(new InputStreamReader(System.in));
         * //String clientId = "7kl71pnx4p";
         * //String clientSecret = "A8vT5bFAcIuGkzIlrxbRhIi1XLut8Ga6NMyBa60M";
         * 
         * String restAPIKey = "0e460a2bbac829d7098cba2a3e967c7e";
         * 
         * try {
         * // String address = io.readLine();
         * String addr = URLEncoder.encode(address, "UTF-8");
         * 
         * // Geocoding 개요에 나와있는 API URL 입력.
         * String apiURL = "https://dapi.kakao.com/v2/local/search/address.json?query="
         * + addr; // JSON
         * 
         * URL url = new URL(apiURL);
         * HttpURLConnection con = (HttpURLConnection) url.openConnection();
         * con.setRequestMethod("GET");
         * 
         * // Geocoding 개요에 나와있는 요청 헤더 입력.
         * //con.setRequestProperty("X-NCP-APIGW-API-KEY-ID", clientId);
         * con.setRequestProperty("Authorization", "KakaoAK " + restAPIKey);
         * //con.setRequestProperty("X-NCP-APIGW-API-KEY", clientSecret);
         * 
         * // 요청 결과 확인. 정상 호출인 경우 200
         * int responseCode = con.getResponseCode();
         * 
         * BufferedReader br;
         * 
         * if (responseCode == 200) {
         * br = new BufferedReader(new InputStreamReader(con.getInputStream(),
         * "UTF-8"));
         * } else {
         * br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
         * System.out.println("에러");
         * }
         * 
         * String inputLine;
         * 
         * StringBuffer response = new StringBuffer();
         * 
         * while ((inputLine = br.readLine()) != null) {
         * response.append(inputLine);
         * }
         * 
         * br.close();
         * 
         * List<String> addressList = new ArrayList<String>();
         * 
         * JSONTokener tokener = new JSONTokener(response.toString());
         * JSONObject object = new JSONObject(tokener);
         * JSONArray arr = object.getJSONArray("addresses");
         * 
         * for (int i = 0; i < arr.length(); i++) {
         * JSONObject temp = (JSONObject) arr.get(i);
         * 
         * double x = Double.valueOf(temp.get("x").toString()).doubleValue();
         * double y = Double.valueOf(temp.get("y").toString()).doubleValue();
         * 
         * geocodingVO.setLat(y);
         * geocodingVO.setLon(x);
         * 
         * addressList.add((String) temp.get("roadAddress"));
         * geocodingVO.setAddress(addressList);
         * }
         * 
         * System.out.println("arr ::: "+arr);
         * 
         * } catch (Exception e) {
         * System.out.println(e);
         * }
         * 
         * return geocodingVO;
         */

        GeocodingVO geocodingVO = new GeocodingVO();

        // 주소 입력 -> 위도, 경도 좌표 추출.
        // BufferedReader io = new BufferedReader(new InputStreamReader(System.in));
        // String clientId = "7kl71pnx4p";
        // String clientSecret = "A8vT5bFAcIuGkzIlrxbRhIi1XLut8Ga6NMyBa60M";

        String restAPIKey = "0e460a2bbac829d7098cba2a3e967c7e";
        List<String> addressList = new ArrayList<String>();
        List<String> hnameList = new ArrayList<String>();
        try {
            // String address = io.readLine();
            String addr = URLEncoder.encode(address, "UTF-8");

            // Geocoding 개요에 나와있는 API URL 입력.
            String apiURL = "https://dapi.kakao.com/v2/local/search/address.json?query=" + addr; // JSON

            URL url = new URL(apiURL);
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("GET");

            // Geocoding 개요에 나와있는 요청 헤더 입력.
            // con.setRequestProperty("X-NCP-APIGW-API-KEY-ID", clientId);
            con.setRequestProperty("Authorization", "KakaoAK " + restAPIKey);
            // con.setRequestProperty("X-NCP-APIGW-API-KEY", clientSecret);

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

            // JSONTokener tokener = new JSONTokener(response.toString());
            JSONObject object = new JSONObject(response.toString());
            // JSONObject object2 = new JSONObject(object);
            // JSONObject documents = new JSONObject(object);
            JSONArray arr = object.getJSONArray("documents");

            // System.out.println("나와라 ::: responese ::: "+arr);

            for (int i = 0; i < arr.length(); i++) {
                JSONObject temp = (JSONObject) arr.get(i);
                if (temp.isNull("road_address")) {

                    JSONObject addressarr = (JSONObject) temp.get("address");

                    System.out.println("temp2 ::: " + addressarr);
                    String address_name = (String) addressarr.get("address_name");
                    String region_3depth_h_name = (String) addressarr.get("region_3depth_h_name");
                    String region_3depth_name = (String) addressarr.get("region_3depth_name");

                    addressList.add(address_name);
                    if (!region_3depth_h_name.equals("")) {
                        hnameList.add(region_3depth_h_name);
                        System.out.println(region_3depth_h_name);
                        System.out.println("add1");
                    }
                    if (!region_3depth_name.equals("")) {
                        hnameList.add(region_3depth_name);
                        System.out.println("add2");
                    }
                    // hnameList.add(region_3depth_h_name);
                    // nameList.add(region_3depth_name);
                    geocodingVO.setAddress(addressList);
                    geocodingVO.setRegionarr(hnameList);
                    // geocodingVO.setRegion_3depth_name(nameList);
                } else {
                    JSONObject addressarr = (JSONObject) temp.get("road_address");

                    System.out.println("temp1 ::: " + addressarr);
                    String address_name = (String) addressarr.get("address_name");
                    //String region_3depth_h_name = (String) addressarr.get("region_3depth_h_name");
                    String region_3depth_name = (String) addressarr.get("region_3depth_name");

                    addressList.add(address_name);
                    if (!region_3depth_name.equals("")) {
                        hnameList.add(region_3depth_name);
                        System.out.println("add2");
                    }
                    // hnameList.add(region_3depth_h_name);
                    // nameList.add(region_3depth_name);
                    geocodingVO.setAddress(addressList);
                    geocodingVO.setRegionarr(hnameList);
                    // geocodingVO.setRegion_3depth_name(nameList);

                }

                System.out.println(temp.isNull("road_address"));
            }

            return geocodingVO;

        } catch (Exception e) {
            System.out.println(e);
        }
        return geocodingVO;
    }

}
