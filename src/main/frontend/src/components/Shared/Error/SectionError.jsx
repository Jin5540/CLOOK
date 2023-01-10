import React from "react";
import { useLocationContext } from "../../../contexts/LocationContext";
import ErrorImage from "../../../assets/imgs/error/error1.png";
import Button from "../Button/Button";
import Section from "../Section/Section";

export default function ApiError({ error, resetErrorBoundary }) {
  console.log("===> Section Error");

  const status = error?.response?.data?.status;
  const errorMsg = error?.response?.data?.error;
  const type = error?.config?.url;

  const { updateLocation } = useLocationContext();
  const handleReset = () => {
    resetErrorBoundary();
    updateLocation("서울특별시 중구 명동", "명동");
  };

  let message = "";
  let buttonText = null;
  let handleClick = null;

  switch (status) {
    case (400, 404):
      message = "죄송해요. 서비스에 문제가 생겼어요.\nURL을 확인해 주세요.";
      // message = msg;
      buttonText = "메인으로 이동";
      handleClick = handleReset;
      break;
    case 500:
      message = "죄송해요. 서비스에 문제가 생겼어요.\n다시 시도해 주세요.";
      buttonText = "다시 시도";
      handleClick = resetErrorBoundary;
      break;
    default:
      message =
        "죄송해요. 서비스에 문제가 생겼어요.\n빠른 시간 내에 다시 돌아올게요.";
      buttonText = null;
      handleClick = null;
      break;
  }

  return (
    <Section
      styles={`${type === "search" ? "mb-0" : "border rounded-default"}`}
    >
      <div className="flex flex-col items-center w-full text-brand">
        <img
          className="w-[280px] h-[280px] mb-1"
          src={ErrorImage}
          alt="Error Image"
        />
        <span className="text-[4rem] font-bold leading-[4.75rem] mb-5 ">
          Error!
        </span>
        <span className="text-xl font-medium leading-6 text-center mb-10 whitespace-pre-wrap">
          {errorMsg}
          <br />
          {message}
        </span>
        {buttonText && (
          <Button
            text={buttonText}
            onClick={() => handleClick()}
            styles="text-xl font-semibold mb-10"
            selected="text-white bg-brand"
            hover="hover:bg-brand-dark"
          />
        )}
      </div>
    </Section>
  );
}
