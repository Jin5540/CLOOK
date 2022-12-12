import React from "react";
// import styles from "./Card.module.css";

export default function Card({ onClick, selected, styles, children }) {
  return (
    <div
      className={`flex items-center justify-center w-full h-20 px-6 global-shadow rounded-default cursor-pointer ${styles} ${
        selected ? "text-white bg-brand" : "text-brand bg-white"
      }`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
