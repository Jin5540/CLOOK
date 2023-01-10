import React from "react";
import Icon from "../../Shared/Icon/Icon";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export default function SurveyCard({ title, onClose, children }) {
  return (
    <div
      className={`flex flex-col justify-start w-full p-[1.875rem] bg-white rounded-default global-shadow`}
    >
      <div className="flex w-full">
        <span className="w-[80%] text-2xl text-brand font-bold leading-10 whitespace-pre-line">
          {title.split("\\n").map((text, index) => (
            <div key={index}>
              {text}
              <br />
            </div>
          ))}
        </span>
        <div
          className={`flex justify-end w-[20%] cursor-pointer`}
          onClick={onClose}
        >
          <Icon icon={faTimes} size="1.563rem" />
        </div>
      </div>
      {children}
    </div>
  );
}
