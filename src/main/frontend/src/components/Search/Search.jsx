import React from "react";
import Icon from "../Shared/Icon/Icon";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useLocationContext } from "../../contexts/LocationContext";

export default function Search({ keyword, setKeyword, refetch }) {
  const { updateSucc } = useLocationContext();
  const [input, setInput] = useState("");
  const [inputCheck, setInputCheck] = useState(false);
  const [addrCheck, setAddrCheck] = useState(false);

  const handleChange = (e) => {
    setInputCheck(false);

    setInput(e.target.value);
  };

  const handleClick = (e) => {
    if (!input.trim()) {
      setInputCheck(true);
      setKeyword("");
      return;
    }

    // const lastChar = input.slice(-1);
    // if (lastChar === "읍" || lastChar === "면" || lastChar === "동") {
    if (input.includes("읍") || input.includes("면") || input.includes("동")) {
      setKeyword(input);
      setAddrCheck(false);
      // updateSucc(false);
    } else {
      setAddrCheck(true);
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
              <span className={addrCheck ? "text-red" : "text-blue-600"}>
                *00동을 입력해주세요.
              </span>
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
