import axios from 'axios';

import config from '../config';

export const commits = (
  repository: string,
  page: number = 1,
  perPage: number = 10
) => {
  return axios.get(`${config.apiUrl}/repos/${repository}/commits`, {
    params: {
      page,
      per_page: perPage
    }
  });
};
