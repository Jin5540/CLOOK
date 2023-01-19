import React from "react";
import { useLocationContext } from "../../../contexts/LocationContext";
import Section from "../Section/Section";
import Button from "../Button/Button";
import MsgWithImage from "../Message/MsgWithImage";

export default function ApiError({ error, resetErrorBoundary }) {
  console.log("===> Section Error");

  const status = error?.response?.status;

  const { updateLocation } = useLocationContext();
  const handleReset = () => {
    updateLocation("서울특별시 중구 명동", "명동");
    resetErrorBoundary();
  };

  let title = "앗 죄송해요!";
  let message = "";
  let buttonText = null;
  let handleClick = null;

  switch (status) {
    case (400, 404):
      message = "서비스에 문제가 생겼어요.\n빠른 시간 내에 다시 돌아올게요.";
      buttonText = "메인으로 이동";
      handleClick = handleReset;
      break;
    case 500:
      message = "서비스에 문제가 생겼어요.\n빠른 시간 내에 다시 돌아올게요.";
      buttonText = "다시 시도";
      handleClick = resetErrorBoundary;
      break;
    default:
      message = "서비스에 문제가 생겼어요.\n빠른 시간 내에 다시 돌아올게요.";
      buttonText = null;
      handleClick = null;
      break;
  }

  return (
    <Section styles="rounded-default global-shadow">
      <MsgWithImage title={title} msg={message}>
        {buttonText && (
          <div className="flex text-2x">
            <Button
              text={buttonText}
              onClick={() => handleClick()}
              basicStyles="w-[7.813rem] h-[3.125rem] text-xl font-semibold leading-[1.188rem] text-white bg-brand rounded-default lg:w-[9.375rem] lg:h-[3.75rem]"
              styles=""
              hover="hover:bg-brand-dark"
            />
          </div>
        )}
      </MsgWithImage>
    </Section>
  );
}
