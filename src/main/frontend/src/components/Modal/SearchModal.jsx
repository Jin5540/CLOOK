import React, { useEffect } from "react";
import { useState } from "react";
import Search from "../Search/Search";
import SearchList from "../Search/SearchList";
import Modal from "../Shared/Modal/Modal";
import useSearch from "../../hooks/useSearch";
import ErrorImage from "../../assets/imgs/error/error1.png";

export default function SearchModal({ onCloseModal }) {
  const [keyword, setKeyword] = useState("");
  const { searchQuery } = useSearch(keyword);
  const { isError, refetch, data: dataList } = searchQuery;

  useEffect(() => {
    if (!keyword) return;
    refetch();
  }, [keyword]);

  return (
    <Modal onCloseModal={onCloseModal}>
      <Search
        setKeyword={setKeyword}
        noData={keyword && dataList?.length === 0}
      />
      {keyword && dataList?.length > 0 && (
        <SearchList onCloseModal={onCloseModal} dataList={dataList} />
      )}
      {keyword && dataList?.length === 0 && (
        <div className="flex flex-col items-center w-full mt-3 mb-16">
          <img className="max-w-[280px]" src={ErrorImage} alt="" />
          <span className="text-[2.25rem] font-semibold leading-[140%] text-brand">
            ERROR!
          </span>
          <span className="text-xl font-medium leading-[140%] text-blue-600 text-center">
            요청하신 내용을 찾을 수 없습니다.
            <br />
            검색어를 다시 확인해주세요.
          </span>
        </div>
      )}
    </Modal>
  );
}
