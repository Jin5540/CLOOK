import React from "react";
import { useLocationContext } from "../../contexts/LocationContext";
import SearchListItem from "./SearchListItem";

export default function SearchList({ onCloseModal, dataList }) {
  const { updateLocation } = useLocationContext();

  const handleClick = (e) => {
    updateLocation(e.target.innerText);
    onCloseModal();
  };

  return (
    <ul className="flex flex-col items-start w-full max-h-[26.125rem] px-2 py-2 overflow-auto">
      {dataList &&
        dataList.map((item, index) => (
          <SearchListItem key={index} item={item} handleClick={handleClick} />
        ))}
    </ul>
  );
}
