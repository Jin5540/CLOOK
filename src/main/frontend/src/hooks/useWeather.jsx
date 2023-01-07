import { useEffect, useState } from "react";
import { useQueries } from "@tanstack/react-query";
import { getApi } from "../api/api";
import { useErrorHandler } from "react-error-boundary";
import { useLocationContext } from "../contexts/LocationContext";

export default function useWeather(apis, params) {
  const { location } = useLocationContext();
  const handleError = useErrorHandler();
  const [error, setError] = useState(null);

  const queryResults = useQueries({
    queries: apis.map((api) => {
      if (api) {
        return {
          queryKey: [api, location],
          queryFn: () => getApi(api, params),
          staleTime: 1000 * 60 * 5,
          onError: (e) => {
            setError(e);
          },
        };
      }
    }),
  });

  useEffect(() => {
    if (error) {
      handleError(error);
    }
  }, [error]);
  console.log("=======> useWeather.jsx");

  return queryResults;
}
