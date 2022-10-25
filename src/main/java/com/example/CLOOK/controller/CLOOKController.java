package com.example.CLOOK.controller;

import java.io.IOException;
import java.util.List;

import org.json.simple.parser.ParseException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.CLOOK.domain.GeocodingVO;
import com.example.CLOOK.service.CLOOKService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class CLOOKController {

    private final String address = "경기도 성남시";

    private CLOOKService clookService;

    @GetMapping(value = "/short", produces = "application/json; charset=UTF-8")
    public String shortweather() throws IOException, ParseException {
        System.out.println("controller:::------------------------------");

        return clookService.getweather(clookService.gecodingnxny(address));

    }

    @GetMapping(value = "/shortpart", produces = "application/json; charset=UTF-8")
    public String shortpartweather() throws IOException, ParseException {
        System.out.println("controller:::------------------------------");

        return clookService.getweather(clookService.gecodingnxny(address));

    }

    @GetMapping(value = "/location", produces = "application/json; charset=UTF-8")
    public List<String> searchAPI() throws IOException, ParseException {
        System.out.println("controller:::------------------------------");

        return clookService.location(address);
    }

}
