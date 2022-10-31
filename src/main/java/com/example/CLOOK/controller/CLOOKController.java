package com.example.CLOOK.controller;

import java.io.IOException;
import java.util.List;

import org.json.simple.JSONObject;
import org.json.simple.parser.ParseException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.CLOOK.domain.AirVO;
import com.example.CLOOK.domain.GeocodingVO;
import com.example.CLOOK.domain.SunVO;
import com.example.CLOOK.domain.UvVO;
import com.example.CLOOK.domain.WeatherVO;
import com.example.CLOOK.service.CLOOKService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class CLOOKController {

    private final String address = "종로구";

    private CLOOKService clookService;

    @GetMapping(value = "/short", produces = "application/json; charset=UTF-8")
    public List<WeatherVO> shortweather() throws IOException, ParseException {
        System.out.println("controller:::------------------------------");

        return clookService.getweather(clookService.gecodingnxny(address));

    }
    /* 상단 - TMX / TMN */
    @GetMapping(value = "/shortpart1", produces = "application/json; charset=UTF-8") 
    public WeatherVO shortpartweather1() throws IOException, ParseException {
        System.out.println("controller:::------------------------------");

        return clookService.getpartweather1(clookService.gecodingnxny(address));

    }

    /* 상단 - SKY / PTY / T1H */
    @GetMapping(value = "/shortpart2", produces = "application/json; charset=UTF-8")
    public WeatherVO shortpartweather2() throws IOException, ParseException {
        System.out.println("controller:::------------------------------");

        return clookService.getpartweather2(clookService.gecodingnxny(address));

    }

    @GetMapping(value = "/location", produces = "application/json; charset=UTF-8")
    public List<String> searchAPI() throws IOException, ParseException {
        System.out.println("controller:::------------------------------");

        return clookService.location(address);
    }

    @GetMapping(value = "/air", produces = "application/json; charset=UTF-8")
    public List<AirVO> airAPI() throws IOException, ParseException {
        System.out.println("controller:::------------------------------");

        return clookService.getair(address);
    }
    
    @GetMapping(value = "/uv", produces = "application/json; charset=UTF-8")
    public List<UvVO> uvAPI() throws IOException, ParseException {
        System.out.println("controller:::------------------------------");

        return clookService.getUv();
    }

    @GetMapping(value = "/sun", produces = "application/json; charset=UTF-8")
    public List<SunVO> sunAPI() throws IOException, ParseException {
        System.out.println("controller:::------------------------------");

        return clookService.getsun();
    }

    @GetMapping(value = "/short2", produces = "application/json; charset=UTF-8")
    public JSONObject shortweather2() throws IOException, ParseException {
        System.out.println("controller:::------------------------------");

        return clookService.getweather2(clookService.gecodingnxny(address));

    }

    @GetMapping(value = "/uvcopy", produces = "application/json; charset=UTF-8")
    public String uvAPI_copy() throws IOException, ParseException {
        System.out.println("controller:::------------------------------");

        return clookService.getUv_copy();
    }

}
