package com.example.CLOOK.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
public class AirVO {

    private String pm25Grade1h;
    private String pm10Grade1h; 
    private String dataTime;

    private String tmx;
    private String tmy;

    private String stationName;

}
