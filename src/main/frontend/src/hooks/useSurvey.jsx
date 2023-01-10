import React from "react";
import { useMutation } from "@tanstack/react-query";
import { getApi } from "../api/api";

export default function useSurvey() {
  const addSurvey = useMutation((params) => getApi("survey", params), {
    useErrorBoundary: false,
    onError: (e) =>
      console.error(
        `useSurvey Error! code: ${e.response?.status} / message: ${e.response?.statusText}`
      ),
  });

  console.log("=======> useSurvey.jsx");

  return addSurvey;
}
