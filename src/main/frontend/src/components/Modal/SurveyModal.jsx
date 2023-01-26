import React, { useEffect, useState } from "react";
import Modal from "../Shared/Modal/Modal";
import ScoreCard from "../Shared/Survey/ScoreCard";
import OpinionCard from "../Shared/Survey/OpinionCard";
import MsgCard from "../Shared/Survey/MsgCard";

export default function SurveyModal({
  onCloseModal,
  custom,
  position,
  styles,
  addSurvey,
}) {
  const [data, setData] = useState({ num: -1, comment: "" });
  const [scoreCardShow, setScoreCardShow] = useState(true);
  const [opinionCardShow, setOpinionCardShow] = useState(false);
  const [msgCardShow, setMsgCardShow] = useState(false);

  const handleSubmit = () => {
    setOpinionCardShow(false);
    setMsgCardShow(true);

    addSurvey(data);
  };

  useEffect(() => {
    if (data.num > -1) handleSubmit();
  }, [data.comment]);

  return (
    <Modal
      onCloseModal={onCloseModal}
      custom={custom}
      position={position}
      styles={styles}
      outSideClickDisabled={true}
    >
      {scoreCardShow && (
        <ScoreCard
          onCloseModal={onCloseModal}
          setData={setData}
          setScoreCardShow={setScoreCardShow}
          setOpinionCardShow={setOpinionCardShow}
        />
      )}
      {opinionCardShow && (
        <OpinionCard setData={setData} handleSubmit={handleSubmit} />
      )}
      {msgCardShow && (
        <MsgCard
          onCloseModal={onCloseModal}
          msgCardShow={msgCardShow}
          setMsgCardShow={setMsgCardShow}
        />
      )}
    </Modal>
  );
}
