import { createAction } from '../helpers';
import { FETCH_USER_REQUEST, LOGOUT } from './constant';

export const fetchUserRequest = (username: string, password: string, OTP: string='') =>
  createAction(FETCH_USER_REQUEST, { username, password, OTP });

export const logout = () => createAction(LOGOUT);
