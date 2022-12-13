import React from "react";
import Main from "../../Main/Main";
import Today from "../../Today/Today";
import ClothesByTime from "../../ClothesByTime/ClothesByTime";
import Fetch from "../../../Fetch";

export default function Content() {
  return (
    <div className="flex flex-col items-center w-full max-w-[992px] overflow-hidden overflow-y-auto">
      <>
        <Main />
        <Today />
        <ClothesByTime />
        <div className="flex items-center h-[1200px]">스크롤 테스트</div>
        {/* <Fetch /> */}
      </>
    </div>
  );
}
