package com.example.CLOOK.domain;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
public class WeatherVO {

    private String sky; //하늘상태
    private int t1h; //기온
    private String pty; //강수형태
    private String tmn; //최저온도
    private String tmx; //최고온도
    private String vec; //풍향
    private String reh; //습도
    private String pop; //강수확률
    private String pcp; //강수량
    private String sno; //신적설

    private String icon; //icon
    private String character; //캐릭터

    private String fcstDate;
    private String fcstTime;

    private List<String> time;
    private List<String> message;

    private List<WeatherVO> weatherVoList;
    
}
