import React, { useState } from "react";
import letter from "../../../assets/imgs/icon/letter.png";
import SurveyModal from "../../Modal/SurveyModal";
import useSurvey from "../../../hooks/useSurvey";

export default function Survey() {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: addSurvey } = useSurvey();

  return (
    <>
      <div className="absolute bottom-0 w-full max-w-1280">
        <div className="fixed bottom-[60px] flex flex-col items-end w-full max-w-1280 pointer-events-none">
          <button
            className="flex justify-center items-center w-[60px] h-[60px] mr-4 bg-brand rounded-full cursor-pointer pointer-events-auto global-shadow md:w-[80px] md:h-[80px] lg:w-[100px] lg:h-[100px]"
            onClick={() => setIsOpen(true)}
          >
            <img
              className="w-[56px] h-[56px] md:w-[76px] md:h-[76px] lg:w-[90px] lg:h-[90px]"
              src={letter}
              alt="letter"
            />
          </button>
        </div>
      </div>
      {isOpen && (
        <SurveyModal
          onCloseModal={() => setIsOpen(false)}
          custom="true"
          position="middle"
          styles="w-full px-5 md:w-[648px] md:px-0 global-shadow"
          addSurvey={addSurvey}
        />
      )}
    </>
  );
}
