package com.example.CLOOK.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.json.simple.JSONObject;
import org.json.simple.parser.ParseException;
import org.springframework.session.Session;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

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

    private final String address2 = "대전광역시 중구 읍내동";

    private CLOOKService clookService;

    /* 위치정보 */
    @GetMapping(value = "/location", produces = "application/json; charset=UTF-8")
    public List<String> searchAPI(@RequestParam(value = "address")String address) throws IOException, ParseException {
        System.out.println("controller:::------------------------------");

        return clookService.location(address);
    }

    /* 단기예보 */
    @GetMapping(value = "/short", produces = "application/json; charset=UTF-8")
    public List<WeatherVO> shortweather(HttpServletRequest req, RedirectAttributes redirect) throws IOException, ParseException {
        
        System.out.println("controller:::------------------------------");

        HttpSession session = req.getSession();

        String sessionlocation =  (String) session.getAttribute("location");
        if(sessionlocation == null){
            session.setAttribute("location", "서울특별시 강남구 개포1동");
            return clookService.getweather(clookService.gecodingnxny("서울특별시 강남구 개포1동"));
        }else{
            session.removeAttribute("location");
            session.setAttribute("location", address2);
        }

        return clookService.getweather(clookService.gecodingnxny(sessionlocation));

    }
    /* 상단 - TMX / TMN */
    @GetMapping(value = "/shortpart1", produces = "application/json; charset=UTF-8") 
    public WeatherVO shortpartweather1() throws IOException, ParseException {
        System.out.println("controller:::------------------------------");

        return clookService.getpartweather1(clookService.gecodingnxny(address2));

    }

    /* 상단 - SKY / PTY / T1H 
    @GetMapping(value = "/shortpart2", produces = "application/json; charset=UTF-8")
    public WeatherVO shortpartweather2() throws IOException, ParseException {
        System.out.println("controller:::------------------------------");

        return clookService.getpartweather2(clookService.gecodingnxny(address2));

    }*/

    @GetMapping(value = "/air", produces = "application/json; charset=UTF-8")
    public List<AirVO> airAPI() throws IOException, ParseException {
        System.out.println("controller:::------------------------------");

        return clookService.getair(address2);
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

        return clookService.getweather2(clookService.gecodingnxny(address2));

    }

    @GetMapping(value = "/short3", produces = "application/json; charset=UTF-8")
    public String shortweather3() throws IOException, ParseException {
        System.out.println("controller:::------------------------------");

        return clookService.getweather3(clookService.gecodingnxny(address2));

    }

    @GetMapping(value = "/uvcopy", produces = "application/json; charset=UTF-8")
    public String uvAPI_copy() throws IOException, ParseException {
        System.out.println("controller:::------------------------------");

        return clookService.getUv_copy();
    }

}
