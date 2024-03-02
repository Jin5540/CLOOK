package com.example.CLOOK.service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.List;

import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import com.example.CLOOK.dao.GoogleRepsitory;
import com.example.CLOOK.dao.AirRepsitory;
import com.example.CLOOK.dao.GeocodingRepsitory;
import com.example.CLOOK.dao.GeocodingRepsitory2;
import com.example.CLOOK.dao.WeatherRepsitory;
import com.example.CLOOK.dao.SearchRepsitory;
import com.example.CLOOK.dao.SunRepsitory;
import com.example.CLOOK.dao.UVRepsitory;
import com.example.CLOOK.domain.AirVO;
import com.example.CLOOK.domain.GeocodingVO;
import com.example.CLOOK.domain.GoogleVO;
import com.example.CLOOK.domain.SunVO;
import com.example.CLOOK.domain.UvVO;
import com.example.CLOOK.domain.WeatherVO;
import com.example.CLOOK.mapper.ClookMapper;

@Slf4j
@Service
@RequiredArgsConstructor
public class CLOOKServiceImpl implements CLOOKService {

    @Autowired
    private ClookMapper mapper;

    @Override
    public GeocodingVO location(String address) throws IOException, ParseException {
        log.info("location_service ::: ");

        return SearchRepsitory.searchData(address);

    }

    @Override
    public GeocodingVO gecodingnxny(String address) {
        log.info("gecodingnxny_service ::: ");

        GeocodingVO vo = GeocodingRepsitory2.getData(address);
        return GeocodingRepsitory.changData(vo);

    }

    @Override
    public List<WeatherVO> getweatherclothes(GeocodingVO gecoding, UvVO uv)
            throws IOException, ParseException, java.text.ParseException {
        log.info("getweatherclothes_service ::: ");

        return WeatherRepsitory.getShortWeather4(gecoding, uv);
    }

    @Override
    public List<WeatherVO> getweathertoday(GeocodingVO gecoding, SunVO sun)
            throws IOException, ParseException, java.text.ParseException {
        log.info("getweathertoday_service ::: ");

        return WeatherRepsitory.getToday(gecoding, sun);
    }

    @Override
    public WeatherVO getpartweather1(GeocodingVO gecoding)
            throws IOException, ParseException, java.text.ParseException {
        log.info("getpartweather1_service ::: ");

        return WeatherRepsitory.getShortPartWeather1(gecoding);
    }

    @Override
    public WeatherVO getTopspt(GeocodingVO gecoding, SunVO sun)
            throws IOException, ParseException, java.text.ParseException {
        log.info("getTopspt_service ::: ");

        return WeatherRepsitory.getTopspt(gecoding, sun);
    }

    @Override
    public AirVO getair(String stationName) throws IOException, ParseException {
        log.info("getair_service ::: ");

        return AirRepsitory.getAir(stationName);
    }

    @Override
    public UvVO getUv(String staionName) throws IOException, ParseException {
        log.info("getUv_service ::: ");
        String result = staionName.substring(0, staionName.indexOf(" ") + 1);

        return UVRepsitory.getUV(mapper.getLocaionIndex(result));
    }

    @Override
    public SunVO getsun(String staionName) throws IOException, ParseException {
        log.info("getsun_service ::: ");

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
    public WeatherVO getpartweather3(GeocodingVO gecoding)
            throws IOException, ParseException, java.text.ParseException {
        return WeatherRepsitory.getShortPartWeather6(gecoding);
    }

    @Override
    public AirVO getTm(String stationName, String region) throws IOException, ParseException {

        String[] array = stationName.split(" ");
        String a="";
        String b="";

        // 출력

        for (int i = 0; i < array.length; i++) {
            System.out.println(array[i]);
        }

        a=region;
        b=array[0];

        System.out.println(a);
        System.out.println(b);

        return AirRepsitory.getTm(a,b);
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
