import React from "react";
import Icon from "../Shared/Icon/Icon";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Search({ setKeyword, refetch }) {
  const handleChange = (e) => {
    const keyword = e.target.value.trim();
    if (keyword === "" && keyword === undefined) return;
    setKeyword(keyword);
  };

  const handleClick = (e) => {
    refetch();
  };

  return (
    <div className="flex flex-row justify-between pt-2 pb-6 text-xl font-medium text-brand bg-white">
      <div className="flex flex-col w-full max-w-[31rem]">
        <div className="flex items-center w-full h-[3.75rem] px-2 bg-sub-brand rounded-default">
          <div className="mx-2">
            <Icon icon={faMagnifyingGlass} />
          </div>
          <input
            className="w-full h-full bg-sub-brand border-none outline-none placeholder:text-white"
            id="searh"
            type="text"
            placeholder="예) 신사동"
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-between w-full my-3 text-blue-600">
          <span>*00동을 입력해주세요.</span>
          <span>*국내 도시만 서비스되고 있습니다.</span>
        </div>
      </div>
      <button
        className="w-24 h-[3.75rem] ml-[1.375rem] font-semibold text-white bg-brand rounded-default"
        onClick={handleClick}
      >
        검색
      </button>
    </div>
  );
}
