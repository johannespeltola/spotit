import config from './config.json';

const base_url = config.BACKEND_BASE;

export const get = async (path) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  };
  const response = await fetch(`${base_url}/${path}`, requestOptions);
  const data = await response.json();
  return data;
};

export const put = async (path, body) => {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  };
  return fetch(`${base_url}/${path}`, requestOptions)
    .then(response => response.json())
};
