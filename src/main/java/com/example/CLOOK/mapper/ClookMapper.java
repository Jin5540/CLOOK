package com.example.CLOOK.mapper;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.CLOOK.entity.LocationVO;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ClookMapper extends JpaRepository<LocationVO, Integer> {

   String getLocaionIndex(String location_name);
    
}
