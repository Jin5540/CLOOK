import React, { useEffect, useRef } from "react";
import useModalOutSideClick from "../../../hooks/useModalOutSideClick";
import ModalContainerPortal from "../../../portal/ModalContainerPortal";

export default function Modal({
  onCloseModal,
  custom,
  bgType,
  position,
  styles,
  children,
}) {
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

  const positionStyle =
    position === "top" ? "modal-wrapper-top" : "modal-wrapper-middle";

  return (
    <ModalContainerPortal>
      <div className={`modal-overlay ${!bgType && "bg-transparent"}`}>
        <div
          className={`${position && positionStyle} ${
            styles && styles
          } global-shadow`}
        >
          <div className="modal-inner" ref={modalRef}>
            {!custom && <div className="modal-content">{children}</div>}
            {custom && <>{children}</>}
          </div>
        </div>
      </div>
    </ModalContainerPortal>
  );
}
