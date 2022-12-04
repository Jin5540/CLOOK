import { useQuery } from "@tanstack/react-query";
import { getToptm, getTopspt } from "../api/weatherApi";

export default function useWeather() {
  const toptmQuery = useQuery(["toptm"], () => getToptm(), {
    staleTime: 1000 * 60 * 60,
    // enabled: locationQuery.isSuccess,
  });

  const topsptQuery = useQuery(["topspt"], () => getTopspt(), {
    staleTime: 1000 * 60 * 60,
    // enabled: locationQuery.isSuccess,
  });

  // let isSuccessAll = toptmQuery.isSuccess && topsptQuery.isSuccess;
  // let errorAll = toptmQuery.isError || topsptQuery.isError;
  let isLoadingToptm = toptmQuery.isLoading;
  let isLoadingTopspt = topsptQuery.isLoading;

  return { toptmQuery, topsptQuery, isLoadingToptm, isLoadingTopspt };
}
