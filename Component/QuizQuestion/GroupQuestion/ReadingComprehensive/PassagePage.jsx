import React, { useContext, useRef, useState } from "react";
import Page from "./Page";
import styles from "../../english_mathzone.module.css";
import { GroupQuestionContext } from "../ContextProvider/GroupContextProvider";
import NotificationModal from "./NotificationModal";
import LeftArrow from "../../../assets/Images/Svg/LeftArrow";
import RightArrow from "../../../assets/Images/Svg/RightArrow";
export default function PassagePage({ groupData }) {
  const { handleShowQuestion } = useContext(GroupQuestionContext);
  const [currentPage, setCurrentPage] = useState(0);
  const handleChangePage = (val) => {
    setCurrentPage(currentPage + val);
  };
  const leftArrowBtn = useRef(null);
  const rightArrowBtn = useRef(null);
  window.leftArrowBtn = leftArrowBtn.current;
  window.rightArrowBtn = rightArrowBtn.current
  const [hideNotification,setHideNotification]=useState(false)
  return (
    <div
      style={{
        height: "100%",

        width: "fit-content",
        margin: "auto",
      }}
    >
      {!hideNotification&&<NotificationModal onClose={setHideNotification}/>}
     {hideNotification&& <>
        <Page passage={groupData[currentPage] || []} />
        {currentPage > 0 && (
          <button
            onClick={() => handleChangePage(-1)}
            className={`${styles.reading_comprehensive_btn} ${styles.prev_btn} react_passage_change_page_change_btn react_passage_left_btn`}
            style={{ background: "initial", border: 0, cursor: "pointer" }}
            ref={leftArrowBtn}
          >
            <LeftArrow />
          </button>
        )}
        {currentPage + 1 < groupData.length ? (
          <button
            onClick={() => handleChangePage(+1)}
            className={`${styles.reading_comprehensive_btn} ${styles.next_btn} react_passage_change_page_change_btn react_passage_right_btn`}
            ref={rightArrowBtn}
          >
            <RightArrow />
          </button>
        ) : (
          <button
            className={`${styles.reading_comprehensive_btn} ${styles.next_btn} react_passage_change_page_change_btn react_passage_right_btn`}
            onClick={handleShowQuestion}
            ref={rightArrowBtn}
          >
            <RightArrow />
          </button>
        )}
      </>}
    </div>
  );
}
