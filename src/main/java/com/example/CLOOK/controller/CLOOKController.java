package com.example.CLOOK.controller;

import java.io.IOException;

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

    private final String address = "역삼동";

    private CLOOKService clookService;

    @GetMapping(value = "/clook", produces = "application/json; charset=UTF-8")
    public String geocoidngAPI() {
        System.out.println("controller:::------------------------------");

        String fail = "fail";

        try {
            return clookService.getweather(clookService.gecoding(address));
        } catch (IOException e) {
            
            e.printStackTrace();
            
            return fail;
        } catch (ParseException e) {

            e.printStackTrace();

            return fail;
        }

    }
}
