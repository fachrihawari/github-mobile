import { AnyAction } from 'redux';
import { call, put, takeLatest } from 'redux-saga/effects';

import * as api from '../../api/user';
import { parseError } from '../helpers';
import { fetchUserBegin, fetchUserFailure, fetchUserSuccess } from './action';
import {
  FETCH_USER_REQUEST,
} from './constant';

export function* userRequest({ payload }: AnyAction) {
  try {
    yield put(fetchUserBegin());
    const { data } = yield call(
      api.profile,
      payload.username,
      payload.password,
      payload.OTP
    );
    yield put(fetchUserSuccess(data));
  } catch (error) {
    // Check if network failing
    if (error.response === undefined) {
      yield put(fetchUserFailure(parseError(error), false));
    }
    else {
      // Check if the headers has x-github-otp key
      // make authorize request for trigger SMS OTP from Github API
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
  
      yield put(fetchUserFailure(parseError(error), needOTP));
    }
  }
}
export default [takeLatest(FETCH_USER_REQUEST, userRequest)];
