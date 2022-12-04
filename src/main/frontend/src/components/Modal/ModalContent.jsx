import React, { useState } from "react";
import Search from "../Search/Search";
import SearchList from "../Search/SearchList";
import Modal from "../Shared/Modal/Modal";
import useSearch from "../../hooks/useSearch";

export default function ModalContent({ onCloseModal, setLocation }) {
  const [keyword, setKeyword] = useState("");
  const { searchQuery } = useSearch(keyword);
  const { refetch, data } = searchQuery;

  return (
    <Modal onCloseModal={onCloseModal}>
      <Search setKeyword={setKeyword} refetch={refetch} />
      <SearchList
        onCloseModal={onCloseModal}
        setLocation={setLocation}
        data={data}
      />
    </Modal>
  );
}
