import AsyncStorage from '@react-native-async-storage/async-storage';
import config from './config.json';

const base_url = config.BACKEND_BASE;

export const getCookieValue = async (name) => {
  const token = await AsyncStorage.getItem(name);
  return token ?? '';
};

export const get = async (path) => {
  const jwt = await getCookieValue('accessToken');
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `${jwt}`
    }
  };
  const response = await fetch(`${base_url}/${path}`, requestOptions);
  const data = await response.json();
  return data;
};

export const put = async (path, body) => {
  const jwt = await getCookieValue('accessToken');
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `${jwt}` },
    body: JSON.stringify(body)
  };
  return fetch(`${base_url}/${path}`, requestOptions)
    .then(response => response.json())
};

export const post = async (path, body) => {
  const jwt = await getCookieValue('accessToken');
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `${jwt}` },
    body: JSON.stringify(body)
  };
  return fetch(`${base_url}/${path}`, requestOptions)
};
