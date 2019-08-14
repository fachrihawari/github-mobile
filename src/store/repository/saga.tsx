import { AnyAction } from 'redux';
import { call, delay, put, takeLatest } from 'redux-saga/effects';

import * as api from '../../api/repository';
import { parseError } from '../helpers';
import { fetchCommitBegin, fetchCommitFailure, fetchCommitSuccess } from './action';
import { FETCH_COMMIT_REQUEST } from './constant';

export function* commitRequest({ payload }: AnyAction) {
  try {
    yield put(fetchCommitBegin());
    const { data } = yield call(
      api.commits,
      payload.repository,
      payload.page,
      payload.perPage
    );
    yield put(fetchCommitSuccess(data, payload.page < 1 ? 1 : payload.page));
  } catch (error) {
    yield put(fetchCommitFailure(parseError(error)));
  }
}
export default [takeLatest(FETCH_COMMIT_REQUEST, commitRequest)];
