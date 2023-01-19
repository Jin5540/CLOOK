import React from "react";
import { useLocationContext } from "../../contexts/LocationContext";
import SearchListItem from "./SearchListItem";
import ErrorCharacter from "../../assets/imgs/error/characterErrorShadowVer.png";
import MsgWithImage from "../Shared/Message/MsgWithImage";

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

  const title = "No Data!";
  const message =
    "검색하신 지역을 찾을 수 없습니다.\n검색어를 다시 확인해주세요.";

  return (
    <>
      {dataList?.address?.length > 0 && (
        <ul className="flex flex-col items-start w-full max-h-[15.375rem] py-2 overflow-auto md:max-h-[26.125rem]">
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
      )}

      {dataList?.address === null && (
        <MsgWithImage
          boxStyles="flex flex-col items-center w-full pt-2 pb-2 text-brand lg:pb-4"
          imgStyles="w-[7.5rem] h-[7.5rem] mb-[0.625rem] md:mb-4 lg:w-[11.25rem] lg:h-[11.25rem] lg:mb-[1.563rem]"
          title={title}
          titleStyles="text-2xl font-bold leading-[1.813rem] mb-[0.625rem] md:text-4xl md:mb-[0.938rem] lg:text-[3rem] lg:leading-[3.563rem]"
          msg={message}
          msgStyles="text-sm font-medium leading-[1.063rem] mb-4 text-center whitespace-pre-wrap md:text-lg lg:text-xl lg:leading-150 lg:mb-7"
        />
      )}
    </>
  );
}
