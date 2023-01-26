import React from "react";
import Modal from "../Shared/Modal/Modal";
import SearchContainer from "../Search/SearchContainer";

export default function SearchModal({
  onCloseModal,
  bgType,
  position,
  styles,
}) {
  return (
    <Modal
      onCloseModal={onCloseModal}
      bgType={bgType}
      position={position}
      styles={styles}
    >
      <SearchContainer onCloseModal={onCloseModal} />
    </Modal>
  );
}
