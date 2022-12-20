import React from "react";
import * as formatUtil from "../../util/formatUtil";

export default function SearchListItem({ item, handleClick }) {
  return (
    <li
      className="my-1 px-4 py-2 text-xl leading-6 font-medium text-brand bg-transparent rounded-3xl cursor-pointer hover:bg-sub-brand"
      onClick={handleClick}
    >
      {formatUtil.stateOrCityFormat(item)}
    </li>
  );
}
