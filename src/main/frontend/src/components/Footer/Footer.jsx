import React from "react";

export default function Footer() {
  return (
    <footer className="flex flex-row flex-wrap justify-center items-center gap-3 w-full h-[100px] pt-5 pb-7 text-xs font-medium leading-[1.375rem] text-white bg-brand md:text-sm md:gap-5 lg:text-base xl:py-[2.375rem]">
      <img
        className="h-3 md:h-4 lg:h-auto"
        src="/images/logo_white.png"
        alt="logo"
      />
      <span className="mr-2">V1.0-Beta</span>
      <span className="mr-2">Team. Clook</span>
      <span className="mr-2">team.clook@gmail.com</span>
      <span className="mr-2">날씨: 기상청</span>
      <span className="mr-2">대기: 한국환경공단(에어코리아)</span>
      <span className="mr-2">지역: 카카오</span>
    </footer>
  );
}
