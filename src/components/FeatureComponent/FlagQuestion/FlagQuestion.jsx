import React, { useContext, useEffect, useRef, useState } from "react";

import styles from "../Mathzone/component/OnlineQuiz.module.css";
import FlagQuestionContextProvider, {
  FlagQuestionContext,
} from "./ContextProvider/FlagQuestionContextProvider";
import FlagQuestionPagination from "./FlagQuestionPagination/FlagQuestionPagination";
import { fetchFlagQuestion, markAsResolvedFlagQuestion } from "../../../api";
import QuizPageLayout from "../Mathzone/QuizPageLayout/QuizPageLayout";
import QuizWhitePage from "../Mathzone/QuizPageLayout/QuizWhitepage";
import { TeacherQuizDisplay } from "../Mathzone/MainOnlineQuiz/MainOnlineQuizPage";
import handleResizeWidth from "../Mathzone/handleResizeWidth";
import MathzoneWhiteBoard from "../Mathzone/MathzoneWhiteBoard";
import { MISCELLANEOUS } from "../../../constants";
import { useSelector } from "react-redux";

const FlagQuestionViewer = (props) => {
  const { currentSelectedRouter, currentSelectedKey, activeTabArray } =
    useSelector((state) => state.activeTabReducer);
  const [data, setData] = useState([]);
  const heightRef = useRef();
  const [currentHeight, setCurrentHeight] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const {
    updateTotalQuestionReview,
    currentQuestionReview,
    totalReviewResult,
    handlePaginationRevieResult,
    questionDemount,
  } = useContext(FlagQuestionContext);
  const fetchData = async (conceptId, liveClassId, tagId) => {
    try {
      setLoading(true);
      const { data } = await fetchFlagQuestion(conceptId, liveClassId, tagId);
      setLoading(false);
      // console.log(data);
      if (data?.status) {
        setData(data?.result_data || []);
        updateTotalQuestionReview(data?.result_data?.length || 0);
        return data?.result_data || [];
      } else {
        setData([]);
        // typeof props?.fetchFlaggedQuestionList === "function" &&
        // props.fetchFlaggedQuestionList();
      }
      return [];
    } catch (e) {
      setData([]);
      setLoading(false);
      // console.log(e);
      // typeof props?.fetchFlaggedQuestionList === "function" &&
      //   props.fetchFlaggedQuestionList();
      return [];
    }
  };
  useEffect(() => {
    if (props?.identity === "tutor")
      fetchData(props?.conceptId, props?.liveClassId, props?.flagTagId);

    return () => {};
  }, []);
  useEffect;
  const studentFetchingDatas = async () => {
    // console.log("calling");
    await fetchData(props?.conceptId, props?.liveClassId, props?.flagTagId);

    // handlePaginationRevieResult(props?.currentFlagQuestion);
  };
  useEffect(() => {
    // console.log(props?.isFetchAgain);
    if (props.identity !== "tutor" && props?.isFetchAgain) {
      studentFetchingDatas();
    }
  }, [props?.currentFetchTime]);

  const handleMarkAsCompleted = async () => {
    try {
      setLoading(true);
      let flagged_question_id =
        data[currentQuestionReview]?.flagged_question_id;
      // console.log(flagged_question_id);
      await markAsResolvedFlagQuestion(
        flagged_question_id,
        props?.currentUserId
      );
      let datas = await fetchData(
        props?.conceptId,
        props?.liveClassId,
        props?.flagTagId
      );
      // console.log(datas);
      if (datas?.length <= currentQuestionReview) {
        handlePaginationRevieResult(datas?.length - 1 || 0);
      } else {
        handlePaginationRevieResult(currentQuestionReview);
      }
      // console.log(props?.handleFlagQuestionChange == "function");
      typeof props?.handleFlagQuestionChange == "function" &&
        props?.handleFlagQuestionChange(
          datas?.length <= currentQuestionReview
            ? datas?.length - 1 || 0
            : currentQuestionReview,
          true
        );
      setLoading(false);
    } catch (e) {
      // console.log(e);
      setLoading(false);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      handleResizeWidth(heightRef.current, setCurrentHeight);
    }, 1000);
    window.addEventListener("resize", () => {
      setTimeout(() => {
        handleResizeWidth(heightRef.current, setCurrentHeight);
      }, 500);
    });
    return () => {
      window.removeEventListener("resize", () => {
        setTimeout(() => {
          handleResizeWidth(heightRef.current, setCurrentHeight);
        }, 500);
      });
    };
  }, []);
  return (
    <>
      <div
        className={`${styles.mainPage} h-full w-full m-0`}
        style={{ margin: 0, padding: 0, width: "100%" }}
      >
        <div
          style={{
            width: "100%",
            padding: 0,
            margin: 0,
            height: "fit-content",
          }}
          ref={heightRef}
        >
          {props?.identity === "tutor" && data?.length > 0 && (
            <div
              className={styles.paginationContainer}
              style={{ marginTop: 5 }}
            >
              {totalReviewResult ? (
                <FlagQuestionPagination
                  handleFlagQuestionChange={props?.handleFlagQuestionChange}
                  currentSelectedRouter={currentSelectedRouter}
                  currentSelectedKey={currentSelectedKey}
                />
              ) : (
                ""
              )}
            </div>
          )}
          {!props?.obj?.quiz_completed && (
            <div
              className={`flex bg-ffffff ${
                true ? "justify-between " : "justify-between "
              } px-4 py-2 items-center`}
            >
              {data?.length > 0 && (
                <div className={styles.mathZoneQuestionNo}>
                  Q.{" "}
                  {(props?.identity === "tutor"
                    ? currentQuestionReview
                    : props?.currentQuestion) + 1}{" "}
                  of {totalReviewResult}
                </div>
              )}
              <div className={styles.mathZonetitle}>
                {props?.conceptName || "Addition"}&nbsp; - &nbsp;
                {props?.flagTagName || ""}{" "}
              </div>
              {props?.identity === "tutor" && !loading && data?.length > 0 ? (
                <div
                  className={styles.nextBtnContainer}
                  style={{ width: "180px" }}
                >
                  <button
                    id="ooooooo"
                    className={styles.NextButton}
                    style={{ width: "180px" }}
                    onClick={handleMarkAsCompleted}
                  >
                    Mark as resolved
                  </button>
                </div>
              ) : (
                <div style={{ visibility: "hidden" }}>no</div>
              )}
            </div>
          )}
        </div>
        <QuizPageLayout height={currentHeight}>
          <div
            className={`h-full w-full absolute top-0 left-12
             z-1`}
            style={{ height: "100%" }}
          >
            <MathzoneWhiteBoard
              dataTrack={MISCELLANEOUS.miscellaneousDataWhiteBoard}
              currentSelectedKey={currentSelectedKey}
              currentSelectedRouter={currentSelectedRouter}
            />
          </div>
          <div
            style={{
              position: "relative",
              margin: "0 auto",
              width: "calc(100% - 160px)",
              maxHeight: `calc(100% - ${"tutor" ? 0 : 0}px)`,
              minHeight: `calc(100% - ${"tutor" ? 0 : 0}px)`,
            }}
          >
            {!showSolution && props?.identity !== "tutor" && data.length && (
              <div
                style={{
                  width: "calc(100% - 40px)",
                  margin: "auto",
                }}
              >
                <button
                  className={styles.checkButton2}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: 180,
                  }}
                  onClick={() => setShowSolution(true)}
                >
                  Show Solution
                </button>
              </div>
            )}
            <QuizWhitePage
              style={{
                clear: "both",
                width: "100%",
                minHeight: `calc(100% - ${
                  props?.identity === "tutor" || showSolution ? 0 : 40
                }px)`,
                maxHeight: "100%",
              }}
            >
              {props?.identity === "tutor" && (
                <div
                  style={{ position: "relative", marginBottom: 26 }}
                  className={styles.closeButton}
                >
                  <div
                    style={{
                      position: "absolute",
                      right: 0,
                      cursor: "pointer",
                    }}
                  >
                    <a onClick={props.handleCloseQuestion}>Close</a>
                  </div>
                </div>
              )}
              {questionDemount ? (
                <>
                  {(() => {
                    let currentIndex = 0;
                    currentIndex =
                      props?.identity == "tutor"
                        ? currentQuestionReview
                        : props?.currentQuestion;
                    return (
                      data[currentIndex] && (
                        <TeacherQuizDisplay
                          obj={data[currentIndex]}
                          showSolution={
                            props?.identity === "tutor" ? true : showSolution
                          }
                        />
                      )
                    );
                  })()}
                </>
              ) : (
                <h1>Loading...</h1>
              )}
            </QuizWhitePage>
          </div>
        </QuizPageLayout>
      </div>
    </>
  );
};
export default function FlagQuestion(props) {
  return (
    <>
      <FlagQuestionContextProvider>
        <FlagQuestionViewer {...props} />
      </FlagQuestionContextProvider>
    </>
  );
}
