import React from "react";
import Footer from "../../Footer/Footer";
import ErrorImage from "../../../assets/imgs/error/error1.png";
import Button from "../Button/Button";

export default function Error({ error, resetErrorBoundary }) {
  console.log(error);
  const status = error?.response?.status;
  const message = error?.message && error?.message;

  const handleClick = () => {
    localStorage.setItem("location", "서울특별시 중구 명동");
    localStorage.setItem("region", "명동");
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-between w-full h-screen">
      <div className="w-full h-[4.375rem] pt-[2.188rem] pl-[3.75rem]">
        <img
          onClick={handleClick}
          className="cursor-pointer"
          src="/images/logo.png"
          alt="Logo"
        />
      </div>
      <div className="flex flex-col items-center w-full text-brand ">
        <img
          className="w-[280px] h-[280px] mb-1"
          src={ErrorImage}
          alt="Error Image"
        />
        <span className="text-[4rem] font-bold leading-[4.75rem] mb-5">
          Error!
        </span>
        <span className="text-xl font-medium leading-6 mb-10">
          죄송해요. 서비스에 문제가 생겼어요.
          <br />
          빠른 시간 내에 다시 돌아올게요.
        </span>

        <Button
          text="메인으로 이동"
          onClick={handleClick}
          styles="text-xl font-semibold mb-10"
          selected="text-white bg-brand"
          hover="hover:bg-brand-dark"
        />
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
}
