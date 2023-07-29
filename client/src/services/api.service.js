

import axios from 'axios';
export const Host = 'http://localhost'
export const BaseURL = `${Host}:3001`

const instance = axios.create({ timeout: 10000, baseURL: BaseURL })


class ApiService {
  constructor() {
    instance.interceptors.response.use(this.handleSuccess, this.handleError);
  }

  handleSuccess(response) {
    return response;
  }

  handleError(error) {
    return error;
  }

  get(url) {
    return instance.get(
    `${BaseURL}/${url}`,
      {
        headers: {
          Authorization: 'Bearer '
        }
      }
    );
  }

  post(url, body) {
    return instance.post(
      `${BaseURL}/${url}`,
      body,
      {
        headers: {
          Authorization: 'Bearer '
        }
      }
    );
  }

  put(url, body) {
    return instance.put(
      `${BaseURL}/${url}`,
      body,
      {
        headers: {
          Authorization: 'Bearer '
        }
      }
    );
  }
  
}
export default new ApiService();
