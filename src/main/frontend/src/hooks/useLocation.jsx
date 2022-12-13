import { useQuery } from "@tanstack/react-query";
import { setLocation } from "../api/api";

export default function useLocation(location) {
  const locationQuery = useQuery(
    ["location", location],
    () => setLocation(location),
    {
      staleTime: 1000 * 60 * 5,
      // staleTime: Infinity,
    }
  );

  console.log("=======> useLocation.jsx");

  return { locationQuery };
}
