import { AnyAction } from 'redux';
import {
  FETCH_USER_BEGIN,
  FETCH_USER_FAILURE,
  FETCH_USER_SUCCESS,
  LOGOUT
} from './constant';
import { transformProfile } from './transform';

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
  needOTP: boolean;
}

export const initialState: IState = {
  isLoggedIn: false,
  isLoading: false,
  needOTP: false,
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
        isLoggedIn: false,
        error: action.payload.error,
        needOTP: action.payload.needOTP
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
