import { useQuery } from "@tanstack/react-query";
import { getApi } from "../api/api";

export default function useSearch(keyword) {
  const searchQuery = useQuery(
    ["search", keyword],
    () => getApi("search", keyword),
    {
      // staleTime: 1000 * 60 * 5,
      staleTime: 0,
      enabled: false,
      useErrorBoundary: false,
    }
  );

  console.log("=======> useSearch.jsx");
  return { searchQuery };
}
