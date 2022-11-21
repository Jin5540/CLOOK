package com.example.CLOOK.service;

import java.io.IOException;
import java.util.List;

import org.json.simple.JSONObject;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.log4j.Log4j;

import com.example.CLOOK.dao.AirRepsitory;
import com.example.CLOOK.dao.GeocodingRepsitory;
import com.example.CLOOK.dao.WeatherRepsitory;
import com.example.CLOOK.dao.SearchRepsitory;
import com.example.CLOOK.dao.SunRepsitory;
import com.example.CLOOK.dao.UVRepsitory;
import com.example.CLOOK.dao.UVRepsitory_copy;
import com.example.CLOOK.domain.AirVO;
import com.example.CLOOK.domain.GeocodingVO;
import com.example.CLOOK.domain.SunVO;
import com.example.CLOOK.domain.UvVO;
import com.example.CLOOK.domain.WeatherVO;
import com.example.CLOOK.mapper.ClookMapper;

@Service
@RequiredArgsConstructor
public class CLOOKServiceImpl implements CLOOKService {

    @Autowired
    private ClookMapper mapper;

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
    public List<WeatherVO> getweatherclothes(GeocodingVO gecoding)
            throws IOException, ParseException, java.text.ParseException {

        System.out.println("geocoding_serviceImpl:::------------------------------");

        return WeatherRepsitory.getShortWeather4(gecoding);
    }

    @Override
    public List<WeatherVO> getweathertoday(GeocodingVO gecoding, SunVO sun)
            throws IOException, ParseException, java.text.ParseException {

        System.out.println("geocoding_serviceImpl:::------------------------------");

        return WeatherRepsitory.getShortWeather5(gecoding, sun);
    }

    @Override
    public WeatherVO getpartweather1(GeocodingVO gecoding)
            throws IOException, ParseException, java.text.ParseException {
        System.out.println("geocoding_serviceImpl:::------------------------------");

        return WeatherRepsitory.getShortPartWeather1(gecoding);
    }

    @Override
    public WeatherVO getpartweather2(GeocodingVO gecoding, SunVO sun)
            throws IOException, ParseException, java.text.ParseException {
        System.out.println("geocoding_serviceImpl:::------------------------------");

        return WeatherRepsitory.getShortPartWeather2(gecoding, sun);
    }

    @Override
    public List<AirVO> getair(String stationName) throws IOException, ParseException {
        System.out.println("geocoding_serviceImpl:::------------------------------");

        return AirRepsitory.getAir(stationName);
    }

    @Override
    public List<UvVO> getUv(String staionName) throws IOException, ParseException {
        String result = staionName.substring(0, staionName.indexOf(" ") + 1);
        // System.out.println(result);

        // return UVRepsitory.getUV(result);

        return UVRepsitory.getUV(mapper.getLocaionIndex(result));
    }

    @Override
    public SunVO getsun(String staionName) throws IOException, ParseException {

        String result1 = "false";
        String result2 = "false";

        if (staionName.equals("이어도")) {
            result1 = "서귀포";
            
        } else {

            String[] array = staionName.split(" ");

            // 출력

            for (int i = 0; i < array.length; i++) {
                System.out.println(array[i]);
            }

            String lastdo = array[0].substring(array[0].length() - 1);
            String lastChar = array[2].substring(array[2].length() - 1);
            String lastgun = array[1].substring(array[1].length() - 1);

            if (lastdo.equals("도") & lastChar.equals("구")) {
                result1 = array[1];
                result2 = array[2];
            } else if (lastdo.equals("시") & lastgun.equals("군")) {
                result1 = array[0];
                result2 = array[1];
            } else if (lastdo.equals("시")) {
                result1 = array[0];
            } else {
                result1 = array[1];
            }
        }

        return SunRepsitory.getSun(mapper.getLocaion(result1, result2));
    }

    @Override
    public JSONObject getweather2(GeocodingVO gecoding) throws IOException, ParseException {

        return WeatherRepsitory.getShortWeather2(gecoding);
    }

    @Override
    public String getweather3(GeocodingVO gecoding) throws IOException, ParseException {

        return WeatherRepsitory.getShortWeather3(gecoding);
    }

    @Override
    public String getUv_copy() throws IOException, ParseException {
        return UVRepsitory_copy.getUV();
    }

    @Override
    public WeatherVO getpartweather3(GeocodingVO gecoding)
            throws IOException, ParseException, java.text.ParseException {
        return WeatherRepsitory.getShortPartWeather6(gecoding);
    }

}
