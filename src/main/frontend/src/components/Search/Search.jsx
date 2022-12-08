import React from "react";
import Icon from "../Shared/Icon/Icon";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function Search({ keyword, setKeyword, refetch }) {
  const [input, setInput] = useState("");
  const [inputCheck, setInputCheck] = useState(false);

  const handleChange = (e) => {
    setInputCheck(false);

    const value = e.target.value.trim();
    if (value === "" && value === undefined) return;

    setInput(value);
  };

  const handleClick = (e) => {
    if (!input) {
      setInputCheck(true);
      return;
    }

    const lastChar = input.slice(-1);
    console.log("lastChar === " + lastChar);

    if (lastChar === "읍" || lastChar === "면" || lastChar === "동") {
      setKeyword(input);
    }
  };

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      handleClick();
    }
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
            type="text"
            placeholder="예) 신사동"
            value={input}
            onChange={handleChange}
            onKeyPress={handleOnKeyPress}
          />
        </div>
        <div className="flex justify-between w-full my-3 text-blue-600">
          {!inputCheck && (
            <>
              <span>*00동을 입력해주세요.</span>
              <span>*국내 도시만 서비스되고 있습니다.</span>
            </>
          )}
          {inputCheck && (
            <span className="text-red">*검색어를 다시 확인해주세요.</span>
          )}
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
