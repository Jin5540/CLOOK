import React from "react";
import Modal from "../Shared/Modal/Modal";
import Icon from "../Shared/Icon/Icon";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export default function DataGuideModal({
  onCloseModal,
  custom,
  bgType,
  position,
  styles,
}) {
  return (
    <Modal
      onCloseModal={onCloseModal}
      custom={custom}
      bgType={bgType}
      position={position}
      styles={styles}
    >
      <div className="flex flex-col justify-center items-center pl-[1.875rem] pr-3 pt-2 pb-10 bg-brand rounded-default">
        <div
          className="flex justify-end w-full text-white cursor-pointer"
          onClick={onCloseModal}
        >
          <Icon icon={faTimes} size="1.563rem" />
        </div>
        <div className="w-[40.688rem] text-white m-0 p-0 mr-[0.5rem] bg-brand rounded-default">
          <span className="flex text-xl font-semibold leading-6 mb-3">
            데이터 오류 가능성
          </span>
          <p className="text-[0.938rem] font-normal leading-[1.563rem]">
            클룩에 보이는 정보는 현재 상황과 다를 수 있어요. 검색한 읍면동
            기준으로 정보가 없을 경우 근접 지역의 정보를 보여주고 있어요.
            미세먼지, 초미세먼지는 한국환경공단에서 제공하는 ‘인증받지 않은
            실시간 자료’이므로, 자료 오류 및 표출방식에 따라 실제 값과 다르게
            표기될 수 있어요.
          </p>
        </div>
      </div>
    </Modal>
  );
}
