import React, { useContext, useEffect } from "react";
import styles from "./Solution.module.css";
import QuestionTypeResponse, {
  SolutionForDragDrop,
  SolutionForReordering,
} from "./utility/QuestionTypeResponse";
import { ValidationContext } from "../QuizPage";
export default function ConditionalCorrectIncorrect({ obj, question_type }) {
  let reordering = ["Horizontal Ordering", "Vertical Ordering"];
  let dragDrop=["Math the Following"]
  const { setDisabledQuestion } = useContext(ValidationContext);
  const writingGpt = ["Writing ChatGpt"];
  useEffect(() => {
    setDisabledQuestion(true);
  }, []);
  return (
    <div className={styles.correctAnswerBox}>
      {reordering.includes(question_type) ? (
        <SolutionForReordering obj={obj} question_type={question_type} />
      ) : writingGpt?.includes(question_type) ? (
        ""
      ) : dragDrop.includes(question_type)?<SolutionForDragDrop obj={obj} question_type={question_type}/>:(
        <div className={`${styles.correctAnswer} ${styles.correctAnswer2}`}>
          <h6>The correct answer is:</h6>
          <QuestionTypeResponse question_type={question_type} obj={obj} />
        </div>
      )}
    </div>
  );
}
