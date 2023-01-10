import React, { useState } from "react";
import { faLocationDot, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useLocationContext } from "../../contexts/LocationContext";
import Card from "../Shared/Card/Card";
import Icon from "../Shared/Icon/Icon";
import SearchModal from "../Modal/SearchModal";

export default function Locationbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { location } = useLocationContext();

  return (
    <>
      <Card
        styles="flex items-center justify-between w-[23.625rem] h-[3.75rem] px-6 cursor-pointer"
        selected={isOpen && "selected"}
        onClick={() => setIsOpen(true)}
      >
        <Icon icon={faLocationDot} size="1.563rem" />
        <div className="text-xl font-semibold">{location}</div>
        <Icon icon={faAngleDown} size="1.125rem" />
      </Card>
      {isOpen && (
        <SearchModal
          onCloseModal={() => setIsOpen(false)}
          bgType="true"
          position="top"
          styles="w-[40.625rem]"
        />
      )}
    </>
  );
}
