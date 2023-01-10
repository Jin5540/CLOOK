import { useQuery } from "@tanstack/react-query";
import { getApi } from "../api/api";

export default function useSearch(keyword) {
  const searchQuery = useQuery(
    ["search", keyword],
    () => getApi("search", keyword),
    {
      staleTime: 1000 * 60 * 5,
      enabled: false,
      useErrorBoundary: true,
    }
  );

  console.log("=======> useSearch.jsx");
  return { searchQuery };
}
