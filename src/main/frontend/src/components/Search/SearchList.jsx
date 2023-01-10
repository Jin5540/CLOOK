import React from "react";
import { useLocationContext } from "../../contexts/LocationContext";
import SearchListItem from "./SearchListItem";
import ErrorImage from "../../assets/imgs/error/error1.png";

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
      {dataList?.address === null && (
        <div className="flex flex-col items-center w-full mt-3">
          <img
            className="w-[280px] h-[280px] max-w-[280px]"
            src={ErrorImage}
            alt=""
          />
          <span className="text-[2.25rem] font-semibold leading-[140%] text-brand">
            ERROR!
          </span>
          <span className="text-xl font-medium leading-[140%] text-blue-600 text-center">
            {/* 요청하신 내용을 찾을 수 없습니다. */}
            검색하신 지역을 찾을 수 없습니다.
            <br />
            검색어를 다시 확인해주세요.
          </span>
        </div>
      )}
    </ul>
  );
}
