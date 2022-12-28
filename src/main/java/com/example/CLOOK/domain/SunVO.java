<<<<<<< HEAD
package com.example.CLOOK.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
public class SunVO {

    private String sunrise; //일출
    private int sunset;  //일몰
}
=======
package com.example.CLOOK.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
public class SunVO {

    private String sunrise; //일출
    private int sunset;  //일몰
}
>>>>>>> c1313fe95e3a011c1cc259a5be4bf8715da834fc
