package com.example.CLOOK.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.CLOOK.domain.GeocodingVO;
import com.example.CLOOK.service.GeocodingService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class GeocodingAPIController {

    private final String address = "역삼동";

    private GeocodingService geocodingService;

    @GetMapping("/gecoding")
    public GeocodingVO geocoidngAPI() {
        System.out.println("controller:::------------------------------");

        return geocodingService.gecoding(address);

    }
}
