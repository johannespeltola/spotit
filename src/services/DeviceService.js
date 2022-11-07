import { get, put } from './BackendService';

export const getUserDevices = async () => {
  return get(`devices`);
}

export const getDevice = async (deviceID) => {
  return get(`device/${deviceID}`);
};

export const updateDeviceLimit = async (deviceID, limit) => {
  return put(`device/${deviceID}`, { priceLimit: limit });
};