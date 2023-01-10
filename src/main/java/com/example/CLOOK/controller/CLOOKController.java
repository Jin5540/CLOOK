package com.example.CLOOK.controller;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.json.JSONObject;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.example.CLOOK.domain.AirVO;
import com.example.CLOOK.domain.GeocodingVO;
import com.example.CLOOK.domain.GoogleVO;
import com.example.CLOOK.domain.SunVO;
import com.example.CLOOK.domain.UvVO;
import com.example.CLOOK.domain.WeatherVO;
import com.example.CLOOK.service.CLOOKService;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("/api")
@RestController
public class CLOOKController {

    @Autowired
    private CLOOKService clookService;

    /* 위치정보 */
    @GetMapping(value = "/search", produces = "application/json; charset=UTF-8")
    public GeocodingVO searchAPI(@RequestParam(value = "saddress") String saddress)
            throws IOException, ParseException {

        return clookService.location(saddress);
    }

    /* 세션 정보 */
    @GetMapping(value = "/location", produces = "application/json; charset=UTF-8")
    public String location(HttpServletRequest req) {

        HttpSession session = req.getSession();
        String sessionlocation = (String) session.getAttribute("location");
        String sessionregion = (String) session.getAttribute("region");

        String result = "";

        if (req.getParameter("address") == null && req.getParameter("region") == null) {
            if (sessionlocation == null && sessionregion == null) {
                session.setAttribute("location", "서울특별시 중구 명동");
                session.setAttribute("region", "명동");
                result = "서울특별시 중구 명동";
                return JSONObject.quote(result);
            } else {
                result = sessionlocation;
                return JSONObject.quote(result);
            }
        } else {
            String address = req.getParameter("address");
            String region = req.getParameter("region");
            if (sessionlocation == null && sessionregion == null) {
                session.setAttribute("location", address);
                session.setAttribute("region", region);
                result = address;
                System.out.println(result);
                return JSONObject.quote(result);
            } else {
                session.removeAttribute("location");
                session.setAttribute("location", address);
                session.setAttribute("region", region);
                result = address;
                return JSONObject.quote(result);
            }
        }
    }

    /* 상단 - TMX / TMN / 예보메세지 */
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

    /* 상단 - SKY / PTY / T1H / ICON / CHARACTER */
    @GetMapping(value = "/topspt", produces = "application/json; charset=UTF-8")
    public WeatherVO shortpartweather2(HttpServletRequest req)
            throws IOException, ParseException, java.text.ParseException {

        HttpSession session = req.getSession();
        String sessionlocation = (String) session.getAttribute("location");

        if (sessionlocation == null) {
            return clookService.getTopspt(clookService.gecodingnxny("서울특별시 중구 명동"),
                    clookService.getsun("서울특별시 중구 명동"));
        } else {
            return clookService.getTopspt(clookService.gecodingnxny(sessionlocation),
                    clookService.getsun(sessionlocation));
        }
    }

    /* 3시간단위 - 옷 */
    @GetMapping(value = "/clothes", produces = "application/json; charset=UTF-8")
    public List<WeatherVO> clothesweather(HttpServletRequest req, RedirectAttributes redirect)
            throws IOException, ParseException, java.text.ParseException {

        HttpSession session = req.getSession();

        String sessionlocation = (String) session.getAttribute("location");
        if (sessionlocation == null) {
            return clookService.getweatherclothes(clookService.gecodingnxny("서울특별시 중구 명동"),
                    clookService.getUv("서울특별시 중구 명동"));
        } else {
            return clookService.getweatherclothes(clookService.gecodingnxny(sessionlocation),
                    clookService.getUv(sessionlocation));
        }

    }

    /* 1시간단위 - SKY / ICON / PTY / POP / T1H */
    @GetMapping(value = "/today", produces = "application/json; charset=UTF-8")
    public List<WeatherVO> todayweather(HttpServletRequest req, RedirectAttributes redirect)
            throws IOException, ParseException, java.text.ParseException {

        HttpSession session = req.getSession();

        String sessionlocation = (String) session.getAttribute("location");
        if (sessionlocation == null) {
            return clookService.getweathertoday(clookService.gecodingnxny("서울특별시 중구 명동"),
                    clookService.getsun("서울특별시 중구 명동"));
        } else {
            return clookService.getweathertoday(clookService.gecodingnxny(sessionlocation),
                    clookService.getsun(sessionlocation));
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
    public AirVO airAPI(HttpServletRequest req, RedirectAttributes redirect) throws IOException, ParseException {

        HttpSession session = req.getSession();

        String sessionlocation = (String) session.getAttribute("location");
        String sessionregion = (String) session.getAttribute("region");
        if (sessionlocation == null && sessionregion == null) {
            return clookService.getair(clookService.getStationName(clookService.getTm("서울특별시 중구 명동", "명동")));
        }
        else if (sessionlocation != null && sessionregion == null) {
            return clookService.getair(clookService.getStationName(clookService.getTm("서울특별시 중구 명동", "명동")));
        } else if (sessionlocation == null && sessionregion != null) {
            return clookService.getair(clookService.getStationName(clookService.getTm("서울특별시 중구 명동", "명동")));
        }else {
            return clookService.getair(clookService.getStationName(clookService.getTm(sessionlocation, sessionregion)));
        }
    }

    @GetMapping(value = "/uv", produces = "application/json; charset=UTF-8")
    public UvVO uvAPI(HttpServletRequest req) throws IOException, ParseException {
        HttpSession session = req.getSession();
        String sessionlocation = (String) session.getAttribute("location");
        if (sessionlocation == null) {
            return clookService.getUv("서울특별시 중구 명동");
        } else {
            return clookService.getUv(sessionlocation);
        }
    }

    @GetMapping(value = "/sun", produces = "application/json; charset=UTF-8")
    public SunVO sunAPI(HttpServletRequest req) throws IOException, ParseException {
        HttpSession session = req.getSession();
        String sessionlocation = (String) session.getAttribute("location");
        if (sessionlocation == null) {
            return clookService.getsun("서울특별시 중구 명동");
        } else {
            return clookService.getsun(sessionlocation);
        }

    }

    @PostMapping(value = "/sheet", produces = "application/json; charset=UTF-8")
    public void googleSheet(@RequestBody GoogleVO googleVO, Model model) throws IOException, GeneralSecurityException {
        clookService.insertSheet(googleVO);
    }

}
