import { useQuery } from "@tanstack/react-query";
import { getApi } from "../api/api";

export default function useLocation(location) {
  const locationQuery = useQuery(
    ["location", location],
    () => getApi("location", location),
    {
      staleTime: 0,
    }
  );

  console.log("=======> useLocation.jsx");

  return { locationQuery };
}
