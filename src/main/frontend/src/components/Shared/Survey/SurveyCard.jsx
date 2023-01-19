import React from "react";
import Icon from "../Icon/Icon";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export default function SurveyCard({ title, onClose, children }) {
  return (
    <div className="relative flex flex-col justify-center items-center w-full p-[1.875rem] bg-white rounded-default global-shadow">
      <div
        className="absolute top-5 right-5 flex justify-center items-center text-brand cursor-pointer"
        onClick={onClose}
      >
        <Icon icon={faTimes} styles="text-xl md:text-3xl lg:text-[2.25rem]" />
      </div>
      <div className="flex w-full">
        <span className="w-full text-xl text-brand font-bold leading-10 whitespace-pre-line lg:text-2xl">
          {title}
        </span>
      </div>
      {children}
    </div>
  );
}
