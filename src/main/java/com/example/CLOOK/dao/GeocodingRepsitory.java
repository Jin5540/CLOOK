package com.example.CLOOK.dao;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.HashMap;

import org.json.JSONArray;
import org.json.JSONObject;
import org.json.JSONTokener;
import org.json.simple.JSONValue;
import org.json.simple.parser.JSONParser;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.CLOOK.domain.GeocodingVO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import lombok.AllArgsConstructor;

@Repository
public interface GeocodingRepsitory{

    public static GeocodingVO getData(String address) {

        GeocodingVO geocodingVO = new GeocodingVO();

        // 주소 입력 -> 위도, 경도 좌표 추출.
        //BufferedReader io = new BufferedReader(new InputStreamReader(System.in));
        String clientId = "7kl71pnx4p";
        String clientSecret = "A8vT5bFAcIuGkzIlrxbRhIi1XLut8Ga6NMyBa60M";

        try {
            System.out.println("주소를 입력해주세요 : ");

            //String address = io.readLine();
            String addr = URLEncoder.encode(address, "UTF-8");

            // Geocoding 개요에 나와있는 API URL 입력.
            String apiURL = "https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=" + addr; // JSON

            URL url = new URL(apiURL);
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("GET");

            // Geocoding 개요에 나와있는 요청 헤더 입력.
            con.setRequestProperty("X-NCP-APIGW-API-KEY-ID", clientId);
            con.setRequestProperty("X-NCP-APIGW-API-KEY", clientSecret);

            // 요청 결과 확인. 정상 호출인 경우 200
            int responseCode = con.getResponseCode();

            BufferedReader br;

            if (responseCode == 200) {
                br = new BufferedReader(new InputStreamReader(con.getInputStream(), "UTF-8"));
            } else {
                br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
            }

            String inputLine;

            StringBuffer response = new StringBuffer();

            while ((inputLine = br.readLine()) != null) {
                response.append(inputLine);
            }

            br.close();

            JSONTokener tokener = new JSONTokener(response.toString());
            JSONObject object = new JSONObject(tokener);
            JSONArray arr = object.getJSONArray("addresses");

            for (int i = 0; i < arr.length(); i++) {
                JSONObject temp = (JSONObject) arr.get(i);
                System.out.println("address : " + temp.get("roadAddress"));
                System.out.println("jibunAddress : " + temp.get("jibunAddress"));

                double x = Double.valueOf(temp.get("x").toString()).doubleValue();
                double y = Double.valueOf(temp.get("y").toString()).doubleValue();

                geocodingVO.setLat(y);
                geocodingVO.setLon(x);
            }

        } catch (Exception e) {
            System.out.println(e);
        }
        
        return geocodingVO;
    }

    public static GeocodingVO changData(GeocodingVO geocodingVO) {

        double RE = 6371.00877; // 지구 반경(km)
        double GRID = 5.0; // 격자 간격(km)
        double SLAT1 = 30.0; // 투영 위도1(degree)
        double SLAT2 = 60.0; // 투영 위도2(degree)
        double OLON = 126.0; // 기준점 경도(degree)
        double OLAT = 38.0; // 기준점 위도(degree)
        double XO = 43; // 기준점 X좌표(GRID)
        double YO = 136; // 기준점 Y좌표(GRID)

        //
        // LCC DFS 좌표변환 ( code : "TO_GRID"(위경도->좌표, lat_X:위도, lng_Y:경도),
        // "TO_GPS"(좌표->위경도, lat_X:x, lng_Y:y) )
        //

        double DEGRAD = Math.PI / 180.0;
        double RADDEG = 180.0 / Math.PI;

        double re = RE / GRID;
        double slat1 = SLAT1 * DEGRAD;
        double slat2 = SLAT2 * DEGRAD;
        double olon = OLON * DEGRAD;
        double olat = OLAT * DEGRAD;

        double sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
        sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
        double sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
        sf = Math.pow(sf, sn) * Math.cos(slat1) / sn;
        double ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
        ro = re * sf / Math.pow(ro, sn);

        // rs.lat = lat_X; //gps 좌표 위도
        // rs.lng = lng_Y; //gps 좌표 경도
        double ra = Math.tan(Math.PI * 0.25 + (geocodingVO.getLat()) * DEGRAD * 0.5);
        System.out.println("vo" + ra);
        ra = re * sf / Math.pow(ra, sn);
        double theta = geocodingVO.getLon() * DEGRAD
                - olon;
        if (theta > Math.PI)
            theta -= 2.0 * Math.PI;
        if (theta < -Math.PI)
            theta += 2.0 * Math.PI;
        theta *= sn;
        double x = Math.floor(ra * Math.sin(theta) + XO + 0.5);
        double y = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);

        geocodingVO.setXLat(x);
        geocodingVO.setYLon(y);
        // rs.x = Math.floor(ra * Math.sin(theta) + XO + 0.5);
        // rs.y = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);

        System.out.println(geocodingVO.getLat());
        System.out.println(geocodingVO.getXLat());
        System.out.println(geocodingVO.getLon());
        System.out.println(geocodingVO.getYLon());

        return geocodingVO;

    }

}
