package com.example.CLOOK.domain;

import java.util.List;
import lombok.Data;

@Data
public class GeocodingVO {

    private List<String> address;
    private List<String> regionarr;

    private double lat; // gps로 반환받은 위도
    private double lon; // gps로 반환받은 경도

    private String xLat; // x좌표로 변환된 위도
    private String yLon; // y좌표로 변환된 경도

    private int mode = 0; // 0 (격자->위경도), 1 (위경도->격자)

    private String result_status; 
    
}
