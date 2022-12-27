import axios from "axios";
import { getCookie } from "../shared/cookie";

export const instance = axios.create({
  baseURL: "http://13.124.82.69",
  //headers의 역할은 나중에 물어봅시당
  headers: { authorization: `Bearer ${getCookie("token")}` },
});
