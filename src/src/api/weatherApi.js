import axios from "axios";

const httpClient = axios.create({
  baseURL: "/api/",
});

export async function setLocation(address) {
  if (address === undefined) return;
  return httpClient
    .get("location", {
      params: {
        // address: "충청남도 아산시 모종동",
        address: address,
      },
    })
    .then((res) => res.data)
    .catch((err) => err);
}

export async function getToptm() {
  return httpClient
    .get("toptm")
    .then((res) => res.data)
    .catch((err) => err);
}

export async function getTopspt() {
  return httpClient
    .get("topspt")
    .then((res) => res.data)
    .catch((err) => err);
}

export async function getSearchList(keyword) {
  return httpClient
    .get("search", {
      params: {
        saddress: keyword,
      },
    })
    .then((res) => res.data)
    .catch((err) => err);
}
