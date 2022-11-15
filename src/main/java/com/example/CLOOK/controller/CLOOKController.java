package com.example.CLOOK.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.json.JSONObject;
import org.json.simple.parser.ParseException;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.example.CLOOK.domain.AirVO;
import com.example.CLOOK.domain.SunVO;
import com.example.CLOOK.domain.UvVO;
import com.example.CLOOK.domain.WeatherVO;
import com.example.CLOOK.mapper.ClookMapper;
import com.example.CLOOK.service.CLOOKService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class CLOOKController {

    private final String address2 = "대전광역시 대덕구 읍내동";

    @Autowired
    private CLOOKService clookService;

    /* 위치정보 */
    @GetMapping(value = "/search", produces = "application/json; charset=UTF-8")
    public List<String> searchAPI(@RequestParam(value = "saddress") String saddress)
            throws IOException, ParseException {

        return clookService.location(saddress);
    }

    /* 세션 정보 */
    @GetMapping(value = "/location", produces = "application/json; charset=UTF-8")
    public String location(HttpServletRequest req) {

        HttpSession session = req.getSession();
        String sessionlocation = (String) session.getAttribute("location");
        String result = "";

        if (req.getParameter("address") == null) {
            if (sessionlocation == null) {
                session.setAttribute("location", "서울특별시 중구 명동");
                result = "서울특별시 중구 명동";
                return JSONObject.quote(result);
            } else {
                result = sessionlocation;
                return JSONObject.quote(result);
            }
        } else {
            String address = req.getParameter("address");
            if (sessionlocation == null) {
                session.setAttribute("location", address);
                result = address;
                System.out.println(result);
                return JSONObject.quote(result);
            } else {
                session.removeAttribute("location");
                session.setAttribute("location", address);

                result = address;
                return JSONObject.quote(result);
            }
        }
    }

    /* 상단 - TMX / TMN */
    @GetMapping(value = "/toptm", produces = "application/json; charset=UTF-8")
    public WeatherVO shortpartweather1(HttpServletRequest req)
            throws IOException, ParseException, java.text.ParseException {

        HttpSession session = req.getSession();
        String sessionlocation = (String) session.getAttribute("location");
        if (sessionlocation == null) {
            return clookService.getpartweather1(clookService.gecodingnxny("서울특별시 중구 명동"));
        } else {
            return clookService.getpartweather1(clookService.gecodingnxny(sessionlocation));
        }
    }

    /* 상단 - SKY / PTY / T1H */
    @GetMapping(value = "/topspt", produces = "application/json; charset=UTF-8")
    public WeatherVO shortpartweather2(HttpServletRequest req)
            throws IOException, ParseException, java.text.ParseException {

        HttpSession session = req.getSession();
        String sessionlocation = (String) session.getAttribute("location");

        if (sessionlocation == null) {
            return clookService.getpartweather2(clookService.gecodingnxny("서울특별시 중구 명동"));
        } else {
            return clookService.getpartweather2(clookService.gecodingnxny(sessionlocation));
        }
    }

    /* 단기예보 */
    @GetMapping(value = "/clothes", produces = "application/json; charset=UTF-8")
    public List<WeatherVO> clothesweather(HttpServletRequest req, RedirectAttributes redirect)
            throws IOException, ParseException, java.text.ParseException {

        System.out.println("controller:::------------------------------");

        HttpSession session = req.getSession();

        String sessionlocation = (String) session.getAttribute("location");
        if (sessionlocation == null) {
            return clookService.getweatherclothes(clookService.gecodingnxny("서울특별시 중구 명동"));
        } else {
            return clookService.getweatherclothes(clookService.gecodingnxny(sessionlocation));
        }

    }

    /* 단기예보 */
    @GetMapping(value = "/today", produces = "application/json; charset=UTF-8")
    public List<WeatherVO> todayweather(HttpServletRequest req, RedirectAttributes redirect)
            throws IOException, ParseException, java.text.ParseException {

        HttpSession session = req.getSession();

        String sessionlocation = (String) session.getAttribute("location");
        if (sessionlocation == null) {
            return clookService.getweathertoday(clookService.gecodingnxny("서울특별시 중구 명동"));
        } else {
            return clookService.getweathertoday(clookService.gecodingnxny(sessionlocation));
    }
}

    /* REH / VEC / WSD / PCP */
    @GetMapping(value = "/card", produces = "application/json; charset=UTF-8")
    public WeatherVO cardweather(HttpServletRequest req, RedirectAttributes redirect)
            throws IOException, ParseException, java.text.ParseException {

        HttpSession session = req.getSession();

        String sessionlocation = (String) session.getAttribute("location");
        if (sessionlocation == null) {
            return clookService.getpartweather3(clookService.gecodingnxny("서울특별시 중구 명동"));
        } else {
            return clookService.getpartweather3(clookService.gecodingnxny(sessionlocation));
        }
    }

    @GetMapping(value = "/air", produces = "application/json; charset=UTF-8")
    public List<AirVO> airAPI() throws IOException, ParseException {
        System.out.println("controller:::------------------------------");

        return clookService.getair(address2);
    }

    @GetMapping(value = "/uv", produces = "application/json; charset=UTF-8")
    public List<UvVO> uvAPI(HttpServletRequest req) throws IOException, ParseException {
        HttpSession session = req.getSession();
        String sessionlocation = (String) session.getAttribute("location");
        if (sessionlocation == null) {
            return clookService.getUv("서울특별시 중구 명동");
        }else{
            return clookService.getUv(sessionlocation);
        } 
    }

    @GetMapping(value = "/sun", produces = "application/json; charset=UTF-8")
    public List<SunVO> sunAPI(HttpServletRequest req) throws IOException, ParseException {
        HttpSession session = req.getSession();
        String sessionlocation = (String) session.getAttribute("location");
        if (sessionlocation == null) {
            return clookService.getsun("서울특별시 중구 명동");
        }else{
            return clookService.getsun(sessionlocation);
        }
        
    }

    /*
     * @GetMapping(value = "/short2", produces = "application/json; charset=UTF-8")
     * public JSONObject shortweather2() throws IOException, ParseException {
     * System.out.println("controller:::------------------------------");
     * 
     * return clookService.getweather2(clookService.gecodingnxny(address2));
     * 
     * }
     */

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


