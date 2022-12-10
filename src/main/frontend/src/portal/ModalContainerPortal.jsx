import React from "react";
import { createPortal } from "react-dom";

export default function ModalContainerPortal({ children }) {
  return createPortal(<>{children}</>, document.querySelector("#modal-root"));
}
