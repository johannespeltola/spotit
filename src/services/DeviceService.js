import { get, put } from './BackendService';

export const getDevice = async (deviceID) => {
  return get(`device/${deviceID}`);
};

export const updateDeviceLimit = async (deviceID, limit) => {
  return put(`device/${deviceID}`, { priceLimit: limit });
};