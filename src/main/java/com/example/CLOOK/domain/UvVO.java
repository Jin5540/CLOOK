package com.example.CLOOK.domain;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
public class UvVO {
    private List<String> sun;

    private String h0;
    private String h3;
    private String h6;
    private String h9;
    private String h12;
    private String h15;
    private String h18;
    private String h21;
    private String h24;

    private String time;

    private String hmsg;
}
