import React from "react";
import { useLocationContext } from "../../../contexts/LocationContext";
import Header from "../../Header/Header";
import MsgWithImage from "../Message/MsgWithImage";
import Footer from "../../Footer/Footer";
import Button from "../Button/Button";

export default function GlobalError({ error, resetErrorBoundary }) {
  console.log("===> Global Error");
  const status = error?.response?.status;

  const { updateLocation } = useLocationContext();
  const handleReset = () => {
    updateLocation("서울특별시 중구 명동", "명동");
    resetErrorBoundary();
  };

  let message = "";
  let buttonText = null;
  let handleClick = null;

  switch (status) {
    case (400, 404):
      // message = "서비스에 문제가 생겼어요.\nURL을 확인해 주세요.";
      message = "서비스에 문제가 생겼어요.\n빠른 시간 내에 다시 돌아올게요.";
      buttonText = "메인으로 이동";
      handleClick = handleReset;
      break;
    case 500:
      // message = "서비스에 문제가 생겼어요.\n다시 시도해 주세요.";
      message = "서비스에 문제가 생겼어요.\n빠른 시간 내에 다시 돌아올게요.";
      buttonText = "다시 시도";
      handleClick = resetErrorBoundary;
      break;
    default:
      message = "서비스에 문제가 생겼어요.\n빠른 시간 내에 다시 돌아올게요.";
      buttonText = "메인으로 이동";
      handleClick = handleReset;
      break;
  }

  return (
    <div className="flex flex-col items-center justify-between w-full h-screen">
      <Header locationInVisible={true} />
      <MsgWithImage
        boxStyles="flex flex-col items-center w-full text-brand mt-[4.75rem] md:mt-[6rem]"
        titleStyles="text-[2.25rem] leading-[2.688rem] font-bold mb-[0.938rem] md:text-[3.25rem] md:leading-[3.875rem] md:mb-5"
        imgStyles="w-[11.875rem] h-[11.875rem] mb-[1.875rem] md:w-[17.5rem] md:h-[17.5rem] md:mb-[1.188rem]"
        msg={message}
        msgStyles="text-base font-medium leading-[1.188rem] mb-7 text-center whitespace-pre-wrap md:whitespace-nowrap md:text-xl md:leading-150 md:mb-10"
      >
        {buttonText && (
          <Button
            text={buttonText}
            onClick={() => handleClick()}
            basicStyles="w-[8.25rem] h-[3.125rem] text-base font-semibold leading-[1.188rem] text-center rounded-default md:w-[12.5rem] md:h-[3.75rem] md:text-2xl md:leading-6"
            styles="bg-brand text-white"
            hover="hover:bg-brand-dark"
          />
        )}
      </MsgWithImage>
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
}
