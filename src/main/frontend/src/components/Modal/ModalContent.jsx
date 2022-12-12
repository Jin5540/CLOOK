import { useState } from "react";
import Search from "../Search/Search";
import SearchList from "../Search/SearchList";
import Modal from "../Shared/Modal/Modal";
import useSearch from "../../hooks/useSearch";
import { useEffect } from "react";

export default function ModalContent({ onCloseModal }) {
  const [keyword, setKeyword] = useState("");
  const { searchQuery } = useSearch(keyword);
  const { isError, refetch, data: dataList } = searchQuery;

  useEffect(() => {
    if (!keyword) return;
    refetch();
  }, [keyword]);

  return (
    <Modal onCloseModal={onCloseModal}>
      <Search keyword={keyword} setKeyword={setKeyword} refetch={refetch} />
      {!isError && keyword && (
        <SearchList onCloseModal={onCloseModal} data={dataList} />
      )}
    </Modal>
  );
}
