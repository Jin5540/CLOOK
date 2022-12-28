import React, { useState } from "react";
import PopupCard from "../Card/PopupCard";
import Button from "../Button/Button";

export default function Opinion({ setOpinionShow, handleSubmit }) {
  const [input, setInput] = useState(null);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="mt-5">
      <PopupCard
        title="점수를 주신 이유도 알려주세요!"
        styles="w-[643px]"
        closeStyles="text-brand"
        onClose={() => setOpinionShow(false)}
      >
        <div className="flex flex-col text-2xl text-brand font-bold leading-10">
          <textarea
            className="w-full h-20 text-base font-semibold leading-6 px-2 py-1 bg-blue-100 rounded-default"
            name=""
            id=""
            cols="3"
            rows="10"
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="flex justify-end w-full mt-4">
          <Button
            text="보내기"
            styles="text-white bg-brand"
            onClick={() => handleSubmit("opinion", input)}
            disabled={input ? false : true}
            disabledStyle="h-10 text-white bg-blue-100"
          />
        </div>
      </PopupCard>
    </div>
  );
}
