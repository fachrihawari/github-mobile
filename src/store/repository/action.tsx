import { FETCH_COMMIT_REQUEST } from "./constant";
import { createAction } from "../helpers";

export const fetchCommitRequest = (
  repository: string,
  page?: number,
  perPage?: number
) => createAction(FETCH_COMMIT_REQUEST, { repository, page, perPage });
