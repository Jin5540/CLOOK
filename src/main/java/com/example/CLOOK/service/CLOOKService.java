package com.example.CLOOK.service;

import java.io.IOException;
import java.util.List;

import org.json.simple.parser.ParseException;

import com.example.CLOOK.domain.*;

public interface CLOOKService {
   
   public List<String> location(String address) throws IOException, ParseException;
   public GeocodingVO gecodingnxny(String address);
   public String getweather(GeocodingVO gecoding) throws IOException, ParseException;
   public WeatherVO getpartweather(GeocodingVO gecoding) throws IOException, ParseException;
}
