import Headers from "./Header";
import { ProcessAPI, Const } from "../../../utils/Constant";

export const register = async (body) => {
  const res = await fetch(Const.Link + `api/auth/register`, new Headers("POST", body));
  return ProcessAPI(res);
};
export const login = async (body) => {
  const res = await fetch(Const.Link + `api/auth/login`, new Headers("POST", body));
  return ProcessAPI(res);
};
export const createEvent = async (body) => {
  const res = await fetch(Const.Link + `api/events`, new Headers("POST", body));
  return ProcessAPI(res);
};
export const allEvent = async () => {
  const res = await fetch(Const.Link + `api/events`, new Headers("GET"));
  return ProcessAPI(res);
};
export const editEvent = async (id,body) => {
  const res = await fetch(Const.Link + `api/events/${id}`, new Headers("PUT", body));
  return ProcessAPI(res);
};
export const deleteEvent = async (id) => {
  const res = await fetch(Const.Link + `api/events/${id}`, new Headers("DELETE"));
  return ProcessAPI(res);
};

