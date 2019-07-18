import { AnyAction } from "redux";
import {
  FETCH_USER_BEGIN,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE
} from "./constant";
import { transformProfile } from "./transform";

export interface IUser {
  id: number;
  name: string;
  email: string;
  avatarUrl: string;
  company: string;
  location: string;
  blog: string;
  bio: string;
  publicRepos: number;
  publicGists: number;
  followers: number;
  following: number;
}

export interface IState {
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
  user: IUser | null;
}

const initialState: IState = {
  isLoggedIn: false,
  isLoading: false,
  error: null,
  user: null
};

export default (state: IState = initialState, action: AnyAction): IState => {
  switch (action.type) {
    case FETCH_USER_BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        user: transformProfile(action.payload.profile)
      };
    case FETCH_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
};
