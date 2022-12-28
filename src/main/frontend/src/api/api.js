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
    case "card":
      return getCard();
    case "uv":
      return getUv();
    case "sun":
      return getSun();
    case "air":
      return getAir();
    case "survey":
      return addSurvey(params);
    default:
      return null;
  }
}

const setLocation = async (address) => {
  if (address === undefined) return;
  return httpClient
    .get("location", {
      params: {
        address: address,
      },
    })
    .then((res) => res.data);
};

const getSearchList = async (keyword) => {
  return httpClient
    .get("search", {
      params: {
        saddress: keyword,
      },
    })
    .then((res) => res.data);
};

const getToptm = async () => {
  return httpClient.get("toptm").then((res) => res.data);
};

const getTopspt = async () => {
  return httpClient.get("topspt").then((res) => res.data);
};

const getToday = async () => {
  return httpClient.get("today").then((res) => res.data);
};

const getClothes = async () => {
  return httpClient.get("clothes").then((res) => res.data);
};

const getCard = async () => {
  return httpClient.get("card").then((res) => res.data);
};

const getUv = async () => {
  return httpClient.get("uv").then((res) => res.data);
};

const getSun = async () => {
  return httpClient.get("sun").then((res) => res.data);
};

const getAir = async () => {
  return httpClient.get("air").then((res) => res.data);
};

const addSurvey = async (params) => {
  return httpClient
    .post("sheet", {
      params: {
        params,
      },
    })
    .then((res) => res.data);
};
