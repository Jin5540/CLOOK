import { useQuery } from "@tanstack/react-query";
import { setLocation } from "../api/weatherApi";

export default function useWeather(address) {
  const locationQuery = useQuery(["location"], () => setLocation(address), {
    staleTime: 1000 * 60 * 60,
    // staleTime: Infinity,
  });

  return { locationQuery };
}
