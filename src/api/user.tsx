import axios from "axios";

import config from "../config";

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
