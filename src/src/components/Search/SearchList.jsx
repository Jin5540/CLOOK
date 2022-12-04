import React from "react";
import SearchListItem from "./SearchListItem";

export default function SearchList({ onCloseModal, setLocation, data }) {
  const handleClick = (e) => {
    // e.target.classList.add("");
    setLocation(e.target.innerText);
    localStorage.setItem("location", e.target.innerText);
    onCloseModal();
  };

  return (
    <ul className="flex flex-col items-start w-full h-[26.125rem] px-2 py-2 overflow-auto">
      {data &&
        data.map((item, index) => (
          <SearchListItem key={index} item={item} handleClick={handleClick} />
        ))}
    </ul>
  );
}
