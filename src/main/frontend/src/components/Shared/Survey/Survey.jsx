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
        <div className="fixed bottom-[3.75rem] flex flex-col items-end w-full max-w-1280 pointer-events-none">
          <button
            className="flex justify-center items-center w-[3.75rem] h-[3.75rem] mr-4 bg-brand rounded-full cursor-pointer pointer-events-auto global-shadow md:w-[5rem] md:h-[5rem] lg:w-[6.25rem] lg:h-[6.25rem]"
            onClick={() => setIsOpen(true)}
          >
            <img
              className="w-[3.5rem] h-[3.5rem] md:w-[4.75rem] md:h-[4.75rem] lg:w-[5.625rem] lg:h-[5.625rem]"
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
          styles="w-[90%] md:w-[40.5rem] global-shadow"
          addSurvey={addSurvey}
        />
      )}
    </>
  );
}
