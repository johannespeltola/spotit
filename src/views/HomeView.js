import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Center } from 'native-base';
import { getDevice, getUserDevices, updateDeviceLimit } from '../services/DeviceService';
import DeviceSelect from '../components/DeviceSelect';
import PriceLimit from '../components/PriceLimit';

const HomeView = () => {
  const [devices, setDevices] = useState([]);
  const [deviceID, setDeviceID] = useState('');
  const [limit, setLimit] = useState(0.0);

  const fetchDevices = async () => {
    const data = await getUserDevices();
    if (typeof data !== String) {
      setDevices(data);
    }
  };

  const fetchDeviceInfo = async () => {
    const data = await getDevice(deviceID);
    setLimit(parseFloat(data.priceLimit));
  };

  const updateLimit = async () => {
    updateDeviceLimit(deviceID, limit).then(
      (res) => console.log(res)
    );
  }

  useEffect(() => {
    fetchDevices();
  }, []);

  useEffect(() => {
    if (devices && deviceID) {
      fetchDeviceInfo();
    }
  }, [devices, deviceID]);

  useEffect(() => {
    if (limit && deviceID) {
      updateLimit();
    }
  }, [limit, deviceID]);

  return (
    <Center style={styles.background}>
      <DeviceSelect devices={devices} deviceID={deviceID} setDeviceID={setDeviceID} />
      <PriceLimit limit={limit} setLimit={setLimit} deviceID={deviceID} />
    </Center>
  );
};

var styles = StyleSheet.create({
  background: {
    marginTop: '50%'
  }
});

export default HomeView;
