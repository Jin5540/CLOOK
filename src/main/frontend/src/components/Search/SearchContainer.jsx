import React, { useEffect, useState } from "react";
import Search from "./Search";
import SearchList from "./SearchList";
import useSearch from "../../hooks/useSearch";

export default function SearchContainer({ onCloseModal }) {
  const [keyword, setKeyword] = useState("");
  const { searchQuery } = useSearch(keyword);
  const { isError, refetch, data: dataList } = searchQuery;

  useEffect(() => {
    if (!keyword) return;
    refetch();
  }, [keyword]);

  return (
    <>
      <Search setKeyword={setKeyword} helpMsgVisible={keyword ? true : false} />
      {keyword && dataList && (
        <SearchList onCloseModal={onCloseModal} dataList={dataList} />
      )}
    </>
  );
}
