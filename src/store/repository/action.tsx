import { createAction } from '../helpers';
import { FETCH_COMMIT_BEGIN, FETCH_COMMIT_FAILURE, FETCH_COMMIT_REQUEST, FETCH_COMMIT_SUCCESS } from './constant';
import { ICommit } from './reducer';

export const fetchCommitRequest = (
  repository: string,
  page?: number,
  perPage?: number
) => createAction(FETCH_COMMIT_REQUEST, { repository, page, perPage });


export const fetchCommitBegin = () => createAction(FETCH_COMMIT_BEGIN);

export const fetchCommitSuccess = (commits: object[], currentPage: number) => createAction(FETCH_COMMIT_SUCCESS, { commits, currentPage });

export const fetchCommitFailure = (error: string) => createAction(FETCH_COMMIT_FAILURE, { error });
