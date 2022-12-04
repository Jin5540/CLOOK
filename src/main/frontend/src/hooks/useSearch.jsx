import { useQuery } from "@tanstack/react-query";
import { getSearchList } from "../api/weatherApi";

export default function useWeather(keyword) {
  const searchQuery = useQuery(["search"], () => getSearchList(keyword), {
    staleTime: 1000 * 60 * 60,
    enabled: false,
    // enabled: !!locationQuery.isSuccess,
  });

  return { searchQuery };
}
