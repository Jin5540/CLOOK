import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Icon({ icon, styles }) {
  return <FontAwesomeIcon icon={icon} className={styles} />;
}
