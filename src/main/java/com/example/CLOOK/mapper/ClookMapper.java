package com.example.CLOOK.mapper;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ClookMapper {

    String getLocaionIndex(String result);
    String getLocaion(@Param("result1")String result1, @Param("result2")String result2);
}
