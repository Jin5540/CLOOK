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

public interface WeatherRepsitory {

    public static List<WeatherVO> getShortWeather(GeocodingVO geocodingVO)
            throws IOException, ParseException {
        // 현재 시간
        LocalTime now = LocalTime.now();
        // 포맷 정의하기
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HHmm");
        // 포맷 적용하기
        String formatedNow = now.format(formatter);
        // 포맷 적용된 현재 시간 출력

        int formatnow = Integer.parseInt(formatedNow);
        // int formatnow = 02;

        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());
        DateFormat df = new SimpleDateFormat("yyyyMMdd");
        String currentdate = df.format(cal.getTime());

        cal.add(Calendar.DATE, -1);
        String oneth = df.format(cal.getTime());
        System.out.println(oneth);

        String apiUrl = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst";
        // 홈페이지에서 받은 키
        String serviceKey = "lsreK53XwFXG2rEI3GpisRYQCjg97dt7uTl0HEZnBtYQvqdxXub024qirOptZW3z%2FEJyGQIDVoSWWrzXnUMBxQ%3D%3D";
        String pageNo = "1";
        String numOfRows = "100000";
        String baseDate = "";
        // 조회하고싶은 날짜
        if (formatnow >= 0 & formatnow <= 210) {
            baseDate = oneth;
        } else {
            baseDate = currentdate;
        }
        String baseTime = ""; // 조회하고싶은 시간
        if (formatnow >= 0 & formatnow <= 210) {
            baseTime = "2300";
        } else {
            baseTime = "0200";
        }
        String type = "JSON"; // 타입 xml, json 등등 ..
        String nx = geocodingVO.getXLat(); // 위도
        String ny = geocodingVO.getYLon();

        cal.add(Calendar.DATE, 1);
        String twoth = df.format(cal.getTime());
        System.out.println(twoth);
        cal.add(Calendar.DATE, 1);
        String threeth = df.format(cal.getTime());
        System.out.println(threeth);

        StringBuilder urlBuilder = new StringBuilder(apiUrl);
        urlBuilder.append("?" + URLEncoder.encode("ServiceKey", "UTF-8") + "=" + serviceKey);
        urlBuilder.append("&" + URLEncoder.encode("pageNo", "UTF-8") + "=" + URLEncoder.encode(pageNo, "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("numOfRows", "UTF-8") + "="
                + URLEncoder.encode(numOfRows, "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("dataType", "UTF-8") + "=" + URLEncoder.encode(type, "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("base_date", "UTF-8") + "="
                + URLEncoder.encode(baseDate, "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("base_time", "UTF-8") + "="
                + URLEncoder.encode(baseTime, "UTF-8"));

        urlBuilder.append("&" + URLEncoder.encode("nx", "UTF-8") + "=" + URLEncoder.encode(nx, "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("ny", "UTF-8") + "=" + URLEncoder.encode(ny, "UTF-8"));
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

        List<WeatherVO> listweatherVO = new ArrayList<WeatherVO>();

        JSONParser parser = new JSONParser();
        JSONObject object = (JSONObject) parser.parse(rd.readLine());
        JSONObject response = (JSONObject) object.get("response");
        JSONObject body = (JSONObject) response.get("body");
        JSONObject items = (JSONObject) body.get("items");
        JSONArray item = (JSONArray) items.get("item");

        String fcstDate = "";
        String fcstTime = "";

        // String status = (String) response.get("status");
        for (int i = 0; i < item.size(); i++) {
            WeatherVO weatherVO = new WeatherVO();
            object = (JSONObject) item.get(i);
            fcstDate = (String) object.get("fcstDate");
            fcstTime = (String) object.get("fcstTime");
            String category = (String) object.get("category");

            // System.out.println(fcstDate);
            // System.out.println(category);
            if (fcstDate.equals(currentdate)) {

                if (category.equals("POP")) {
                    String result = (String) object.get("fcstValue");
                    weatherVO.setPop(result);
                    weatherVO.setFcstTime(fcstTime);
                    weatherVO.setFcstDate(fcstDate);
                    listweatherVO.add(weatherVO);
                } else if (category.equals("PTY")) {

                    String result = (String) object.get("fcstValue");
                    weatherVO.setPty(result);
                    weatherVO.setFcstTime(fcstTime);
                    weatherVO.setFcstDate(fcstDate);
                    listweatherVO.add(weatherVO);

                } else if (category.equals("PCP")) {

                    String result = (String) object.get("fcstValue");
                    weatherVO.setPcp(result);
                    weatherVO.setFcstTime(fcstTime);
                    weatherVO.setFcstDate(fcstDate);
                    listweatherVO.add(weatherVO);

                } else if (category.equals("REH")) {

                    String result = (String) object.get("fcstValue");
                    weatherVO.setReh(result);
                    weatherVO.setFcstTime(fcstTime);
                    weatherVO.setFcstDate(fcstDate);
                    listweatherVO.add(weatherVO);

                } else if (category.equals("SNO")) {

                    String result = (String) object.get("fcstValue");
                    weatherVO.setSno(result);
                    weatherVO.setFcstTime(fcstTime);
                    weatherVO.setFcstDate(fcstDate);
                    listweatherVO.add(weatherVO);

                } else if (category.equals("SKY")) {

                    String result = (String) object.get("fcstValue");
                    weatherVO.setSky(result);
                    weatherVO.setFcstTime(fcstTime);
                    weatherVO.setFcstDate(fcstDate);
                    listweatherVO.add(weatherVO);

                } else if (category.equals("VEC")) {

                    String result = (String) object.get("fcstValue");
                    weatherVO.setVec(result);
                    weatherVO.setFcstTime(fcstTime);
                    weatherVO.setFcstDate(fcstDate);
                    listweatherVO.add(weatherVO);
                }

            } else {

                if (category.equals("PTY")) {

                    String result = (String) object.get("fcstValue");
                    weatherVO.setPty(result);
                    weatherVO.setFcstTime(fcstTime);
                    weatherVO.setFcstDate(fcstDate);
                    listweatherVO.add(weatherVO);

                } else if (category.equals("SKY")) {

                    String result = (String) object.get("fcstValue");
                    weatherVO.setSky(result);
                    weatherVO.setFcstTime(fcstTime);
                    weatherVO.setFcstDate(fcstDate);
                    listweatherVO.add(weatherVO);

                } else if (category.equals("TMN")) {

                    String result = (String) object.get("fcstValue");
                    weatherVO.setTmn(result);
                    weatherVO.setFcstTime(fcstTime);
                    weatherVO.setFcstDate(fcstDate);
                    listweatherVO.add(weatherVO);

                } else if (category.equals("TMX")) {

                    String result = (String) object.get("fcstValue");
                    weatherVO.setTmx(result);
                    weatherVO.setFcstTime(fcstTime);
                    weatherVO.setFcstDate(fcstDate);
                    listweatherVO.add(weatherVO);

                }

            }

        }

        return listweatherVO;

    }

    public static List<WeatherVO> getShortWeather4(GeocodingVO geocodingVO, UvVO uv)
            throws IOException, ParseException, java.text.ParseException {

        // 현재 시간
        LocalTime now = LocalTime.now();
        // 포맷 정의하기
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HHmm");
        // 포맷 적용하기
        String formatedNow = now.format(formatter);

        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());

        SimpleDateFormat nowformatter = new SimpleDateFormat("yyyyMMddHHmm");
        String nowformat = nowformatter.format(cal.getTime());

        System.out.println(nowformat);

        int formatnow = Integer.parseInt(formatedNow);
        // int formatnow = 2400;
        // int formatnow = 02;

        DateFormat df = new SimpleDateFormat("yyyyMMdd");
        String currentdate = df.format(cal.getTime());

        SimpleDateFormat hhtime = new SimpleDateFormat("HH");

        String htime = hhtime.format(cal.getTime());

        int hh = Integer.parseInt(htime) + 1;

        String hhh = String.valueOf(hh) + "00";

        cal.add(Calendar.DATE, -1);
        String oneth = df.format(cal.getTime());

        String apiUrl = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst";
        // 홈페이지에서 받은 키
        String serviceKey = "lsreK53XwFXG2rEI3GpisRYQCjg97dt7uTl0HEZnBtYQvqdxXub024qirOptZW3z%2FEJyGQIDVoSWWrzXnUMBxQ%3D%3D";
        String pageNo = "1";
        String numOfRows = "100000";
        String baseDate = "";
        // 조회하고싶은 날짜
        if (formatnow <= 210 & formatnow >= 0 || formatnow == 2400) {
            baseDate = oneth;
        } else {
            baseDate = currentdate;
        }
        String baseTime = ""; // 조회하고싶은 시간
        if (formatnow >= 210 & formatnow < 510) {
            baseTime = "0200";
        } else if (formatnow >= 510 & formatnow < 810) {
            baseTime = "0500";
        } else if (formatnow >= 810 & formatnow < 1110) {
            baseTime = "0800";
        } else if (formatnow >= 1110 & formatnow < 1410) {
            baseTime = "1100";
        } else if (formatnow >= 1410 & formatnow < 1710) {
            baseTime = "1400";
        } else if (formatnow >= 1710 & formatnow < 2010) {
            baseTime = "1700";
        } else if (formatnow >= 2010 & formatnow < 2310) {
            baseTime = "2000";
        } else {
            baseTime = "2300";
        }

        String type = "JSON"; // 타입 xml, json 등등 ..
        String nx = geocodingVO.getXLat(); // 위도
        String ny = geocodingVO.getYLon();

        StringBuilder urlBuilder = new StringBuilder(apiUrl);
        urlBuilder.append("?" + URLEncoder.encode("ServiceKey", "UTF-8") + "=" + serviceKey);
        urlBuilder.append("&" + URLEncoder.encode("pageNo", "UTF-8") + "=" + URLEncoder.encode(pageNo, "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("numOfRows", "UTF-8") + "="
                + URLEncoder.encode(numOfRows, "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("dataType", "UTF-8") + "=" + URLEncoder.encode(type, "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("base_date", "UTF-8") + "="
                + URLEncoder.encode(baseDate, "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("base_time", "UTF-8") + "="
                + URLEncoder.encode(baseTime, "UTF-8"));

        urlBuilder.append("&" + URLEncoder.encode("nx", "UTF-8") + "=" + URLEncoder.encode(nx, "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("ny", "UTF-8") + "=" + URLEncoder.encode(ny, "UTF-8"));
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

        List<WeatherVO> listweatherVO = new ArrayList<WeatherVO>();
        List<WeatherVO> listVO = new ArrayList<WeatherVO>();
        List<WeatherVO> clothesVO = new ArrayList<WeatherVO>();

        JSONParser parser = new JSONParser();
        JSONObject object = (JSONObject) parser.parse(rd.readLine());
        JSONObject response = (JSONObject) object.get("response");
        JSONObject body = (JSONObject) response.get("body");
        JSONObject items = (JSONObject) body.get("items");
        JSONArray item = (JSONArray) items.get("item");

        String fcstDate = "";
        String fcstTime = "";

        int countgr = 0;
        int counttm = 0;
        int countsk = 0;

        // String status = (String) response.get("status");
        for (int i = 0; i < item.size(); i++) {
            WeatherVO weatherVO = new WeatherVO();
            object = (JSONObject) item.get(i);
            fcstDate = (String) object.get("fcstDate");
            fcstTime = (String) object.get("fcstTime");

            int time = Integer.parseInt(fcstTime);

            String category = (String) object.get("category");

            weatherVO.setFcstDate(fcstDate);
            weatherVO.setFcstTime(fcstTime);

            String setdatetime = weatherVO.getFcstDate() + weatherVO.getFcstTime();
            Date format1 = new SimpleDateFormat("yyyyMMddHHmm").parse(setdatetime);
            Date format2 = new SimpleDateFormat("yyyyMMddHHmm").parse(nowformat);

            long time_difference = format1.getTime() - format2.getTime();

            long hours_difference = (time_difference / (1000 * 60 * 60)) % 24;
            long min_difference = time_difference / 60000;

            if (min_difference > 0 & min_difference <= 1440) {

                if (category.equals("TMP")) {
                    String result = (String) object.get("fcstValue");
                    weatherVO.setTmp(result);
                    weatherVO.setFcstTime(fcstTime);
                    weatherVO.setFcstDate(fcstDate);
                    listweatherVO.add(weatherVO);

                } else if (category.equals("PTY")) {
                    String result = (String) object.get("fcstValue");
                    if (result.equals("1") || result.equals("5") || result.equals("2") || result.equals("6")
                            || result.equals("3") || result.equals("7")) {
                        weatherVO.setPty(result);
                        weatherVO.setFcstTime(fcstTime);
                        weatherVO.setFcstDate(fcstDate);
                        listVO.add(weatherVO);
                    }
                }

            }

        }

        int sum = 0;
        int count = 0;
        int retmp = 0;
        int nowcount = 0;

        System.out.println("uv ::: " + uv);

        System.out.println("size ::: " + listweatherVO.size());
        int h = -1;

        for (int j = 0; j < listweatherVO.size(); j++) {
            WeatherVO weatherVO = new WeatherVO();

            int fcTime = Integer.parseInt(listweatherVO.get(j).getFcstTime());
            int ltmp = Integer.parseInt(listweatherVO.get(j).getTmp());
            // System.out.println("clothes:::" + listweatherVO.get(j).getFcstTime());

            int hhhint = Integer.parseInt(hhh);

            if (listweatherVO.get(j).getTmp() != null & listweatherVO.get(j).getFcstTime() != null) {
                h++;
                count++;
                if (hhhint % 300 == 0 & j < 3 & nowcount < 3) {
                    nowcount++;
                    weatherVO.setM("지금");
                    System.out.println("3::" + h);

                    if (count <= 3) {
                        sum = ltmp + sum;
                    }
                    if (count == 3) {
                        retmp = sum / 3;
                        weatherVO.setTmpl(retmp);
                        listVO.add(weatherVO);
                        weatherVO.setH0(uv.getH0());

                        count = 0;
                        sum = 0;
                    }
                } else if (hhhint % 300 == 100 && j < 3 & nowcount < 2) {
                    nowcount++;
                    weatherVO.setM("지금");
                    System.out.println("2::" + h);
                    if (count <= 2) {
                        sum = ltmp + sum;
                    }
                    if (count == 2) {
                        retmp = sum / 2;
                        weatherVO.setTmpl(retmp);
                        weatherVO.setH0(uv.getH0());

                        listVO.add(weatherVO);

                        count = 0;
                        sum = 0;
                    }
                } else if (hhhint % 300 == 200 & j < 3 & nowcount < 1) {
                    nowcount++;
                    weatherVO.setM("지금");
                    System.out.println("1::" + h);
                    weatherVO.setTmpl(ltmp);
                    weatherVO.setH0(uv.getH0());

                    listVO.add(weatherVO);

                    count = 0;
                    sum = 0;
                } else {
                    if (count <= 3) {
                        sum = ltmp + sum;
                    }
                    if (count == 3) {
                        retmp = sum / 3;
                        weatherVO.setTmpl(retmp);
                        int resultfctime1 = Integer.parseInt(listweatherVO.get(j).getFcstTime()) + 100;
                        String resultfctime2 = String.valueOf(resultfctime1);
                        weatherVO.setM(resultfctime2);

                        if (h == 3) {
                            weatherVO.setH3(uv.getH3());
                        } else if (h == 6) {
                            weatherVO.setH6(uv.getH6());
                        } else if (h == 9) {
                            weatherVO.setH9(uv.getH9());
                        } else if (h == 12) {
                            weatherVO.setH12(uv.getH12());
                        } else if (h == 15) {
                            weatherVO.setH15(uv.getH15());
                        } else if (h == 18) {
                            weatherVO.setH18(uv.getH18());
                        } else if (h == 21) {
                            weatherVO.setH21(uv.getH21());
                        }
                        System.out.println("HH ::" + weatherVO);

                        listVO.add(weatherVO);

                        count = 0;
                        sum = 0;
                        System.out.println(h);
                    }
                }

            }

        }

        for (int j = 0; j < listVO.size(); j++) {
            WeatherVO weatherVO = new WeatherVO();

            if (listVO.get(j).getTmpl() != null) {
                int a = listVO.get(j).getTmpl();
                String m = listVO.get(j).getM();
                if (28 <= a) {
                    weatherVO.setClothes1("민소매");
                } else if (25 <= a & a < 28) {

                    weatherVO.setClothes1("반팔티");
                } else if (23 <= a & a < 25) {

                    weatherVO.setClothes1("반팔티");
                    weatherVO.setClothes2("얇은셔츠");
                } else if (21 <= a & a < 23) {

                    weatherVO.setClothes1("긴팔티");
                    weatherVO.setClothes2("얇은셔츠");
                } else if (16 <= a & a < 21) {
                    weatherVO.setClothes1("긴팔티");
                    weatherVO.setClothes2("가디건");

                } else if (12 <= a & a < 16) {

                    weatherVO.setClothes1("긴팔티");
                    weatherVO.setClothes2("자켓");
                } else if (10 <= a & a < 12) {
                    weatherVO.setClothes1("니트");
                    weatherVO.setClothes2("자켓");

                } else if (7 <= a & a < 10) {
                    weatherVO.setClothes1("니트");
                    weatherVO.setClothes2("코트");

                } else if (4 <= a & a < 7) {
                    weatherVO.setClothes1("니트");
                    weatherVO.setClothes2("패딩");

                } else if (a < 4) {
                    weatherVO.setClothes1("니트");
                    weatherVO.setClothes2("패딩");

                }
                if (a < 6) {
                    weatherVO.setItem1("목도리");

                }
                if (listVO.get(j).getPty() != null) {
                    String b = listVO.get(j).getPty();
                    if (b.equals('1') || b.equals('2') || b.equals('3') || b.equals('5') || b.equals('6')
                            || b.equals('7')) {
                        weatherVO.setItem2("우산");
                    }
                }
                if (listVO.get(j).getH0() != null) {
                    int h0 = Integer.parseInt(listVO.get(j).getH0());
                    if (h0 > 5) {
                        weatherVO.setItem3("모자");
                    }
                }
                if (listVO.get(j).getH3() != null) {
                    int h3 = Integer.parseInt(listVO.get(j).getH3());
                    if (h3 > 5) {
                        weatherVO.setItem3("모자");
                    }
                }
                if (listVO.get(j).getH6() != null) {
                    int h6 = Integer.parseInt(listVO.get(j).getH6());
                    if (h6 > 5) {
                        weatherVO.setItem3("모자");
                    }
                }
                if (listVO.get(j).getH9() != null) {
                    int h9 = Integer.parseInt(listVO.get(j).getH9());
                    if (h9 > 5) {
                        weatherVO.setItem3("모자");
                    }
                }
                if (listVO.get(j).getH12() != null) {
                    int h12 = Integer.parseInt(listVO.get(j).getH12());
                    if (h12 > 5) {
                        weatherVO.setItem3("모자");

                    }
                }
                if (listVO.get(j).getH15() != null) {
                    int h15 = Integer.parseInt(listVO.get(j).getH15());
                    if (h15 > 5) {
                        weatherVO.setItem3("모자");
                    }
                }
                if (listVO.get(j).getH18() != null) {
                    int h18 = Integer.parseInt(listVO.get(j).getH18());
                    if (h18 > 5) {
                        weatherVO.setItem3("모자");
                    }
                }
                if (listVO.get(j).getH21() != null) {
                    int h21 = Integer.parseInt(listVO.get(j).getH21());
                    if (h21 > 5) {
                        weatherVO.setItem3("모자");
                    }
                }
                weatherVO.setM(m);
                clothesVO.add(weatherVO);
            }

            System.out.println("j" + j + listVO.get(j));

        }

        return clothesVO;

    }

    public static List<WeatherVO> getToday(GeocodingVO geocodingVO, SunVO sun)
            throws IOException, ParseException, java.text.ParseException {
        // 현재 시간
        LocalTime now = LocalTime.now();
        // 포맷 정의하기
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HHmm");
        // 포맷 적용하기
        String formatedNow = now.format(formatter);

        // 포맷 정의하기
        DateTimeFormatter formatter2 = DateTimeFormatter.ofPattern("HH00");
        // 포맷 적용하기
        String formatedNow2 = now.format(formatter2);

        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());

        SimpleDateFormat nowformatter = new SimpleDateFormat("yyyyMMddHHmm");
        String nowformat = nowformatter.format(cal.getTime());

        System.out.println(nowformat);

        int formatnow = Integer.parseInt(formatedNow);
        // int formatnow = 02;

        DateFormat df = new SimpleDateFormat("yyyyMMdd");
        String currentdate = df.format(cal.getTime());

        SimpleDateFormat hhtime = new SimpleDateFormat("HH");

        String htime = hhtime.format(cal.getTime());

        int hh = Integer.parseInt(htime);

        cal.add(Calendar.DATE, -1);
        String oneth = df.format(cal.getTime());

        String apiUrl = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst";
        // 홈페이지에서 받은 키
        String serviceKey = "lsreK53XwFXG2rEI3GpisRYQCjg97dt7uTl0HEZnBtYQvqdxXub024qirOptZW3z%2FEJyGQIDVoSWWrzXnUMBxQ%3D%3D";
        String pageNo = "1";
        String numOfRows = "100000";
        String baseDate = "";
        // 조회하고싶은 날짜
        if (formatnow <= 210 & formatnow >= 0) {
            baseDate = oneth;
        } else {
            baseDate = currentdate;
        }
        String baseTime = ""; // 조회하고싶은 시간
        if (formatnow >= 210 & formatnow < 510) {
            baseTime = "0200";
        } else if (formatnow >= 510 & formatnow < 810) {
            baseTime = "0500";
        } else if (formatnow >= 810 & formatnow < 1110) {
            baseTime = "0800";
        } else if (formatnow >= 1110 & formatnow < 1410) {
            baseTime = "1100";
        } else if (formatnow >= 1410 & formatnow < 1710) {
            baseTime = "1400";
        } else if (formatnow >= 1710 & formatnow < 2010) {
            baseTime = "1700";
        } else if (formatnow >= 2010 & formatnow < 2310) {
            baseTime = "2000";
        } else {
            baseTime = "2300";
        }

        System.out.println(baseDate);
        System.out.println("today + weather" + baseTime);
        String type = "JSON"; // 타입 xml, json 등등 ..
        String nx = geocodingVO.getXLat(); // 위도
        String ny = geocodingVO.getYLon();

        StringBuilder urlBuilder = new StringBuilder(apiUrl);
        urlBuilder.append("?" + URLEncoder.encode("ServiceKey", "UTF-8") + "=" + serviceKey);
        urlBuilder.append("&" + URLEncoder.encode("pageNo", "UTF-8") + "=" + URLEncoder.encode(pageNo, "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("numOfRows", "UTF-8") + "="
                + URLEncoder.encode(numOfRows, "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("dataType", "UTF-8") + "=" + URLEncoder.encode(type, "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("base_date", "UTF-8") + "="
                + URLEncoder.encode(baseDate, "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("base_time", "UTF-8") + "="
                + URLEncoder.encode(baseTime, "UTF-8"));

        urlBuilder.append("&" + URLEncoder.encode("nx", "UTF-8") + "=" + URLEncoder.encode(nx, "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("ny", "UTF-8") + "=" + URLEncoder.encode(ny, "UTF-8"));
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
        // System.out.println("Response code: " + conn.getResponseCode());
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

        List<WeatherVO> listweatherVO = new ArrayList<WeatherVO>();
        List<WeatherVO> listVO = new ArrayList<WeatherVO>();
        List<WeatherVO> resultVO = new ArrayList<WeatherVO>();
        List<WeatherVO> clothesVO = new ArrayList<WeatherVO>();

        WeatherVO weatherVO = new WeatherVO();

        JSONParser parser = new JSONParser();
        JSONObject object = (JSONObject) parser.parse(rd.readLine());
        JSONObject response = (JSONObject) object.get("response");
        JSONObject body = (JSONObject) response.get("body");
        JSONObject items = (JSONObject) body.get("items");
        JSONArray item = (JSONArray) items.get("item");

        String fcstDate = "";
        String fcstTime = "";

        String fday = "";
        String ftime = "";

        // String status = (String) response.get("status");
        int count = 0;
        for (int i = 0; i < item.size(); i = i + 1) {

            object = (JSONObject) item.get(i);

            fcstDate = (String) object.get("fcstDate");
            fcstTime = (String) object.get("fcstTime");
            int fhh = Integer.parseInt(fcstTime);
            String category = (String) object.get("category");

            int fcstDate2 = Integer.parseInt((String) object.get("fcstDate"));
            int fcstTime2 = Integer.parseInt((String) object.get("fcstTime"));

            weatherVO.setFcstTime(fcstTime);
            weatherVO.setFcstDate(fcstDate);

            int time = Integer.parseInt(fcstTime);

            String setdatetime = weatherVO.getFcstDate() + weatherVO.getFcstTime();

            // int setdatetimeint = Integer.parseInt(setdatetime);

            Date format1 = new SimpleDateFormat("yyyyMMddHHmm").parse(setdatetime);
            Date format2 = new SimpleDateFormat("yyyyMMddHHmm").parse(nowformat);

            long time_difference = format1.getTime() - format2.getTime();

            long hours_difference = (time_difference / (1000 * 60 * 60)) % 24;
            long min_difference = time_difference / 60000;

            int formatedNowint = Integer.parseInt(formatedNow2);
            int currentdateint = Integer.parseInt(currentdate);

            if (hours_difference >= 0 & hours_difference <= 23 & min_difference > 0 & min_difference <= 1440) {

                switch (category) {
                    case "TMP":
                        weatherVO.setTmp((object.get("fcstValue")).toString());
                        break;
                    case "SKY":
                        weatherVO.setSky((object.get("fcstValue")).toString());
                        break;
                    case "PTY":
                        weatherVO.setPty((object.get("fcstValue")).toString());
                        break;

                    case "POP":
                        weatherVO.setPop((object.get("fcstValue")).toString());
                        break;

                }
                if (!fday.equals(fcstDate)) {
                    fday = fcstDate.toString();
                }
                if (!ftime.equals(fcstTime)) {
                    ftime = fcstTime.toString();
                }

                weatherVO.setFcstDate((object.get("fcstDate")).toString());
                weatherVO.setFcstTime((object.get("fcstTime")).toString());

                WeatherVO test = new WeatherVO();

                test.setTmp(weatherVO.getTmp());
                test.setSky(weatherVO.getSky());
                test.setPty(weatherVO.getPty());

                int sunrise = Integer.parseInt(sun.getSunrise());
                int sunset = sun.getSunset();

                if (weatherVO.getPty() != null) {
                    if (weatherVO.getPty().equals("1") || weatherVO.getPty().equals("5")) {
                        test.setIcon("비");
                        test.setPop(weatherVO.getPop());
                    } else if (weatherVO.getPty().equals("2") || weatherVO.getPty().equals("6")) {
                        test.setIcon("진눈깨비");
                        test.setPop(weatherVO.getPop());
                    } else if (weatherVO.getPty().equals("3") || weatherVO.getPty().equals("7")) {
                        test.setIcon("눈");
                        test.setPop(weatherVO.getPop());
                    } else {
                        if (weatherVO.getSky() != null) {
                            if (weatherVO.getSky().equals("1")) {
                                if (sunrise <= fhh & sunset >= fhh) {
                                    test.setIcon("해");
                                } else {
                                    test.setIcon("달");
                                }
                            }
                            if (weatherVO.getSky().equals("3")) {
                                if (sunrise <= fhh & sunset >= fhh) {
                                    test.setIcon("해구름");
                                } else {
                                    test.setIcon("달구름");
                                    System.out.println(fhh);
                                }
                            }
                            if (weatherVO.getSky().equals("4")) {
                                test.setIcon("구름");
                            }
                        }
                    }
                }

                test.setFcstDate(weatherVO.getFcstDate());
                test.setFTime(Integer.parseInt(weatherVO.getFcstTime()));

                // System.out.println(test);

                // test = vl;
                if (category.equals("PTY")) {
                    // System.out.println("HAHA!");
                    listweatherVO.add(test);
                    // System.out.println(test);
                } else {
                    // System.out.println("ㅜㅜ");
                }

            }

        }

        if (listweatherVO.get(0).getIcon() == null
                || listweatherVO.get(0).getTmp() == null) {

            Calendar cal1 = Calendar.getInstance();
            cal1.setTime(new Date());

            cal1.add(Calendar.HOUR, -3);
            String threedate = df.format(cal1.getTime());

            // 조회하고싶은 날짜
            baseDate = threedate;

            baseTime = ""; // 조회하고싶은 시간
            int threehh = Integer.parseInt(hhtime.format(cal1.getTime()));
            if (threehh >= 210 & threehh < 510) {
                baseTime = "0200";
            } else if (threehh >= 510 & threehh < 810) {
                baseTime = "0500";
            } else if (threehh >= 810 & threehh < 1110) {
                baseTime = "0800";
            } else if (threehh >= 1110 & threehh < 1410) {
                baseTime = "1100";
            } else if (threehh >= 1410 & threehh < 1710) {
                baseTime = "1400";
            } else if (threehh >= 1710 & threehh < 2010) {
                baseTime = "1700";
            } else if (threehh >= 2010 & threehh < 2310) {
                baseTime = "2000";
            } else {
                baseTime = "2300";
            }
            System.out.println(threedate + ":::" + threehh);

            urlBuilder.append("?" + URLEncoder.encode("ServiceKey", "UTF-8") + "=" + serviceKey);
            urlBuilder.append("&" + URLEncoder.encode("pageNo", "UTF-8") + "=" + URLEncoder.encode(pageNo, "UTF-8"));
            urlBuilder.append("&" + URLEncoder.encode("numOfRows", "UTF-8") + "="
                    + URLEncoder.encode(numOfRows, "UTF-8"));
            urlBuilder.append("&" + URLEncoder.encode("dataType", "UTF-8") + "=" + URLEncoder.encode(type, "UTF-8"));
            urlBuilder.append("&" + URLEncoder.encode("base_date", "UTF-8") + "="
                    + URLEncoder.encode(baseDate, "UTF-8"));
            urlBuilder.append("&" + URLEncoder.encode("base_time", "UTF-8") + "="
                    + URLEncoder.encode(baseTime, "UTF-8"));

            urlBuilder.append("&" + URLEncoder.encode("nx", "UTF-8") + "=" + URLEncoder.encode(nx, "UTF-8"));
            urlBuilder.append("&" + URLEncoder.encode("ny", "UTF-8") + "=" + URLEncoder.encode(ny, "UTF-8"));
            // urlBuilder.append("&" + URLEncoder.encode("nx","UTF-8") + "=" +
            // URLEncoder.encode("UTF-8")); //경도
            // urlBuilder.append("&" + URLEncoder.encode("ny","UTF-8") + "=" +
            // URLEncoder.encode(ny, "UTF-8")); //위도

            final URL url1 = new URL(urlBuilder.toString());
            // 어떻게 넘어가는지 확인하고 싶으면 아래 출력분 주석 해제
            // System.out.println(url);
            HttpURLConnection conn1 = (HttpURLConnection) url1.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Content-type", "application/json");
            // System.out.println("Response code: " + conn.getResponseCode());
            BufferedReader rd1;
            if (conn1.getResponseCode() >= 200 && conn1.getResponseCode() <= 300) {
                rd1 = new BufferedReader(new InputStreamReader(conn1.getInputStream(), "UTF-8"));
            } else {
                rd1 = new BufferedReader(new InputStreamReader(conn1.getErrorStream(), "UTF-8"));
            }

            WeatherVO weatherVO1 = new WeatherVO();

            JSONParser parser1 = new JSONParser();
            JSONObject object1 = (JSONObject) parser1.parse(rd1.readLine());
            JSONObject response1 = (JSONObject) object1.get("response");
            JSONObject body1 = (JSONObject) response1.get("body");
            JSONObject items1 = (JSONObject) body1.get("items");
            JSONArray item1 = (JSONArray) items1.get("item");

            for (int i = 0; i < item1.size(); i = i + 1) {

                object = (JSONObject) item1.get(i);

                String fcstDate1 = (String) object1.get("fcstDate");
                String fcstTime1 = (String) object1.get("fcstTime");
                int fhh = Integer.parseInt(fcstTime1);
                String category = (String) object1.get("category");

                weatherVO1.setFcstTime(fcstTime1);
                weatherVO1.setFcstDate(fcstDate1);

                String setdatetime = weatherVO.getFcstDate() + weatherVO.getFcstTime();

                Date format1 = new SimpleDateFormat("yyyyMMddHHmm").parse(setdatetime);
                Date format2 = new SimpleDateFormat("yyyyMMddHHmm").parse(nowformat);

                long time_difference = format1.getTime() - format2.getTime();

                long hours_difference = (time_difference / (1000 * 60 * 60)) % 24;
                long min_difference = time_difference / 60000;

                if (hours_difference >= 0 & hours_difference <= 23 & min_difference > 0 & min_difference <= 1440) {

                    switch (category) {
                        case "TMP":
                            weatherVO.setTmp((object.get("fcstValue")).toString());
                            break;
                        case "SKY":
                            weatherVO.setSky((object.get("fcstValue")).toString());
                            break;
                        case "PTY":
                            weatherVO.setPty((object.get("fcstValue")).toString());
                            break;

                        case "POP":
                            weatherVO.setPop((object.get("fcstValue")).toString());
                            break;

                    }
                    if (!fday.equals(fcstDate)) {
                        fday = fcstDate.toString();
                    }
                    if (!ftime.equals(fcstTime)) {
                        ftime = fcstTime.toString();
                    }

                    weatherVO.setFcstDate((object.get("fcstDate")).toString());
                    weatherVO.setFcstTime((object.get("fcstTime")).toString());

                    WeatherVO test = new WeatherVO();

                    test.setTmp(weatherVO.getTmp());
                    test.setSky(weatherVO.getSky());
                    test.setPty(weatherVO.getPty());
                    test.setPop(weatherVO.getPop());

                    int sunrise = Integer.parseInt(sun.getSunrise());
                    int sunset = sun.getSunset();

                    if (weatherVO.getPty() != null) {
                        if (weatherVO.getPty().equals("1") || weatherVO.getPty().equals("5")) {
                            test.setIcon("비");
                            test.setPop(weatherVO.getPop());
                        } else if (weatherVO.getPty().equals("2") || weatherVO.getPty().equals("6")) {
                            test.setIcon("진눈깨비");
                            test.setPop(weatherVO.getPop());
                        } else if (weatherVO.getPty().equals("3") || weatherVO.getPty().equals("7")) {
                            test.setIcon("눈");
                            test.setPop(weatherVO.getPop());
                        } else {
                            if (weatherVO.getSky() != null) {
                                if (weatherVO.getSky().equals("1")) {
                                    if (sunrise <= fhh & sunset >= fhh) {
                                        test.setIcon("해");
                                    } else {
                                        test.setIcon("달");
                                    }
                                }
                                if (weatherVO.getSky().equals("3")) {
                                    if (sunrise <= fhh & sunset >= fhh) {
                                        test.setIcon("해구름");
                                    } else {
                                        test.setIcon("달구름");
                                        System.out.println(fhh);
                                    }
                                }
                                if (weatherVO.getSky().equals("4")) {
                                    test.setIcon("구름");
                                }
                            }
                        }
                    }

                    test.setFcstDate(weatherVO.getFcstDate());
                    test.setFTime(Integer.parseInt(weatherVO.getFcstTime()));

                    // System.out.println(test);

                    // test = vl;
                    if (category.equals("PTY")) {
                        // System.out.println("HAHA!");
                        listweatherVO.add(test);
                        // System.out.println(test);
                    } else {
                        // System.out.println("ㅜㅜ");
                    }

                }

            }
        }

        return listweatherVO;
    }

    public static JSONObject getShortWeather2(GeocodingVO geocodingVO)
            throws IOException, ParseException {

        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());
        DateFormat df = new SimpleDateFormat("yyyyMMdd");
        String currentdate = df.format(cal.getTime());

        String apiUrl = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst";
        // 홈페이지에서 받은 키
        String serviceKey = "lsreK53XwFXG2rEI3GpisRYQCjg97dt7uTl0HEZnBtYQvqdxXub024qirOptZW3z%2FEJyGQIDVoSWWrzXnUMBxQ%3D%3D";
        String pageNo = "1";
        String numOfRows = "100000";
        String baseDate = currentdate; // 조회하고싶은 날짜
        String baseTime = "0200"; // 조회하고싶은 시간
        String type = "JSON"; // 타입 xml, json 등등 ..
        String nx = geocodingVO.getXLat(); // 위도
        String ny = geocodingVO.getYLon();

        StringBuilder urlBuilder = new StringBuilder(apiUrl);
        urlBuilder.append("?" + URLEncoder.encode("ServiceKey", "UTF-8") + "=" + serviceKey);
        urlBuilder.append("&" + URLEncoder.encode("pageNo", "UTF-8") + "=" + URLEncoder.encode(pageNo, "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("numOfRows", "UTF-8") + "="
                + URLEncoder.encode(numOfRows, "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("dataType", "UTF-8") + "=" + URLEncoder.encode(type, "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("base_date", "UTF-8") + "="
                + URLEncoder.encode(baseDate, "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("base_time", "UTF-8") + "="
                + URLEncoder.encode(baseTime, "UTF-8"));

        urlBuilder.append("&" + URLEncoder.encode("nx", "UTF-8") + "=" + URLEncoder.encode(nx, "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("ny", "UTF-8") + "=" + URLEncoder.encode(ny, "UTF-8"));
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

        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = rd.readLine()) != null) {
            sb.append(line);
        }

        JSONObject result = (JSONObject) new JSONParser().parse(sb.toString());

        rd.close();
        conn.disconnect();

        /*
         * List<WeatherVO> listweatherVO = new ArrayList<WeatherVO>();
         * 
         * JSONParser parser = new JSONParser();
         * JSONObject object = (JSONObject) parser.parse(rd.readLine());
         * 
         * 
         * JSONObject response = (JSONObject) object.get("response");
         * JSONObject body = (JSONObject) response.get("body");
         * JSONObject items = (JSONObject) body.get("items");
         * JSONArray item = (JSONArray) items.get("item");
         * 
         * String fcstDate = "";
         * String fcstTime = "";
         * 
         * // String status = (String) response.get("status");
         * for (int i = 0; i < item.size(); i++) {
         * WeatherVO weatherVO = new WeatherVO();
         * object = (JSONObject) item.get(i);
         * fcstDate = (String) object.get("fcstDate");
         * fcstTime = (String) object.get("fcstTime");
         * String category = (String) object.get("category");
         * 
         * 
         * }
         * 
         * rd.close();
         * conn.disconnect();
         */

        return result;

    }

    public static String getShortWeather3(GeocodingVO geocodingVO)
            throws IOException, ParseException {

        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());
        DateFormat df = new SimpleDateFormat("yyyyMMdd");
        String currentdate = df.format(cal.getTime());

        String apiUrl = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst";
        // 홈페이지에서 받은 키
        String serviceKey = "lsreK53XwFXG2rEI3GpisRYQCjg97dt7uTl0HEZnBtYQvqdxXub024qirOptZW3z%2FEJyGQIDVoSWWrzXnUMBxQ%3D%3D";
        String pageNo = "1";
        String numOfRows = "100000";
        String baseDate = currentdate; // 조회하고싶은 날짜
        String baseTime = "0200"; // 조회하고싶은 시간
        String type = "JSON"; // 타입 xml, json 등등 ..
        String nx = geocodingVO.getXLat(); // 위도
        String ny = geocodingVO.getYLon();

        StringBuilder urlBuilder = new StringBuilder(apiUrl);
        urlBuilder.append("?" + URLEncoder.encode("ServiceKey", "UTF-8") + "=" + serviceKey);
        urlBuilder.append("&" + URLEncoder.encode("pageNo", "UTF-8") + "=" + URLEncoder.encode(pageNo, "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("numOfRows", "UTF-8") + "="
                + URLEncoder.encode(numOfRows, "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("dataType", "UTF-8") + "=" + URLEncoder.encode(type, "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("base_date", "UTF-8") + "="
                + URLEncoder.encode(baseDate, "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("base_time", "UTF-8") + "="
                + URLEncoder.encode(baseTime, "UTF-8"));

        urlBuilder.append("&" + URLEncoder.encode("nx", "UTF-8") + "=" + URLEncoder.encode(nx, "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("ny", "UTF-8") + "=" + URLEncoder.encode(ny, "UTF-8"));
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

        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = rd.readLine()) != null) {
            sb.append(line);
        }

        String result = sb.toString();

        rd.close();
        conn.disconnect();

        /*
         * List<WeatherVO> listweatherVO = new ArrayList<WeatherVO>();
         * 
         * JSONParser parser = new JSONParser();
         * JSONObject object = (JSONObject) parser.parse(rd.readLine());
         * 
         * 
         * JSONObject response = (JSONObject) object.get("response");
         * JSONObject body = (JSONObject) response.get("body");
         * JSONObject items = (JSONObject) body.get("items");
         * JSONArray item = (JSONArray) items.get("item");
         * 
         * String fcstDate = "";
         * String fcstTime = "";
         * 
         * // String status = (String) response.get("status");
         * for (int i = 0; i < item.size(); i++) {
         * WeatherVO weatherVO = new WeatherVO();
         * object = (JSONObject) item.get(i);
         * fcstDate = (String) object.get("fcstDate");
         * fcstTime = (String) object.get("fcstTime");
         * String category = (String) object.get("category");
         * 
         * 
         * }
         * 
         * rd.close();
         * conn.disconnect();
         */

        return result;

    }

    /* 상단 - TMX / TMN / 예보메세지 */
    public static WeatherVO getShortPartWeather1(GeocodingVO geocodingVO)
            throws IOException, ParseException, java.text.ParseException {

        // 현재 시간
        LocalTime now = LocalTime.now();
        // 포맷 정의하기
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HHmm");
        // 포맷 적용하기
        String formatedNow = now.format(formatter);
        // 포맷 적용된 현재 시간 출력

        int formatnow = Integer.parseInt(formatedNow);
        // int formatnow = 02;

        Calendar calendar = Calendar.getInstance();
        SimpleDateFormat nowformatter = new SimpleDateFormat("yyyyMMddHHmm");
        String nowformat = nowformatter.format(calendar.getTime());

        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());
        DateFormat df = new SimpleDateFormat("yyyyMMdd");
        String currentdate = df.format(cal.getTime());

        cal.add(Calendar.DATE, -1);
        String oneth = df.format(cal.getTime());

        String apiUrl = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst";
        // 홈페이지에서 받은 키
        String serviceKey = "lsreK53XwFXG2rEI3GpisRYQCjg97dt7uTl0HEZnBtYQvqdxXub024qirOptZW3z%2FEJyGQIDVoSWWrzXnUMBxQ%3D%3D";
        String pageNo = "1";
        String numOfRows = "100000";
        String baseDate = "";
        // 조회하고싶은 날짜
        if (formatnow <= 210 & formatnow >= 0) {
            baseDate = oneth;
        } else {
            baseDate = currentdate;
        }
        String baseTime = "";
        if (formatnow <= 210 & formatnow >= 0) {
            baseTime = "2300";
        } else {
            baseTime = "0200";
        }
        String type = "JSON"; // 타입 xml, json 등등 ..
        String nx = geocodingVO.getXLat();
        String ny = geocodingVO.getYLon();

        StringBuilder urlBuilder = new StringBuilder(apiUrl);
        urlBuilder.append("?" + URLEncoder.encode("ServiceKey", "UTF-8") + "=" + serviceKey);
        urlBuilder.append("&" + URLEncoder.encode("pageNo", "UTF-8") + "=" + URLEncoder.encode(pageNo, "UTF-8"));

        urlBuilder.append("&" + URLEncoder.encode("numOfRows", "UTF-8") + "="
                + URLEncoder.encode(numOfRows, "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("dataType", "UTF-8") + "=" + URLEncoder.encode(type, "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("base_date", "UTF-8") + "="
                + URLEncoder.encode(baseDate, "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("base_time", "UTF-8") + "="
                + URLEncoder.encode(baseTime, "UTF-8"));

        urlBuilder.append("&" + URLEncoder.encode("nx", "UTF-8") + "=" + URLEncoder.encode(nx, "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("ny", "UTF-8") + "=" + URLEncoder.encode(ny, "UTF-8"));

        URL url = new URL(urlBuilder.toString());

        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/json");
        System.out.println("Response code: " + conn.getResponseCode());
        /*
         * BufferedReader rd;
         * if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
         * rd = new BufferedReader(new InputStreamReader(conn.getInputStream(),
         * "UTF-8"));
         * } else {
         * rd = new BufferedReader(new InputStreamReader(conn.getErrorStream(),
         * "UTF-8"));
         * }
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
         * /
         */

        BufferedReader rd;
        if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
            rd = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
        } else {
            rd = new BufferedReader(new InputStreamReader(conn.getErrorStream(), "UTF-8"));
        }

        WeatherVO weatherVO = new WeatherVO();

        JSONParser parser = new JSONParser();
        JSONObject object = (JSONObject) parser.parse(rd.readLine());
        JSONObject response = (JSONObject) object.get("response");
        JSONObject body = (JSONObject) response.get("body");
        JSONObject items = (JSONObject) body.get("items");
        JSONArray item = (JSONArray) items.get("item");

        // String status = (String) response.get("status");
        int counttmn = 0;
        int counttmx = 0;
        for (int i = 0; i < item.size(); i++) {
            object = (JSONObject) item.get(i);
            String category = (String) object.get("category");
            String fcstDate = (String) object.get("fcstDate");

            // System.out.println(category);
            if (category.equals("TMN") && counttmn < 1) {
                counttmn += 1;
                String tmn = (String) object.get("fcstValue");
                weatherVO.setTmn(tmn);
                weatherVO.setFcstDate(fcstDate);

            }
            if (category.equals("TMX") && counttmx < 1) {
                counttmx += 1;
                String tmx = (String) object.get("fcstValue");
                weatherVO.setTmx(tmx);
            }
        }

        List<String> timeList = new ArrayList<String>();
        List<String> dateList = new ArrayList<String>();
        List<String> messageList = new ArrayList<String>();

        int countgr = 0;
        int countgrs = 0;
        int counts = 0;

        for (int i = 0; i < item.size(); i++) {
            object = (JSONObject) item.get(i);
            String category = (String) object.get("category");
            String fcstTime = (String) object.get("fcstTime");

            if (category.equals("PTY")) {
                String pty = (String) object.get("fcstValue");
                weatherVO.setPty(pty);
                weatherVO.setFcstTime(fcstTime);

                String setdatetime = weatherVO.getFcstDate() + weatherVO.getFcstTime();
                Date format1 = new SimpleDateFormat("yyyyMMddHHmm").parse(setdatetime);
                Date format2 = new SimpleDateFormat("yyyyMMddHHmm").parse(nowformat);

                long time_difference = format1.getTime() - format2.getTime();
                long hours_difference = (time_difference / (1000 * 60 * 60)) % 24;
                long min_difference = time_difference / 60000;

                if (hours_difference >= 0 & hours_difference <= 23 & min_difference >= 0
                        & min_difference <= 1440) {

                    if ((pty.equals("1") || pty.equals("5")) & countgr < 1) {
                        System.out.println("count" + countgr);
                        dateList.add(weatherVO.getFcstDate());
                        messageList.add("비");
                        countgr += 1;
                        weatherVO.setMessage(messageList);
                        weatherVO.setDate(dateList);
                        if (min_difference <= 180) {
                            timeList.add("3시간 이내");
                            weatherVO.setTime(timeList);
                        } else if (min_difference <= 1440) {
                            timeList.add((weatherVO.getFcstTime()));
                            weatherVO.setTime(timeList);
                        }
                    } else if ((pty.equals("2") || pty.equals("6")) & countgrs < 1) {
                        dateList.add(weatherVO.getFcstDate());
                        messageList.add("진눈깨비");
                        countgrs += 1;
                        weatherVO.setMessage(messageList);
                        weatherVO.setDate(dateList);
                        if (min_difference <= 180) {
                            timeList.add("3시간 이내");
                            weatherVO.setTime(timeList);
                        } else if (min_difference <= 1440) {
                            timeList.add((weatherVO.getFcstTime()));
                            weatherVO.setTime(timeList);
                        }
                    } else if ((pty.equals("3") || pty.equals("7")) & counts < 1) {
                        dateList.add(weatherVO.getFcstDate());
                        messageList.add("눈");
                        counts += 1;
                        weatherVO.setMessage(messageList);
                        weatherVO.setDate(dateList);
                        if (min_difference <= 180) {
                            timeList.add("3시간 이내");
                            weatherVO.setTime(timeList);
                        } else if (min_difference <= 1440) {
                            timeList.add((weatherVO.getFcstTime()));
                            weatherVO.setTime(timeList);
                        }
                    }
                }
            }
        }

        /*
         * if(status.equals("NOT_FOUND"))
         * {
         * resultString="잘못 설정된 데이터값입니다. 관리자에게 문의해주시기 바랍니다";
         * 
         * }else if(status.equals("ERROR"))
         * {
         * resultString="서버 에러입니다. 관리자에게 문의해주시기 바랍니다";
         * }else{}
         * /
         */

        // System.out.println(item);

        return weatherVO;

    }

    /* 상단 - SKY / PTY / T1H / ICON / CHARACTER */
    public static WeatherVO getTopspt(GeocodingVO geocodingVO, SunVO sun)
            throws IOException, ParseException, java.text.ParseException {
        String resultMsg = "";
        int count = 0;
        int sum = 0;

        while (true) {
            Calendar cal = Calendar.getInstance();
            Calendar cal3 = Calendar.getInstance();
            Date date = new Date();
            // 현재 날짜 구하기
            LocalDate nowDate = LocalDate.now();

            SimpleDateFormat hhtime = new SimpleDateFormat("HHmm");

            String htime = hhtime.format(cal.getTime());
            SimpleDateFormat sdformat = new SimpleDateFormat("HH30");
            int hh = Integer.parseInt(htime);

            // 포맷변경 ( 년월일 시분초)

            // 1시간 전
            cal3.setTime(date);
            cal3.add(Calendar.HOUR, -1);
            String nowPartTime1 = sdformat.format(cal3.getTime());

            System.out.println("한시간 뺀 시간 : " + nowPartTime1);
            cal3.add(Calendar.MINUTE, -sum);

            String nowPartTime = sdformat.format(cal3.getTime());
            // 포맷 정의
            DateTimeFormatter formatterDate = DateTimeFormatter.ofPattern("yyyyMMdd");
            // 포맷 적용
            String formatedNowDate = nowDate.format(formatterDate);
            String shortPartTime = sdformat.format(cal.getTime());

            System.out.println("지금 측정시간 : " + nowPartTime);
            int shortdate = Integer.parseInt(shortPartTime);

            int nowbigo = Integer.parseInt(nowPartTime);

            System.out.println("비교 값" + hh);

            String apiUrl = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst";
            // 홈페이지에서 받은 키
            String serviceKey = "lsreK53XwFXG2rEI3GpisRYQCjg97dt7uTl0HEZnBtYQvqdxXub024qirOptZW3z%2FEJyGQIDVoSWWrzXnUMBxQ%3D%3D";
            String pageNo = "1";
            String numOfRows = "100000";
            if (hh >= 0 && 30 >= hh || hh == 2400) {
                Calendar cal2 = Calendar.getInstance();
                String format = "yyyy-MM-dd";
                SimpleDateFormat sdf = new SimpleDateFormat(format);
                cal2.add(Calendar.DATE, -1); // 날짜를 하루 뺀다.
                String baseDate = sdf.format(cal2.getTime());

                System.out.println(baseDate);
            }
            String baseDate = formatedNowDate; // 조회하고싶은 날짜
            String baseTime = nowPartTime; // 조회하고싶은 시간
            String type = "JSON"; // 타입 xml, json 등등 ..
            String nx = geocodingVO.getXLat(); // 위도
            String ny = geocodingVO.getYLon();
            ; // 경도

            StringBuilder urlBuilder = new StringBuilder(apiUrl);
            urlBuilder.append("?" + URLEncoder.encode("ServiceKey", "UTF-8") + "=" + serviceKey);
            urlBuilder.append("&" + URLEncoder.encode("pageNo", "UTF-8") + "=" + URLEncoder.encode(pageNo, "UTF-8"));
            urlBuilder.append("&" + URLEncoder.encode("numOfRows", "UTF-8") + "="
                    + URLEncoder.encode(numOfRows, "UTF-8"));
            urlBuilder.append("&" + URLEncoder.encode("dataType", "UTF-8") + "=" + URLEncoder.encode(type, "UTF-8"));
            urlBuilder.append("&" + URLEncoder.encode("base_date", "UTF-8") + "="
                    + URLEncoder.encode(baseDate, "UTF-8"));
            urlBuilder.append("&" + URLEncoder.encode("base_time", "UTF-8") + "="
                    + URLEncoder.encode(baseTime, "UTF-8"));

            urlBuilder.append("&" + URLEncoder.encode("nx", "UTF-8") + "=" + URLEncoder.encode(nx, "UTF-8"));
            urlBuilder.append("&" + URLEncoder.encode("ny", "UTF-8") + "=" + URLEncoder.encode(ny, "UTF-8"));
            // urlBuilder.append("&" + URLEncoder.encode("nx","UTF-8") + "=" +
            // URLEncoder.encode("UTF-8")); //경도
            // urlBuilder.append("&" + URLEncoder.encode("ny","UTF-8") + "=" +
            // URLEncoder.encode(ny, "UTF-8")); //위도

            /*
             * GET방식으로 전송해서 파라미터 받아오기
             */
            URL url = new URL(urlBuilder.toString());
            // 어떻게 넘어가는지 확인하고 싶으면 아래 출력분 주석 해제
            // System.out.println(url);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Content-type", "application/json");
            System.out.println("Response code: " + conn.getResponseCode());
            /*
             * BufferedReader rd;
             * if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
             * rd = new BufferedReader(new InputStreamReader(conn.getInputStream(),
             * "UTF-8"));
             * } else {
             * rd = new BufferedReader(new InputStreamReader(conn.getErrorStream(),
             * "UTF-8"));
             * }
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

            BufferedReader rd;
            if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
                rd = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
            } else {
                rd = new BufferedReader(new InputStreamReader(conn.getErrorStream(), "UTF-8"));
            }

            WeatherVO weatherVO = new WeatherVO();

            JSONParser parser = new JSONParser();
            JSONObject object = (JSONObject) parser.parse(rd.readLine());
            JSONObject response = (JSONObject) object.get("response");
            JSONObject header = (JSONObject) response.get("header");

            resultMsg = (String) header.get("resultMsg");
            System.out.println("resultMsg:::"+resultMsg);
            if (resultMsg.equals("NORMAL_SERVICE")) {
                JSONObject body = (JSONObject) response.get("body");
                JSONObject items = (JSONObject) body.get("items");
                JSONArray item = (JSONArray) items.get("item");

                // String status = (String) response.get("status");

                int sunrise = Integer.parseInt(sun.getSunrise());
                int sunset = sun.getSunset();

                int countsky = 0;
                int countt1h = 0;
                int countpty = 0;
                for (int i = 0; i < item.size(); i++) {
                    object = (JSONObject) item.get(i);
                    String category = (String) object.get("category");
                    String fcstTime = (String) object.get("fcstTime");

                    // System.out.println(category);
                    if (category.equals("SKY") && countsky < 2) {
                        countsky += 1;
                        String sky = (String) object.get("fcstValue");
                        weatherVO.setSky(sky);
                        weatherVO.setFcstTime(fcstTime);
                    }
                    if (category.equals("T1H") && countt1h < 2) {
                        countt1h += 1;
                        int t1h = Integer.parseInt((String) object.get("fcstValue"));
                        weatherVO.setT1h(t1h);
                    }
                    if (category.equals("PTY") && countpty < 2) {
                        countpty += 1;
                        String pty = (String) object.get("fcstValue");
                        weatherVO.setPty(pty);
                    }
                }

                int t1h = weatherVO.getT1h();
                String sky = weatherVO.getSky();
                String pty = weatherVO.getPty();
                int fhh = Integer.parseInt(weatherVO.getFcstTime());

                System.out.println("현재 시간 정리 ::: " + hh);

                Random rnd = new Random();

                if (pty.equals("1") || pty.equals("5")) {
                    weatherVO.setIcon("비");
                    weatherVO.setCharacter("우산");
                    weatherVO.setBackground("비");
                } else if (pty.equals("2") || pty.equals("6")) {
                    weatherVO.setIcon("진눈깨비");
                    weatherVO.setCharacter("우산");
                    weatherVO.setBackground("비");
                } else if (pty.equals("3") || pty.equals("7")) {
                    weatherVO.setIcon("눈");
                    weatherVO.setCharacter("눈사람");
                    weatherVO.setBackground("눈");
                } else {

                    if (sky.equals("1")) {
                        if (sunrise <= hh & sunset >= hh) {
                            weatherVO.setIcon("해");
                            weatherVO.setBackground("구름없는낮");

                        } else {
                            weatherVO.setIcon("달");
                            weatherVO.setBackground("구름없는밤");
                        }
                    }
                    if (sky.equals("3")) {
                        if (sunrise <= hh & sunset >= hh) {
                            weatherVO.setIcon("해구름");
                            weatherVO.setBackground("구름많은낮");
                        } else {
                            weatherVO.setIcon("달구름");
                            weatherVO.setBackground("구름많은밤");
                        }
                    }
                    if (sky.equals("4")) {
                        weatherVO.setIcon("구름");
                        weatherVO.setBackground("구름");
                    }

                    if (t1h >= 28) {
                        weatherVO.setCharacter("더움");
                    } else if (t1h < 4) {
                        weatherVO.setCharacter("추움");
                    } else {
                        int index = rnd.nextInt(2);
                        weatherVO.setCharacter(Integer.toString(index));

                    }

                }
                return weatherVO;
            }
            count++;
            sum = count * 30;
        }

    }

    /* CARD - VEC / WSD / RN1 */
    public static WeatherVO getShortPartWeather6(GeocodingVO geocodingVO)
            throws IOException, ParseException, java.text.ParseException {
        String resultMsg = "";
        int count = 0;
        int sum = 0;
        while (true) {
            Calendar cal = Calendar.getInstance();
            Calendar cal3 = Calendar.getInstance();
            Date date = new Date();
            // 현재 날짜 구하기
            LocalDate nowDate = LocalDate.now();

            SimpleDateFormat hhtime = new SimpleDateFormat("HHmm");

            String htime = hhtime.format(cal.getTime());
            SimpleDateFormat sdformat = new SimpleDateFormat("HH30");
            int hh = Integer.parseInt(htime);
            // 포맷변경 ( 년월일 시분초)

            // 1시간 전
            cal3.setTime(date);

            cal3.add(Calendar.HOUR, -1);
            String nowPartTime22 = sdformat.format(cal3.getTime());
            System.out.println(nowPartTime22);
            cal3.add(Calendar.MINUTE, -sum);
            String nowPartTime = sdformat.format(cal3.getTime());
            // 포맷 정의
            DateTimeFormatter formatterDate = DateTimeFormatter.ofPattern("yyyyMMdd");
            // 포맷 적용
            String formatedNowDate = nowDate.format(formatterDate);
            String shortPartTime = sdformat.format(cal.getTime());

            System.out.println("지금 측정시간 : " + nowPartTime);
            int shortdate = Integer.parseInt(shortPartTime);

            int nowbigo = Integer.parseInt(nowPartTime);

            System.out.println("비교 값" + hh);

            String apiUrl = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst";
            // 홈페이지에서 받은 키
            String serviceKey = "lsreK53XwFXG2rEI3GpisRYQCjg97dt7uTl0HEZnBtYQvqdxXub024qirOptZW3z%2FEJyGQIDVoSWWrzXnUMBxQ%3D%3D";
            String pageNo = "1";
            String numOfRows = "100000";
            if (hh >= 0 && 30 >= hh || hh == 2400) {
                Calendar cal2 = Calendar.getInstance();
                String format = "yyyy-MM-dd";
                SimpleDateFormat sdf = new SimpleDateFormat(format);
                cal2.add(Calendar.DATE, -1); // 날짜를 하루 뺀다.
                String baseDate = sdf.format(cal2.getTime());

                System.out.println(baseDate);
            }
            String baseDate = formatedNowDate; // 조회하고싶은 날짜
            String baseTime = nowPartTime; // 조회하고싶은 시간
            String type = "JSON"; // 타입 xml, json 등등 ..
            String nx = geocodingVO.getXLat(); // 위도
            String ny = geocodingVO.getYLon();
            ; // 경도

            StringBuilder urlBuilder = new StringBuilder(apiUrl);
            urlBuilder.append("?" + URLEncoder.encode("ServiceKey", "UTF-8") + "=" + serviceKey);
            urlBuilder.append("&" + URLEncoder.encode("pageNo", "UTF-8") + "=" + URLEncoder.encode(pageNo, "UTF-8"));
            urlBuilder.append("&" + URLEncoder.encode("numOfRows", "UTF-8") + "="
                    + URLEncoder.encode(numOfRows, "UTF-8"));
            urlBuilder.append("&" + URLEncoder.encode("dataType", "UTF-8") + "=" + URLEncoder.encode(type, "UTF-8"));
            urlBuilder.append("&" + URLEncoder.encode("base_date", "UTF-8") + "="
                    + URLEncoder.encode(baseDate, "UTF-8"));
            urlBuilder.append("&" + URLEncoder.encode("base_time", "UTF-8") + "="
                    + URLEncoder.encode(baseTime, "UTF-8"));

            urlBuilder.append("&" + URLEncoder.encode("nx", "UTF-8") + "=" + URLEncoder.encode(nx, "UTF-8"));
            urlBuilder.append("&" + URLEncoder.encode("ny", "UTF-8") + "=" + URLEncoder.encode(ny, "UTF-8"));
            // urlBuilder.append("&" + URLEncoder.encode("nx","UTF-8") + "=" +
            // URLEncoder.encode("UTF-8")); //경도
            // urlBuilder.append("&" + URLEncoder.encode("ny","UTF-8") + "=" +
            // URLEncoder.encode(ny, "UTF-8")); //위도

            /*
             * GET방식으로 전송해서 파라미터 받아오기
             */
            URL url = new URL(urlBuilder.toString());
            // 어떻게 넘어가는지 확인하고 싶으면 아래 출력분 주석 해제
            // System.out.println(url);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Content-type", "application/json");
            System.out.println("Response code: " + conn.getResponseCode());
            /*
             * BufferedReader rd;
             * if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
             * rd = new BufferedReader(new InputStreamReader(conn.getInputStream(),
             * "UTF-8"));
             * } else {
             * rd = new BufferedReader(new InputStreamReader(conn.getErrorStream(),
             * "UTF-8"));
             * }
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

            BufferedReader rd;
            if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
                rd = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
            } else {
                rd = new BufferedReader(new InputStreamReader(conn.getErrorStream(), "UTF-8"));
            }

            WeatherVO weatherVO = new WeatherVO();

            JSONParser parser = new JSONParser();
            // System.out.println("rd:::"+rd.readLine());

            JSONObject object = (JSONObject) parser.parse(rd.readLine());
            JSONObject response = (JSONObject) object.get("response");
            JSONObject header = (JSONObject) response.get("header");

            resultMsg = (String) header.get("resultMsg");

            System.out.println("resultMsg:::"+resultMsg);

            if (resultMsg.equals("NORMAL_SERVICE")) {
                JSONObject body = (JSONObject) response.get("body");
                JSONObject items = (JSONObject) body.get("items");
                JSONArray item = (JSONArray) items.get("item");

                int count1 = 0;
                int count2 = 0;
                int count3 = 0;
                int count4 = 0;
                for (int i = 0; i < item.size(); i++) {
                    object = (JSONObject) item.get(i);
                    String category = (String) object.get("category");

                    // System.out.println(category);
                    if (category.equals("REH") && count1 < 1) {
                        count1 += 1;
                        String reh = (String) object.get("fcstValue");
                        String fcstTime = (String) object.get("fcstTime");
                        weatherVO.setReh(reh);
                        weatherVO.setFcstTime(fcstTime);
                    }
                    if (category.equals("VEC") && count2 < 1) {
                        count2 += 1;
                        int vec = Integer.parseInt((String) object.get("fcstValue"));
                        String resultvec = "";
                        if (0 <= vec & 45 > vec) {
                            resultvec = "북";
                        } else if (45 <= vec & 90 > vec) {
                            resultvec = "북동";
                        } else if (90 <= vec & 135 > vec) {
                            resultvec = "동";
                        } else if (135 <= vec & 180 > vec) {
                            resultvec = "남동";
                        } else if (180 <= vec & 225 > vec) {
                            resultvec = "남";
                        } else if (225 <= vec & 270 > vec) {
                            resultvec = "남서";
                        } else if (270 <= vec & 315 > vec) {
                            resultvec = "서";
                        } else if (315 <= vec & 360 > vec) {
                            resultvec = "북서";
                        }
                        weatherVO.setVec(resultvec);
                    }
                    if (category.equals("WSD") && count3 < 1) {
                        count3 += 1;
                        String wsd = (String) object.get("fcstValue");
                        weatherVO.setWsd(wsd);
                    }
                    if (category.equals("RN1") && count4 < 1) {
                        count4 += 1;
                        String rn1 = (String) object.get("fcstValue");
                        weatherVO.setRn1(rn1);
                    }
                }
                return weatherVO;

            }

            count++;
            sum = count * 30;
        }

    }

}
