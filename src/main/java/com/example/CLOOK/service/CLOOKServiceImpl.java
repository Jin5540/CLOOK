package com.example.CLOOK.service;

import java.io.IOException;
import java.util.List;

import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import lombok.Setter;
import lombok.extern.log4j.Log4j;

import com.example.CLOOK.dao.GeocodingRepsitory;
import com.example.CLOOK.dao.WeatherRepsitory;
import com.example.CLOOK.dao.SearchRepsitory;
import com.example.CLOOK.domain.GeocodingVO;
import com.example.CLOOK.domain.WeatherVO;
import com.example.CLOOK.service.CLOOKService;


@Service
public class CLOOKServiceImpl implements CLOOKService{


    @Override
	public List<String> location(String address) throws IOException, ParseException {

        System.out.println("location_serviceImpl:::------------------------------");

        return SearchRepsitory.getLocation(address);

	}
    
    @Override
	public GeocodingVO gecodingnxny(String address) {

        System.out.println("geocodingnxny_serviceImpl:::------------------------------");

        GeocodingVO vo = GeocodingRepsitory.getData(address);

        System.out.println(vo);

        return GeocodingRepsitory.changData(vo);

	}

    @Override
    public String getweather(GeocodingVO gecoding) throws IOException, ParseException {
        
        System.out.println("geocoding_serviceImpl:::------------------------------");

        return WeatherRepsitory.getShortWeather(gecoding);
    }

    @Override
    public WeatherVO getpartweather(GeocodingVO gecoding) throws IOException, ParseException {
        System.out.println("geocoding_serviceImpl:::------------------------------");

        return WeatherRepsitory.getShortPartWeather(gecoding);
    }

}
