import React, { useEffect, useRef } from "react";
import useModalOutSideClick from "../../../hooks/useModalOutSideClick";
import ModalContainerPortal from "../../../portal/ModalContainerPortal";

export default function Modal({
  onCloseModal,
  custom,
  bgType,
  position,
  styles,
  outSideClickDisabled,
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
    position === "top"
      ? "modal-wrapper-top top-[8.5rem] md:top-[6.5rem]"
      : "modal-wrapper-middle";
  const overlayStyle = bgType
    ? "modal-overlay"
    : "modal-overlay bg-transparent";

  return (
    <ModalContainerPortal>
      <div className={overlayStyle}>
        <div className={`${positionStyle} ${styles ? styles : ""}`}>
          <div
            className="modal-inner m-0 p-0"
            ref={outSideClickDisabled ? null : modalRef}
          >
            {!custom && <div className="modal-content">{children}</div>}
            {custom && <>{children}</>}
          </div>
        </div>
      </div>
    </ModalContainerPortal>
  );
}
