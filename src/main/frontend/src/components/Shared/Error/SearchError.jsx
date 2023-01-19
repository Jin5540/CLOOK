import React from "react";
import MsgWithImage from "../Message/MsgWithImage";
import Button from "../Button/Button";

export default function SearchError({ handleMain, handleReset }) {
  const title = "앗 죄송해요!";
  const message = "서비스에 문제가 생겼어요.\n빠른 시간 내에 다시 돌아올게요.";

  return (
    <MsgWithImage
      boxStyles="flex flex-col items-center w-full pt-2 text-brand"
      imgStyles="w-[7.5rem] h-[7.5rem] mb-[0.625rem] lg:w-[11.25rem] lg:h-[11.25rem] lg:mb-[1.563rem]"
      title={title}
      titleStyles="text-2xl font-bold leading-[1.813rem] mb-[0.625rem] lg:text-[3rem] lg:leading-[3.563rem] lg:mb-[0.938rem]"
      msg={message}
      msgStyles="text-sm font-medium leading-[1.063rem] mb-4 text-center whitespace-pre-wrap lg:text-xl lg:leading-150 lg:mb-7"
    >
      <div className="flex mb-10 ">
        <Button
          text="메인으로 이동"
          onClick={handleMain}
          basicStyles="w-[8.25rem] h-[3.125rem] text-base font-semibold leading-[1.188rem] rounded-default lg:w-[12.5rem] lg:h-[3.75rem] lg:text-xl lg:leading-6"
          styles="mr-[0.938rem] text-white bg-brand lg:mr-10"
          hover="lg:hover:bg-brand-dark"
        />
        <Button
          text="다시 검색"
          onClick={handleReset}
          basicStyles="w-[8.25rem] h-[3.125rem] text-base font-semibold leading-[1.188rem] rounded-default lg:w-[12.5rem] lg:h-[3.75rem] lg:text-xl lg:leading-6"
          styles="text-brand bg-white border border-brand"
          hover="lg:hover:bg-brand-dark"
        />
      </div>
    </MsgWithImage>
  );
}
