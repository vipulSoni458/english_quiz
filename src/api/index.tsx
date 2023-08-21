import BaseUrl from "./ApiConfig.js";
import axios from "axios";

export const videoCallToken = async (user: Number, live_class_id: Number) => {
  return axios.get(BaseUrl + "app_students/video_call_token", {
    params: {
      user,
      live_class_id,
    },
  });
};

export const callTechSupport = async (
  user_id: Number,
  live_class_id: Number
) => {
  axios.get(BaseUrl + "app_students/create_tech_support", {
    params: {
      user_id,
      live_class_id,
    },
  });
};
export const getLessonAndMathZoneConceptDetails = (prop: {
  live_class_id: String;
}) => {
  return axios.get(BaseUrl + "app_students/concept_list", {
    params: {
      ...prop,
    },
  });
};
export const startPracticeMathzone = (params: {
  live_class_id: Number;
  sub_concept_id: Number;
  tag_id: Number;
  level: Number;
}) => {
  return axios.get(BaseUrl + "app_teachers/start_practice", {
    params: { ...params },
  });
};
export const handleUpdateNextQuestion = (params: {
  live_class_id: Number;
  sub_concept_id: Number;
  tag_id: Number;
  level: Number;
}) => {
  return axios.get(BaseUrl + "app_teachers/next_question", {
    params: { ...params },
  });
};

export const StudentResultMathZone = async (params: Object) => {
  return axios.get(BaseUrl + "app_teachers/result", {
    params: { ...params },
  });
};
export const getReviewResultData = async (params: Object) => {
  return axios(BaseUrl + "app_teachers/review_result", {
    params: { ...params },
  });
};

export const viewQuestionStatusApi = async (practiceId: Number) => {
  return axios(
    `${BaseUrl}app_teachers/view_questions?live_class_practice_id=${practiceId}`
  );
};

export const StudentAnswerResponse = async (params: String, data: Object) => {
  let config = {
    method: "post",
    url: `${BaseUrl}app_teachers/save_practice${params}`,
    data: data,
  };
  return axios(config);
};
