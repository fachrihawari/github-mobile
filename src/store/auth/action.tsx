import { createAction } from '../helpers';
import { FETCH_USER_BEGIN, FETCH_USER_FAILURE, FETCH_USER_REQUEST, FETCH_USER_SUCCESS, LOGOUT } from './constant';

export const fetchUserRequest = (username: string, password: string, OTP: string = '') => createAction(FETCH_USER_REQUEST, { username, password, OTP });

export const fetchUserBegin = () => createAction(FETCH_USER_BEGIN);

export const fetchUserSuccess = (profile: object) => createAction(FETCH_USER_SUCCESS, { profile });

export const fetchUserFailure = (error: string, needOTP: boolean) => createAction(FETCH_USER_FAILURE, { error, needOTP });

export const logout = () => createAction(LOGOUT);
