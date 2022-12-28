package com.example.CLOOK.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
public class GoogleVO {

    private int num;
    private String comment; 

}
