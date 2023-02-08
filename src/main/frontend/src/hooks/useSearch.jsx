import { useQuery } from "@tanstack/react-query";
import { getApi } from "../api/api";

export default function useSearch(keyword) {
  const searchQuery = useQuery(
    ["search", keyword],
    () => getApi("search", keyword),
    {
      staleTime: 0,
      enabled: false,
      useErrorBoundary: false,
      retry: 0,
    }
  );

  console.log("=======> useSearch.jsx");
  return { searchQuery };
}
