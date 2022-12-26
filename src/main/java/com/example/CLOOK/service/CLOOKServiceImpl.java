package com.example.CLOOK.service;

import java.io.IOException;
import java.security.GeneralSecurityException;
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

import com.example.CLOOK.dao.GoogleRepsitory;
import com.example.CLOOK.dao.AirRepsitory;
import com.example.CLOOK.dao.GeocodingRepsitory;
import com.example.CLOOK.dao.GeocodingRepsitory2;
import com.example.CLOOK.dao.WeatherRepsitory;
import com.example.CLOOK.dao.SearchRepsitory;
import com.example.CLOOK.dao.SunRepsitory;
import com.example.CLOOK.dao.UVRepsitory;
import com.example.CLOOK.dao.UVRepsitory_copy;
import com.example.CLOOK.domain.AirVO;
import com.example.CLOOK.domain.GeocodingVO;
import com.example.CLOOK.domain.GoogleVO;
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

        return SearchRepsitory.searchData(address);

    }

    @Override
    public GeocodingVO gecodingnxny(String address) {

        System.out.println("geocodingnxny_serviceImpl:::------------------------------");

        GeocodingVO vo = GeocodingRepsitory2.getData(address);

        System.out.println(vo);

        return GeocodingRepsitory.changData(vo);

    }

    @Override
    public List<WeatherVO> getweatherclothes(GeocodingVO gecoding, UvVO uv)
            throws IOException, ParseException, java.text.ParseException {

        System.out.println("geocoding_serviceImpl:::------------------------------");

        return WeatherRepsitory.getShortWeather4(gecoding, uv);
    }

    @Override
    public List<WeatherVO> getweathertoday(GeocodingVO gecoding, SunVO sun)
            throws IOException, ParseException, java.text.ParseException {

        System.out.println("geocoding_serviceImpl:::------------------------------");

        return WeatherRepsitory.getToday(gecoding, sun);
    }

    @Override
    public WeatherVO getpartweather1(GeocodingVO gecoding)
            throws IOException, ParseException, java.text.ParseException {
        System.out.println("geocoding_serviceImpl:::------------------------------");

        return WeatherRepsitory.getShortPartWeather1(gecoding);
    }

    @Override
    public WeatherVO getTopspt(GeocodingVO gecoding, SunVO sun)
            throws IOException, ParseException, java.text.ParseException {
        System.out.println("geocoding_serviceImpl:::------------------------------");

        return WeatherRepsitory.getTopspt(gecoding, sun);
    }

    @Override
    public AirVO getair(String stationName) throws IOException, ParseException {
        System.out.println("geocoding_serviceImpl:::------------------------------");

        return AirRepsitory.getAir(stationName);
    }

    @Override
    public UvVO getUv(String staionName) throws IOException, ParseException {
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
            String lastgun = array[1].substring(array[1].length() - 1);
            String lastChar="";
            if(array.length>2){
                lastChar = array[2].substring(array[2].length() - 1);
            }
            

            if(array[0].length()==2&&array[1].equals("강화군")){
                result1 = array[0];
                result2 = array[1];
            }else if(array[0].length()==2&&lastgun.equals("군")){
                result1 = array[1];
            }else if(array[0].length()==2&&lastgun.equals("구")){
                result1 = array[0];
            }else if(array[0].length()==2&&lastChar.equals("구")){
                result1 = array[1];
                result2 = array[2];
            }else if(lastdo.equals("시")){
                result1 = array[0];
            }else{
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

    @Override
    public AirVO getTm(String stationName) throws IOException, ParseException {

        String[] array = stationName.split(" ");
        String a="";

        // 출력

        for (int i = 0; i < array.length; i++) {
            System.out.println(array[i]);
        }

        String lastChar1 = array[2].substring(array[2].length() - 1);
        if(array.length>3){
            String lastChar2 = array[3].substring(array[3].length() - 1);

            if(lastChar2!=null){
                if(lastChar2.equals("면")||lastChar2.equals("읍")||lastChar2.equals("동")){
                    a = array[3];
                }
            }
        }
        

        if(lastChar1!=null){
            if(lastChar1.equals("면")||lastChar1.equals("읍")||lastChar1.equals("동")){
                a = array[2];
            }
        }

        System.out.println(a);

        return AirRepsitory.getTm(a);
    }

    @Override
    public String getStationName(AirVO air) throws IOException, ParseException {
        
        return AirRepsitory.getStationName(air);
    }

    @Override
    public void insertSheet(GoogleVO googleVO) throws IOException, GeneralSecurityException {
        
        GoogleRepsitory.main(googleVO);
        
    }

}
