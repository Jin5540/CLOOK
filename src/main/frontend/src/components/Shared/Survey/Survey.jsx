import React, { useState } from "react";
import letter from "../../../assets/imgs/icon/letter.png";
import SurveyModal from "../../Modal/SurveyModal";
import useSurvey from "../../../hooks/useSurvey";

export default function Survey() {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: addSurvey } = useSurvey();

  return (
    <>
      <div className="absolute bottom-0 w-full max-w-[79rem]">
        <div className="fixed bottom-[60px] flex flex-col items-end w-full max-w-[79rem] pointer-events-none">
          <button
            className="flex justify-center items-center w-[100px] h-[100px] mt-5 mr-4 bg-brand rounded-full cursor-pointer pointer-events-auto global-shadow"
            onClick={() => setIsOpen(true)}
          >
            <img className="w-[90px] h-[90px]" src={letter} alt="letter" />
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
