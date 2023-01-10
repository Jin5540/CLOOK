import React from "react";
import Modal from "../Shared/Modal/Modal";
import SearchContainer from "../Search/SearchContainer";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import SectionError from "../Shared/Error/SectionError";

export default function SearchModal({ onCloseModal, bgType, position }) {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <Modal onCloseModal={onCloseModal} bgType={bgType} position={position}>
      <ErrorBoundary onReset={reset} FallbackComponent={SectionError}>
        <SearchContainer onCloseModal={onCloseModal} />
      </ErrorBoundary>
    </Modal>
  );
}
