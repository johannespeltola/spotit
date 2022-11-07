import { post } from './BackendService';

export const login = async (username, password) => {
  return post(`auth/login`, { username, password })
    .then((res) => res.json());
};

export const autoLogin = async () => {
  return post(`auth/verify`)
    .then((res) => res.status);
};
