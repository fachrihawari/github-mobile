import { AnyAction } from "redux";
import {
  FETCH_COMMIT_BEGIN,
  FETCH_COMMIT_SUCCESS,
  FETCH_COMMIT_FAILURE
} from "./constant";
import { transformCommit } from "./transform";

export interface ICommit {
  sha: string;
  date: Date;
  message: string;
  authorName: string;
  authorEmail: string;
  authorUsername: string;
  authorAvatarUrl: string;
  authorUrl: string;
}

export interface IState {
  isLoading: boolean;
  error: string | null;
  commits: Array<ICommit>;
  page: number;
  perPage: number;
}

const initialState: IState = {
  isLoading: false,
  error: null,
  page: 1,
  perPage: 10,
  commits: []
};

export default (state: IState = initialState, action: AnyAction): IState => {
  switch (action.type) {
    case FETCH_COMMIT_BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case FETCH_COMMIT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        page: action.payload.currentPage,
        commits: action.payload.commits.map(transformCommit)
      };
    case FETCH_COMMIT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
};
