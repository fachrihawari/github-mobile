import { AnyAction } from "redux";
import { takeLatest, put, call, delay } from "redux-saga/effects";

import {
  FETCH_USER_REQUEST,
  FETCH_USER_BEGIN,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE
} from "./constant";
import * as api from "../../api/user";
import { parseError } from "../helpers";

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
    console.log(error.response)
    
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
      } catch (error) {}

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
