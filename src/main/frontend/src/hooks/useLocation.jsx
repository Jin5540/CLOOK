import { useQuery } from "@tanstack/react-query";
import { getApi } from "../api/api";
import { useLocationContext } from "../contexts/LocationContext";

export default function useLocation() {
  const { location, region } = useLocationContext();

  const params = { address: location, region: region };

  const locationQuery = useQuery(
    ["location", location],
    () => getApi("location", params),
    {
      staleTime: 0,
    }
  );

  console.log("=======> useLocation.jsx");

  return { locationQuery };
}
