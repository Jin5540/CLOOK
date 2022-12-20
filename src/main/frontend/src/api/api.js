import axios from "axios";

const httpClient = axios.create({
  baseURL: "/api/",
});

export function getApi(api, params) {
  if (!api) return;

  switch (api) {
    case "location":
      return setLocation(params);
    case "search":
      return getSearchList(params);
    case "toptm":
      return getToptm();
    case "topspt":
      return getTopspt();
    case "today":
      return getToday();
    case "clothes":
      return getClothes();
    default:
      return null;
  }
}

export const setLocation = async (address) => {
  if (address === undefined) return;
  return httpClient
    .get("location", {
      params: {
        address: address,
      },
    })
    .then((res) => res.data);
};

export const getSearchList = async (keyword) => {
  return httpClient
    .get("search", {
      params: {
        saddress: keyword,
      },
    })
    .then((res) => res.data);
};

export const getToptm = async () => {
  return httpClient.get("toptm").then((res) => res.data);
};

export const getTopspt = async () => {
  return httpClient.get("topspt").then((res) => res.data);
};

export const getToday = async () => {
  return httpClient.get("today").then((res) => res.data);
};

export const getClothes = async () => {
  return httpClient.get("clothes").then((res) => res.data);
};
