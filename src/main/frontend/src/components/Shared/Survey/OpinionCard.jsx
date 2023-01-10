import React, { useState } from "react";
import Button from "../Button/Button";
import SurveyCard from "../Survey/SurveyCard";

export default function OpinionCard({ setData, handleSubmit }) {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleClose = () => {
    handleSubmit();
  };

  const handleClick = () => {
    setData((data) => {
      return { ...data, comment: input };
    });
  };

  return (
    <SurveyCard title="점수를 주신 이유도 알려주세요!" onClose={handleClose}>
      <div className="flex flex-col w-full text-2xl text-brand font-bold leading-10 mt-4 mb-6">
        <textarea
          className="w-full h-[120px] text-base font-semibold leading-6 bg-blue-100 rounded-default outline-brand resize-none"
          name=""
          id=""
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="flex justify-end w-full text-base font-semibold leading-[1.188rem]">
        <Button
          text="보내기"
          onClick={handleClick}
          styles="text-white bg-brand"
          disabled={input ? false : true}
          disabledStyle="text-white bg-blue-100"
        />
      </div>
    </SurveyCard>
  );
}
