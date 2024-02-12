import axios from "axios";

const baseUrl = "https://www.themealdb.com/api/json/v1/1/";

export const api = axios.create({
  baseURL: baseUrl,
});

export const fetcher = (url: string) => axios.get(baseUrl + url).then((res) => res.data);
