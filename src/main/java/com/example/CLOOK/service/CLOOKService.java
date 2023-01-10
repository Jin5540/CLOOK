package com.example.CLOOK.service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.List;

import org.json.simple.JSONObject;
import org.json.simple.parser.ParseException;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.example.CLOOK.domain.*;

public interface CLOOKService {
   
   public GeocodingVO location(String address) throws IOException, ParseException;
   public GeocodingVO gecodingnxny(String address);
   public List<WeatherVO> getweatherclothes(GeocodingVO gecoding, UvVO uv) throws IOException, ParseException, java.text.ParseException;
   public List<WeatherVO> getweathertoday(GeocodingVO gecoding, SunVO sun) throws IOException, ParseException, java.text.ParseException;
   public JSONObject getweather2(GeocodingVO gecoding) throws IOException, ParseException;
   public String getweather3(GeocodingVO gecoding) throws IOException, ParseException;
   public WeatherVO getpartweather1(GeocodingVO gecoding) throws IOException, ParseException, java.text.ParseException;
   public WeatherVO getTopspt(GeocodingVO gecoding, SunVO sun) throws IOException, ParseException, java.text.ParseException;
   public WeatherVO getpartweather3(GeocodingVO gecoding) throws IOException, ParseException, java.text.ParseException;
   public AirVO getair(String stationName) throws IOException, ParseException;
   public UvVO getUv(String staionName) throws IOException, ParseException;
   public String getUv_copy() throws IOException, ParseException;
   public SunVO getsun(String result) throws IOException, ParseException;
   public AirVO getTm(String stationName, String region) throws IOException, ParseException;
   public String getStationName(AirVO air) throws IOException, ParseException;
   public void insertSheet(GoogleVO googleVO)throws IOException,GeneralSecurityException;
}
