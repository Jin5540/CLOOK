import React from "react";

export default function Footer() {
  return (
    <footer className="flex flex-row justify-center items-center gap-8 w-full h-[100px] py-[2.375rem] text-base font-medium leading-[1.375rem] text-white bg-brand">
      <img src="/images/logo_white.png" alt="logo" />
      <span>V1.0</span>
      <span>Team. Clook</span>
      <span>team.clook@gmail.com</span>
      <span>날씨: 기상청</span>
      <span>대기: 한국환경공단(에어코리아)</span>
      <span>지역: 카카오</span>
    </footer>
  );
}
