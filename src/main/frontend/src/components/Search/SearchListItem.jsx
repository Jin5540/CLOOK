import React from "react";
import * as formatUtil from "../../util/formatUtil";

export default function SearchListItem({
  index,
  item,
  regionArr,
  handleClick,
}) {
  return (
    <li
      className="px-4 py-[10px] text-base font-medium leading-140 text-brand bg-transparent rounded-3xl cursor-pointer hover:bg-sub-brand active:bg-sub-brand md:text-lg xl:text-xl"
      data-region={regionArr[index]}
      onClick={handleClick}
    >
      {formatUtil.stateOrCityFormat(item)}
    </li>
  );
}
