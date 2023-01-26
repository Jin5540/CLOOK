import React from "react";
import ErrorCharacter from "../../../assets/imgs/error/characterErrorShadowVer.png";

export default function MsgWithImage({
  boxStyles,
  imgSrc,
  imgStyles,
  title,
  titleStyles,
  subTitle,
  subTitleStyle,
  msg,
  msgStyles,
  children,
}) {
  return (
    <div
      className={`${
        boxStyles
          ? boxStyles
          : "flex flex-col items-center w-full text-brand pt-10 pb-14 lg:pt-5 lg:pb-10"
      }`}
    >
      <img
        className={`${
          imgStyles
            ? imgStyles
            : "w-[7.5rem] h-[7.5rem] mb-[1.875rem] lg:w-[9.375rem] lg:h-[9.375rem] lg:mb-5"
        }`}
        src={imgSrc ? imgSrc : ErrorCharacter}
        alt="ErrorCharacter"
      />

      {title && (
        <span
          className={`${
            titleStyles
              ? titleStyles
              : "text-2xl font-bold leading-[1.813rem] mb-[0.625rem] lg:text-4xl lg:leading-[3rem]"
          }`}
        >
          {title}
        </span>
      )}

      {subTitle && (
        <span
          className={`${
            subTitleStyle
              ? subTitleStyle
              : "text-[0.875rem] font-medium leading-[1.063rem] text-center mb-[2.188rem] whitespace-pre-wrap lg:text-xl lg:leading-150 lg:mb-[1.375rem] lg:whitespace-nowrap"
          }`}
        >
          {subTitle && subTitle}
        </span>
      )}

      <span
        className={`${
          msgStyles
            ? msgStyles
            : "text-[0.875rem] font-medium leading-[1.063rem] text-center mb-[2.188rem] whitespace-pre-wrap lg:text-xl lg:leading-150 lg:mb-[1.375rem] lg:whitespace-nowrap"
        }`}
      >
        {msg}
      </span>
      {children}
    </div>
  );
}
