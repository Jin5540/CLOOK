package com.example.CLOOK.service;

import java.io.IOException;

import org.json.simple.parser.ParseException;

import com.example.CLOOK.domain.*;

public interface CLOOKService {
   
   public GeocodingVO location(String address);
   public GeocodingVO gecodingnxny(String address);
   public String getweather(GeocodingVO gecoding) throws IOException, ParseException;
}
