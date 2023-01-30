import React, { useEffect, useState } from "react";
import { useLocationContext } from "../../contexts/LocationContext";
import Search from "./Search";
import SearchList from "./SearchList";
import useSearch from "../../hooks/useSearch";
import SearchError from "../Shared/Error/SearchError";
import * as common from "../../util/common";

export default function SearchContainer({ onCloseModal }) {
  const [keyword, setKeyword] = useState("");
  const { searchQuery } = useSearch(keyword);
  const { isSuccess, isError, refetch, data: dataList } = searchQuery;
  const { updateLocation } = useLocationContext();

  useEffect(() => {
    if (!keyword) return;
    refetch();
  }, [keyword]);

  const handleReset = () => {
    // 다시 검색
    refetch();
  };

  const handleMoveToMain = () => {
    // 메인으로 이동
    updateLocation("서울특별시 중구 명동", "명동");
    onCloseModal();
    common.moveToMain();
  };

  return (
    <>
      <Search setKeyword={setKeyword} dataList={dataList} isError={isError} />
      {isSuccess && keyword && dataList && (
        <SearchList onCloseModal={onCloseModal} dataList={dataList} />
      )}
      {isError && (
        <SearchError
          handleMoveToMain={handleMoveToMain}
          handleReset={handleReset}
        />
      )}
    </>
  );
}
