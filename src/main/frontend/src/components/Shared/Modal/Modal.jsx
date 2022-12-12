import React, { useEffect, useRef } from "react";
import useModalOutSideClick from "../../../hooks/useModalOutSideClick";
import ModalContainerPortal from "../../../portal/ModalContainerPortal";

export default function Modal({ onCloseModal, children }) {
  const modalRef = useRef(null);

  const handleClose = () => {
    if (onCloseModal === undefined || onCloseModal === null) return;
    onCloseModal();
  };
  useModalOutSideClick(modalRef, handleClose);

  useEffect(() => {
    const body = document.querySelector("body");
    body.style.overflow = "hidden";
    return () => (body.style.overflow = "auto");
  }, []);

  return (
    <ModalContainerPortal>
      <div className="modal-overlay">
        <div className="modal-wrapper modal-shadow">
          <div className="modal-inner" ref={modalRef}>
            <div className="modal-content">{children}</div>
          </div>
        </div>
      </div>
    </ModalContainerPortal>
  );
}
