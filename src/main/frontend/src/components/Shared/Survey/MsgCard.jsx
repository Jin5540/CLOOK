import React, { useEffect, useRef } from "react";
import Card from "../Card/Card";
import Icon from "../Icon/Icon";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export default function MsgCard({ onCloseModal, msgCardShow, setMsgCardShow }) {
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      if (!msgCardShow) return;

      // console.log(`타임: ${timerRef.current}`);
      setMsgCardShow(false);
      onCloseModal();
    }, 3000);

    // Clear the interval when the component unmounts
    return () => {
      // console.log(`클리어: ${timerRef.current}`);

      clearTimeout(timerRef.current);
    };
  }, []);

  const handleClose = () => {
    setMsgCardShow(false);
    onCloseModal();
  };

  return (
    <Card
      styles={`flex items-center justify-center w-full px-6 py-5 shadow-none md:w-[643px] md:px-9`}
      selected={true}
    >
      <div className="flex justify-start items-center w-full">
        <div className="flex items-center text-[#D9D9D9] mr-6">
          <Icon icon={faCheck} styles="text-3xl lg:text-[2.25rem]" />
        </div>
        <span className="text-white text-xl font-bold leading-150 md:text-2xl">
          소중한 의견 감사합니다!
        </span>
      </div>
      <div
        className={`flex justify-end w-[20%] cursor-pointer`}
        onClick={handleClose}
      >
        <Icon icon={faTimes} styles="text-2xl md:text-3xl lg:text-[2.25rem]" />
      </div>
    </Card>
  );
}
