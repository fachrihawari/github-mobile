import { FETCH_USER_REQUEST } from "./constant";
import { createAction } from "../helpers";

export const fetchUserRequest = (username: string, password: string) =>
  createAction(FETCH_USER_REQUEST, { username, password });
