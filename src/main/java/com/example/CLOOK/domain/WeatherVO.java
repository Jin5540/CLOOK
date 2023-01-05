package com.example.CLOOK.domain;

import java.util.List;

import org.springframework.boot.autoconfigure.domain.EntityScan;

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
    private String tmp; //1시간 기온
    private String wsd; //풍속
    private String rn1; //1시간 강수량
    
    private Integer tmpl; //1시간 기온 평균
    private String clothes1; //옷
    private String clothes2; //옷
    private String item1; //옷
    private String item2; //옷
    private String item3; //옷
    private String background;

    private String icon; //icon
    private String character; //캐릭터

    private String fcstDate;
    private String fcstTime;

    private int fTime;

    private List<String> time;
    private List<String> date;
    private List<String> message;

    private String m;

    private List<WeatherVO> weatherVoList;

    private WeatherVO weatherVoresult;

    private String h0;
    private String h3;
    private String h6;
    private String h9;
    private String h12;
    private String h15;
    private String h18;
    private String h21;
    private String h24;

    public Object stream() {
        return null;
    }
    
}
