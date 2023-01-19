import React from "react";
import Icon from "../Shared/Icon/Icon";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

export default function Search({ setKeyword, dataList, isError }) {
  const [input, setInput] = useState("");
  const [inputCheck, setInputCheck] = useState(false);
  const [addrCheck, setAddrCheck] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

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

    const lastChar = input.slice(-1);
    if (
      lastChar === "읍" ||
      lastChar === "면" ||
      lastChar === "동" ||
      lastChar === "길" ||
      lastChar === "로" ||
      lastChar === "가"
    ) {
      setKeyword(input);
      setAddrCheck(false);
    } else {
      setKeyword("");
      setAddrCheck(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      handleClick();
    }
  };

  return (
    <div>
      <div className="flex flex-row justify-between py-2 text-xl font-semibold leading-140 text-brand bg-white">
        <div className="flex items-center w-full h-[3.75rem] px-2 bg-sub-brand rounded-default">
          <div className="mx-2">
            <Icon icon={faMagnifyingGlass} />
          </div>
          <input
            className="w-full h-full text-brand bg-sub-brand border-none outline-none placeholder:text-white"
            type="text"
            placeholder="예) 신사동, 종로1가"
            value={input}
            ref={inputRef}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
      {!isError && !dataList?.address && (
        <div className="flex flex-col w-full text-base font-normal leading-[1.188rem] mt-3 text-blue-600 md:leading-140 md:font-medium md:text-lg xl:text-xl">
          {!inputCheck && (
            <>
              <span
                className={`mb-2 ${addrCheck ? "text-red" : "text-blue-600"}`}
              >
                *<b>~읍/면/동/가/로/길</b> 로 검색해주세요.
              </span>
              <span>*국내 도시만 서비스되고 있습니다.</span>
            </>
          )}
          {!input && inputCheck && (
            <span className="text-red">*검색어를 다시 확인해주세요.</span>
          )}
        </div>
      )}
    </div>
  );
}
