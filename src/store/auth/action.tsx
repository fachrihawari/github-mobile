import { SET_LOGGED_IN } from "./constant";
import { createAction } from "../helpers";

export const setLoggedIn = (isLoggedIn: boolean) =>
  createAction(SET_LOGGED_IN, { isLoggedIn });
