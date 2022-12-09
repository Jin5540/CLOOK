import { useQuery } from "@tanstack/react-query";
import { getSearchList } from "../api/api";

export default function useSearch(keyword) {
  const searchQuery = useQuery(["search"], () => getSearchList(keyword), {
    staleTime: 1000 * 60 * 5,
    enabled: false,
  });

  console.log("=======> useSearch.jsx");
  return { searchQuery };
}
