import React from "react";
import Main from "../../Main/Main";
import useWeather from "../../../hooks/useWeather";
import Skeleton from "../UI/Skeleton";
import ClothesByTime from "../../ClothesByTime/ClothesByTime";

export default function Content() {
  const { toptmQuery, topsptQuery, isLoadingToptm, isLoadingTopspt } =
    useWeather();
  const { data: toptm } = toptmQuery;
  const { data: topspt } = topsptQuery;
  console.log(toptm);
  console.log(topspt);

  return (
    <div className="flex flex-col items-center w-full max-w-[992px]">
      {(isLoadingToptm || isLoadingTopspt) && <Skeleton />}
      {!isLoadingToptm && !isLoadingTopspt && (
        <>
          <Main toptm={toptm} topspt={topspt} />
          <ClothesByTime />
          <div className="flex items-center h-[500px]">스크롤 테스트</div>
        </>
      )}
    </div>
  );
}
