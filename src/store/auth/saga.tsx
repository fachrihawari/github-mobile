import { AnyAction } from 'redux';
import { call, delay, put, takeLatest } from 'redux-saga/effects';

import * as api from '../../api/user';
import { parseError } from '../helpers';
import {
  FETCH_USER_BEGIN,
  FETCH_USER_FAILURE,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS
} from './constant';

function* userRequest({ payload }: AnyAction) {
  try {
    yield put({ type: FETCH_USER_BEGIN });
    const { data } = yield call(
      api.profile,
      payload.username,
      payload.password,
      payload.OTP
    );
    yield put({
      type: FETCH_USER_SUCCESS,
      payload: {
        profile: data
      }
    });
  } catch (error) {
    let needOTP = false
    const { headers } = error.response
    if (headers['x-github-otp']) {
      const otpType = ['sms', 'app']
      const needType = headers['x-github-otp'].replace('required;', '').trim()
      needOTP = otpType.indexOf(needType) > -1

      try {
        yield call(
          api.authorize,
          payload.username,
          payload.password
        );
      } catch (error) {
        /* tslint:disable:no-empty */
      }
    }

    yield put({
      type: FETCH_USER_FAILURE,
      payload: {
        error: parseError(error),
        needOTP
      }
    });
  }
}
export default [takeLatest(FETCH_USER_REQUEST, userRequest)];
