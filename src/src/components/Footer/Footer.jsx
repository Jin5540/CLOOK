import React from "react";

export default function Footer() {
  return (
    <footer className="flex flex-row justify-center items-center w-full h-[6.25rem] mt-auto bg-brand">
      <img src="/images/logo_white.png" alt="" />
      <div className="text-base font-normal text-white">
        <span>Team.noname</span>
        <span className="mx-5">email@gmail.com</span>
        <span>국내 날씨 정보 - 기상청 / 미세먼지 - 한국 환경공단</span>
      </div>
    </footer>
  );
}
