import React, { useState } from "react";
import { faLocationDot, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useLocationContext } from "../../contexts/LocationContext";
import Card from "../Shared/Card/Card";
import Icon from "../Shared/Icon/Icon";
import ModalContent from "../Modal/ModalContent";

export default function Locationbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { location } = useLocationContext();

  return (
    <>
      <Card
        selected={isOpen && "selected"}
        onClick={() => setIsOpen(true)}
        styles="w-[23.625rem] justify-between"
      >
        <Icon icon={faLocationDot} size="1.125rem" />
        <div className="text-xl font-semibold">{location}</div>
        <Icon icon={faAngleDown} size="1.125rem" />
      </Card>
      {isOpen && <ModalContent onCloseModal={() => setIsOpen(false)} />}
    </>
  );
}
