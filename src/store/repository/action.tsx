import { createAction } from '../helpers';
import { FETCH_COMMIT_REQUEST } from './constant';

export const fetchCommitRequest = (
  repository: string,
  page?: number,
  perPage?: number
) => createAction(FETCH_COMMIT_REQUEST, { repository, page, perPage });
