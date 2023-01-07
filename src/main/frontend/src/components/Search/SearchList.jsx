import React from "react";
import { useLocationContext } from "../../contexts/LocationContext";
import SearchListItem from "./SearchListItem";

export default function SearchList({ onCloseModal, dataList }) {
  const { updateLocation } = useLocationContext();
  const addrArr = dataList?.address;
  const regionArr = dataList?.regionarr;

  const handleClick = (e) => {
    const addr = e.target.innerText;
    const region = e.target.dataset.region;
    updateLocation(addr, region);
    onCloseModal();
  };

  return (
    <ul className="flex flex-col items-start w-full max-h-[26.125rem] px-2 py-2 overflow-auto">
      {addrArr &&
        addrArr.map((item, index) => (
          <SearchListItem
            key={index}
            index={index}
            item={item}
            regionArr={regionArr}
            handleClick={handleClick}
          />
        ))}
    </ul>
  );
}
