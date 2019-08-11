import axios from 'axios';

import config from '../config';

export const profile = (username: string, password: string, otp: string ='') => {
  let headers = {}

  if (otp) {
    headers = Object.assign(headers, {
      'X-GitHub-OTP': otp
    })
  }

  return axios.get(`${config.apiUrl}/user`, {
    auth: {
      username,
      password
    },
    headers
  });
};

export const authorize = (username: string, password: string) => {
  return axios.post(`${config.apiUrl}/authorizations`, {
    note: 'user-for-login-only',
    scopes: ['user']
  }, {
    auth: {
      username,
      password
    }
  });
};
