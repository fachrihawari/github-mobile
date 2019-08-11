import { AnyAction } from 'redux';
import { call, delay, put, takeLatest } from 'redux-saga/effects';

import * as api from '../../api/repository';
import { parseError } from '../helpers';
import {
  FETCH_COMMIT_BEGIN,
  FETCH_COMMIT_FAILURE,
  FETCH_COMMIT_REQUEST,
  FETCH_COMMIT_SUCCESS
} from './constant';

function* commitRequest({ payload }: AnyAction) {
  try {
    yield put({ type: FETCH_COMMIT_BEGIN });
    const { data } = yield call(
      api.commits,
      payload.repository,
      payload.page,
      payload.perPage
    );
    yield put({
      type: FETCH_COMMIT_SUCCESS,
      payload: {
        commits: data,
        currentPage: payload.page < 1 ? 1 : payload.page
      }
    });
  } catch (error) {
    yield put({
      type: FETCH_COMMIT_FAILURE,
      payload: {
        error: parseError(error)
      }
    });
  }
}
export default [takeLatest(FETCH_COMMIT_REQUEST, commitRequest)];
