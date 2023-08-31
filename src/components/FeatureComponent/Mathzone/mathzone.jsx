import React, { useRef, useState } from "react";
import MathzoneInner from "./MathzoneInner";
import { useParams } from "react-router";
import { PREPOSTTESTKEY } from "../../../constants";
import PrePostTestInner from "../PrePostTest/PrePostTestInner";
export const ViewStatusContext = React.createContext("Status Context");
function ViewStatusContextProvider({ children }) {
  const [reviewResultStatus, setReviewResultStatus] = useState(false);
  const [hideSolveButton, setHideSolveButton] = useState(false);
  const [hideProgressBorder, setHideProgressBorder] = useState(false);
  const [currentViewQuestion, setCurrentViewQuestion] = useState({});
  const whitePageRef = useRef(null);
  const handleHideProgressBorder = (val) => {
    setHideProgressBorder(val);
  };

  const handleCloseReviewResultStatus = () => {
    setReviewResultStatus(false);
  };
  const handleOpenReviewResultStatus = () => {
    setReviewResultStatus(true);
  };
  const [questionStatus, setQuestionStatus] = useState(false);
  const [currentIndex, setCurrentIndex] = useState({ index: -1, identity: "" });
  const [totalReviewResult, setTotalReviewResult] = useState(0);
  const [currentQuestionReview, setCurrentQuestionReview] = useState(0);
  const [questionDemount, setQuestionDemount] = useState(true);

  const updateTotalQuestionReview = (val) => {
    setTotalReviewResult(val);
  };
  const handleChangeQuestionReview = (val) => {
    setQuestionDemount(false);
    setCurrentQuestionReview(currentQuestionReview + val);
    let id = setTimeout(() => {
      clearTimeout(id);
      setQuestionDemount(true);
    }, 1);
  };
  const handleResponseCheck = (i, identity) => {
    setQuestionStatus(true);
    setQuestionDemount(false);
    setCurrentIndex({ index: i, identity: identity });
    setTimeout(() => {
      setQuestionDemount(true);
    }, 0);
  };
  const handleModalOff = (state) => {
    setQuestionStatus(false);
    setCurrentIndex({ index: -1, identity: "" });
  };
  const handleOpenCloseResponse = (status, index, question) => {
    setQuestionStatus(status);
    setCurrentIndex({ index, identity: "" });
    setCurrentViewQuestion({ ...question });
  };
  const [viewStatus, setViewStatus] = useState(false);
  const handleViewStatus = () => {
    setViewStatus(!viewStatus);
  };
  const [totalQuestion, setTotalQuestion] = useState(0);
  const handlePaginationRevieResult = (val) => {
    setQuestionDemount(false);
    setCurrentQuestionReview(val);
    let id = setTimeout(() => {
      clearTimeout(id);
      setQuestionDemount(true);
    }, 1);
  };
  const value = {
    viewStatus,
    setViewStatus,
    questionStatus,
    setQuestionStatus,
    handleResponseCheck,
    handleViewStatus,
    handleModalOff,
    currentIndex,
    totalQuestion,
    setTotalQuestion,
    handleChangeQuestionReview,
    updateTotalQuestionReview,
    totalReviewResult,
    currentQuestionReview,
    questionDemount,
    handlePaginationRevieResult,
    handleCloseReviewResultStatus,
    handleOpenReviewResultStatus,
    reviewResultStatus,
    handleHideProgressBorder,
    hideProgressBorder,
    setHideSolveButton,
    hideSolveButton,
    whitePageRef,
    setCurrentViewQuestion,
    currentViewQuestion,
    handleOpenCloseResponse,
  };
  return (
    <ViewStatusContext.Provider value={value}>
      {children}
    </ViewStatusContext.Provider>
  );
}
export default function mathzone() {
  const { concept, tag, level } = useParams();

  return (
    <React.Fragment key={`${concept}${tag}${level}`}>
      {tag === PREPOSTTESTKEY.preTest || tag === PREPOSTTESTKEY.postTest ? (
        <ViewStatusContextProvider>
          <PrePostTestInner />
        </ViewStatusContextProvider>
      ) : (
        <ViewStatusContextProvider>
          <MathzoneInner />
        </ViewStatusContextProvider>
      )}
    </React.Fragment>
  );
}
