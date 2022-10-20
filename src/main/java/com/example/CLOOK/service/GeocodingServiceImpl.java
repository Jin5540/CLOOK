package com.example.CLOOK.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import lombok.Setter;
import lombok.extern.log4j.Log4j;

import com.example.CLOOK.dao.GeocodingRepsitory;
import com.example.CLOOK.domain.GeocodingVO;
import com.example.CLOOK.service.GeocodingService;


@Service
public class GeocodingServiceImpl implements GeocodingService{
    
    @Override
	public GeocodingVO gecoding(String address) {

        System.out.println("serviceImpl:::------------------------------");

        GeocodingVO vo = GeocodingRepsitory.getData(address);

        System.out.println(vo);

        return GeocodingRepsitory.changData(vo);

	}

}
