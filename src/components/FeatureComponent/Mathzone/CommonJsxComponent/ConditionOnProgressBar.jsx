import React, { useContext } from "react";
import { ValidationContext } from "../MainOnlineQuiz/MainOnlineQuizPage";
import { ProgressBorder } from "../Modal2/modal2";

export default function ConditionOnProgressBar({ meter }) {
  const { isStudentAnswerResponse, isProgressBarVisible } =
    useContext(ValidationContext);
  return (
    <>
      {!isStudentAnswerResponse ? (
        isProgressBarVisible ? (
          <ProgressBorder meter={meter + 1}>
            <div></div>
          </ProgressBorder>
        ) : (
          ""
        )
      ) : (
        <div style={{ marginTop: "1.5rem" }}></div>
      )}
    </>
  );
}
