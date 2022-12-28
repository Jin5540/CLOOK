import React from "react";

export default function Card({ styles, selected, onClick, children }) {
  return (
    <div
      className={`global-shadow rounded-default ${styles} ${
        selected ? "text-white bg-brand" : "text-brand bg-white"
      }`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
