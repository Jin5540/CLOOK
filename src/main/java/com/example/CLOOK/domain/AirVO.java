<<<<<<< HEAD
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
=======
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
>>>>>>> c1313fe95e3a011c1cc259a5be4bf8715da834fc
