import React, { useState } from "react";
import PopupCard from "../Card/PopupCard";
import Button from "../Button/Button";

export default function Score({
  score,
  setScore,
  setScoreShow,
  handleOpinionShow,
  handlePass,
  handleSubmit,
}) {
  const scoreArr = Array(10)
    .fill()
    .map((value, index) => index + 1);

  const handleCilckScore = (item) => {
    setScore(item);
    handleOpinionShow();
  };

  const handleClose = () => {
    setScore(0);
    setScoreShow(false);
  };

  return (
    <div>
      <PopupCard
        title="이 서비스를 친구나 지인에게\n 얼마나 추천하고 싶은가요?"
        styles="w-[643px]"
        onClose={handleClose}
        closeStyles="text-brand"
      >
        <div className="flex justify-between w-full m-0 mt-4 mb-[0.625rem]">
          {scoreArr.map((item, index) => (
            <Button
              key={index}
              text={item}
              styles="w-[2.813rem] h-[2.813rem] p-0 text-brand bg-blue-100"
              onClick={() => handleCilckScore(item)}
              selected={score === item ? "text-white bg-brand" : ""}
              hover="hover:bg-brand hover:border-transparent hover:text-white"
            />
          ))}
        </div>
        <div className="flex justify-between w-full text-[0.938rem] font-normal leading-[1.563rem] text-brand mb-6">
          <span>추천</span> <span>비추천</span>
        </div>
        <div className="flex justify-between w-full text-base font-semibold leading-[1.188rem]">
          <Button
            text="좀 더 둘러보고 다시 올게요!"
            styles="text-white bg-[#9CA3AF] hover:bg-[#81868d]"
            onClick={handlePass}
          />
          <Button
            text="보내기"
            styles="text-white bg-brand"
            onClick={() => handleSubmit("score")}
            disabled={score > 0 ? false : true}
            disabledStyle="text-white bg-blue-100"
          />
        </div>
      </PopupCard>
    </div>
  );
}
