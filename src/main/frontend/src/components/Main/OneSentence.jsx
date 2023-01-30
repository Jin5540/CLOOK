import React from "react";
import Card from "../Shared/Card/Card";
import Icon from "../Shared/Icon/Icon";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import * as formatUtil from "../../util/formatUtil";

export default function OneSentence({ msg }) {
  return (
    <Card styles="relative flex items-center justify-center w-full min-h-[80px] py-[10px]">
      <div className="absolute top-1/2 left-10 -translate-y-2/4">
        <Icon icon={faBell} styles="text-xl md:text-2xl lg:text-3xl" />
      </div>
      <div className="flex justify-center items-center w-full h-full ml-[80px] mr-[60px]">
        <span className="text-base font-medium leading-140 text-brand md:text-xl lg:text-[1.375rem] xl:text-2xl">
          {/* 3시간 내 진눈깨비, 오후 12시에 눈, 내일 오전 0시에 비
                        소식이 있어요. */}
          {/* 3시간 내 눈·비·바람, 오후 12시에 눈, 내일 오전 2시에 진눈깨비 소식이 있어요. (오후6시, 내일 오전 0시, 내일 오전 1시 패스) */}
          {formatUtil.sentenceFormat(msg)}
        </span>
      </div>
    </Card>
  );
}
