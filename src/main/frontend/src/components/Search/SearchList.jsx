import React from "react";
import { useLocationContext } from "../../contexts/LocationContext";
import SearchListItem from "./SearchListItem";

export default function SearchList({ onCloseModal, data }) {
  const { updateLocation, updateSucc } = useLocationContext();

  const handleClick = (e) => {
    updateLocation(e.target.innerText);
    onCloseModal();
    updateSucc(false);
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
