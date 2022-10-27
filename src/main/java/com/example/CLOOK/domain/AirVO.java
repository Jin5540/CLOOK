package com.example.CLOOK.domain;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
public class AirVO {

    private String pm25Value24;
    private String pm10Value24; 
    private String dataTime;
}
