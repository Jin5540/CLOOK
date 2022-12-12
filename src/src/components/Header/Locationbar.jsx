import React from "react";
import { faLocationDot, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import Card from "../Shared/Card/Card";
import Icon from "../Shared/Icon/Icon";

export default function Locationbar({ location, isOpen, onOpenModal }) {
  return (
    <>
      <Card
        selected={isOpen && "selected"}
        onClick={onOpenModal}
        styles="w-[23.625rem] justify-between"
      >
        <Icon icon={faLocationDot} size="1.125rem" />
        <div className="text-xl font-semibold">{location}</div>
        <Icon icon={faAngleDown} size="1.125rem" />
      </Card>
    </>
  );
}
