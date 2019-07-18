import axios from "axios";

import config from "../config";

export const profile = (username: string, password: string) => {
  return axios.get(`${config.apiUrl}/user`, {
    auth: {
      username,
      password
    }
  });
};
