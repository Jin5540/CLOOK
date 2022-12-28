import React from "react";
import Icon from "../Icon/Icon";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export default function PopupCard({
  title,
  styles,
  closeStyles,
  onClick,
  onClose,
  children,
}) {
  return (
    <div
      className={`relative flex flex-col justify-start p-[1.875rem] bg-white rounded-default global-shadow ${styles}`}
    >
      <div className={`flex w-full`} onClick={onClick}>
        <span className="w-[80%] text-2xl text-brand font-bold leading-10 whitespace-pre-line">
          {title.split("\\n").map((text, index) => (
            <div key={index}>
              {text}
              <br />
            </div>
          ))}
        </span>
        <div
          className={`flex justify-end w-[20%] cursor-pointer ${closeStyles}`}
          onClick={onClose}
        >
          <Icon icon={faTimes} size="1.563rem" />
        </div>
      </div>
      {children}
    </div>
  );
}
