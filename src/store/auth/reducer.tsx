import { AnyAction } from "redux";

import { SET_LOGGED_IN } from "./constant";

export interface IState {
  isLoggedIn: boolean;
}

const initialState: IState = {
  isLoggedIn: false
};

export default (state: IState = initialState, action: AnyAction): IState => {
  switch (action.type) {
    case SET_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn
      };
    default:
      return state;
  }
};
