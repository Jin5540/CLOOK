import axios from "axios";

const httpClient = axios.create({
  baseURL: "/api/",
});

export async function setLocation(address) {
  if (address === undefined) return;
  return httpClient
    .get("location", {
      params: {
        address: address,
      },
    })
    .then((res) => res.data);
}

export async function getToptm() {
  return httpClient.get("toptm").then((res) => res.data);
}

export async function getTopspt() {
  return httpClient.get("topspt").then((res) => res.data);
}

export async function getToday() {
  return httpClient.get("today").then((res) => res.data);
}

export async function getSearchList(keyword) {
  return httpClient
    .get("search1", {
      params: {
        saddress: keyword,
      },
    })
    .then((res) => res.data);
}
