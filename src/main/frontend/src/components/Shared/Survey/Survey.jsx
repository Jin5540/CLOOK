import React, { useState } from "react";
import letter from "../../../assets/imgs/icon/letter.png";
import SurveyModal from "../../Modal/SurveyModal";
import useSurvey from "../../../hooks/useSurvey";

export default function Survey() {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: addSurvey } = useSurvey();

  return (
    <>
      <div className="absolute bottom-0 w-full max-w-[76rem]">
        <div className="fixed bottom-[60px] flex flex-col items-end w-full max-w-[76rem] pointer-events-none">
          <button
            className="w-[100px] h-[100px] mt-5 bg-brand rounded-full cursor-pointer pointer-events-auto global-shadow"
            onClick={() => setIsOpen(true)}
          >
            <img src={letter} alt="" />
          </button>
        </div>
      </div>
      {isOpen && (
        <SurveyModal
          onCloseModal={() => setIsOpen(false)}
          custom="true"
          position="middle"
          styles="w-[648px]"
          addSurvey={addSurvey}
        />
      )}
    </>
  );
}
