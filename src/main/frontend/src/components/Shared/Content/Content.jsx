import React from "react";
import Main from "../../Main/Main";
import Today from "../../Today/Today";
import ClothesByTime from "../../ClothesByTime/ClothesByTime";
import { useLocationContext } from "../../../contexts/LocationContext";
import useLocation from "../../../hooks/useLocation";
import MainSkeleton from "../UI/MainSkeleton";
import TodaySkeleton from "../UI/TodaySkeleton";
import Fetch from "../../../Fetch";

export default function Content() {
  const { location } = useLocationContext();
  const { locationQuery } = useLocation(location);
  const { status, isLoading } = locationQuery;

  return (
    <div className="flex flex-col items-center w-full max-w-[992px] overflow-hidden overflow-y-auto">
      {isLoading && (
        <>
          <MainSkeleton />
          <TodaySkeleton />
        </>
      )}
      {status === "success" && (
        <>
          <Main />
          <ClothesByTime />
          <Today />
        </>
      )}
      {/* <Fetch /> */}
    </div>
  );
}
