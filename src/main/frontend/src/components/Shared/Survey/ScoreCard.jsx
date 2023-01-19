import React, { useState } from "react";
import Button from "../Button/Button";
import SurveyCard from "../Survey/SurveyCard";

export default function ScoreCard({
  onCloseModal,
  setData,
  setScoreCardShow,
  setOpinionCardShow,
}) {
  const [score, setScore] = useState(-1);

  const scoreArr = Array(11)
    .fill()
    .map((value, index) => index);

  const handleClose = () => {
    setScoreCardShow(false);
    onCloseModal();
  };

  const handleGoToOpinionCard = () => {
    setData((data) => {
      return { ...data, num: score };
    });
    setScoreCardShow(false);
    setOpinionCardShow(true);
  };

  const title = "이 서비스를 친구나 지인에게\n얼마나 추천하고 싶은가요?";

  return (
    <SurveyCard title={title} onClose={handleClose}>
      <div className="flex justify-between w-full text-[0.938rem] font-normal leading-[1.563rem] text-brand md:hidden">
        <span>비추천</span>
      </div>
      <div className="flex flex-wrap justify-center gap-x-2 gap-y-[0.625rem] w-full m-0 mt-1 md:justify-between md:flex-row md:mb-0 lg:mt-4">
        {scoreArr.map((item, index) => (
          <Button
            key={index}
            text={item}
            onClick={() => setScore((pre) => item)}
            basicStyles="w-[2.313rem] h-[2.313rem] text-[1.063rem] leading-6 rounded-md md:w-11 md:h-11"
            styles="text-brand bg-blue-100"
            selected={score === item ? "text-white bg-brand" : ""}
            hover="hover:bg-brand hover:border-transparent hover:text-white"
          />
        ))}
      </div>
      <div className="flex justify-end w-full text-[0.938rem] font-normal leading-[1.563rem] text-brand mb-6 md:justify-between">
        <span className="hidden md:inline-block">비추천</span>
        <span className="">추천</span>
      </div>
      <div className="flex justify-between w-full">
        <Button
          text="좀 더 둘러보고 다시 올게요!"
          basicStyles="text-sm font-semibold leading-[1.188rem] px-5 py-[0.438rem] rounded-default md:text-base md:py-[0.688rem]"
          styles="text-white bg-[#9CA3AF] hover:bg-[#81868d]"
          onClick={handleClose}
        />
        <Button
          text="보내기"
          onClick={handleGoToOpinionCard}
          basicStyles="text-sm font-semibold leading-[1.188rem] px-5 py-[0.438rem] rounded-default md:text-base md:py-[0.688rem]"
          styles="text-white bg-brand"
          disabled={score > -1 ? false : true}
          disabledStyle="text-white bg-blue-100"
        />
      </div>
    </SurveyCard>
  );
}
