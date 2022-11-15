package com.example.CLOOK.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ToString
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table (name ="uv_location") // 클래스명과 테이블명이 다를때 매핑시켜주기위해 사용
@Entity
public class LocationVO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //MySQL의 Auto_INCREMENT를 사용
    private int id;
    private String location_index;
    private String location;

    public LocationVO(String location_index, String location) {
        this.location_index = location_index;
        this.location = location;
    }
}
