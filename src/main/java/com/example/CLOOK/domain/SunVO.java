package com.example.CLOOK.domain;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
public class SunVO {

    private String sunrise; //일출
    private int sunset;  //일몰
}
