import { useQueries } from "@tanstack/react-query";
import { getToptm, getTopspt } from "../api/weatherApi";

export default function useWeather(location) {
  const results = useQueries({
    queries: [
      {
        queryKey: ["toptm", location],
        queryFn: () => getToptm(),
        staleTime: 1000 * 60 * 5,
      },
      {
        queryKey: ["topspt", location],
        queryFn: () => getTopspt(),
        staleTime: 1000 * 60 * 5,
      },
    ],
  });

  // console.log(results[0].data);
  // console.log(results[1].data);
  console.log("=======> useWeather.jsx");

  return { toptm: results[0], topspt: results[1] };
}
