import { get, post, put } from './BackendService';

export const getUserDevices = async () => {
  return get(`devices`);
}

export const getDevice = async (deviceID) => {
  return get(`device/${deviceID}`);
};

export const updateDeviceLimit = async (deviceID, limit) => {
  return put(`device/${deviceID}`, { priceLimit: limit });
};

export const scheduleDevice = async (deviceID, start, end, duration) => {
  return post(`device/schedule`, { deviceID, start, end, duration });
}
