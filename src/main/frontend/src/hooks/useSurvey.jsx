import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useErrorHandler } from "react-error-boundary";
import { getApi } from "../api/api";

export default function useSurvey() {
  const queryClient = useQueryClient();
  const handleError = useErrorHandler();
  const [error, setError] = useState(null);

  const addSurvey = useMutation((params) => getApi("survey", params), {
    onSuccess: () => {
      queryClient.invalidateQueries("survey");
    },
    onError: (e) => {
      setError(e);
    },
  });

  useEffect(() => {
    if (error) {
      handleError(error);
    }
  }, [error]);
  console.log("=======> useSurvey.jsx");

  return { addSurvey };
}
