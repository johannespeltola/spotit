import { post } from './BackendService';

export const login = async (username, password) => {
  return post(`auth/login`, { username, password });
};

export const autoLogin = async () => {
  return post(`auth/verify`);
};
