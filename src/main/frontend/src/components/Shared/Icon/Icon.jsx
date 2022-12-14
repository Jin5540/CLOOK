import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Icon({ icon, size }) {
  return <FontAwesomeIcon icon={icon} style={{ fontSize: size }} />;
}
