import React from "react";
import Icon from "../Icon/Icon";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";

export default function SurveyCard({ title, onClose, children }) {
  return (
    <div className="relative flex flex-col  justify-center items-center w-full p-[1.875rem] bg-white rounded-default global-shadow">
      <div
        className="absolute top-3 right-3 flex justify-center items-center w-[40px] h-[40px] text-brand cursor-pointer"
        onClick={onClose}
      >
        <Icon icon={faTimes} size="1.875rem" />
        {/* <Icon icon={faX} size="1.563rem" /> */}
      </div>
      <div className="flex w-full">
        <span className="w-full text-2xl text-brand font-bold leading-10 whitespace-pre-line">
          {title.split("\\n").map((text, index) => (
            <div key={index}>
              {text}
              <br />
            </div>
          ))}
        </span>
      </div>
      {children}
    </div>
  );
}
