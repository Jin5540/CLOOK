import React from "react";
import Icon from "../Shared/Icon/Icon";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

export default function Search({ setKeyword, helpMsgVisible }) {
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
      <div className="flex flex-row justify-between py-2 text-xl font-medium text-brand bg-white">
        <div className="flex w-full max-w-[31rem]">
          <div className="flex items-center w-full h-[3.75rem] px-2 bg-sub-brand rounded-default">
            <div className="mx-2">
              <Icon icon={faMagnifyingGlass} />
            </div>
            <input
              className="w-full h-full bg-sub-brand border-none outline-none placeholder:text-white"
              type="text"
              placeholder="예) 신사동, 종로1가"
              value={input}
              ref={inputRef}
              // onClick={onFocus}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
        <button
          className="w-24 h-[3.75rem] ml-[1.375rem] font-semibold text-white bg-brand rounded-default"
          onClick={handleClick}
        >
          검색
        </button>
      </div>
      {(!helpMsgVisible || (helpMsgVisible && addrCheck)) && (
        <div className="flex flex-col w-full text-xl leading-[140%] font-medium mt-3 text-blue-600">
          {!inputCheck && (
            <>
              <span className={addrCheck ? "text-red" : "text-blue-600"}>
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
