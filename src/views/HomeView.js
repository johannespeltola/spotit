import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Center, useToast } from 'native-base';
import { getDevice, getUserDevices, scheduleDevice, updateDeviceLimit } from '../services/DeviceService';
import DeviceSelect from '../components/DeviceSelect';
import PriceLimit from '../components/PriceLimit';
import ScheduleSlider from '../components/ScheduleSlider';

const HomeView = () => {
  const [devices, setDevices] = useState([]);
  const [deviceID, setDeviceID] = useState('');
  const [limit, setLimit] = useState(0.0);
  const toast = useToast();

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
    if (isNaN(parseFloat(limit))) return;
    updateDeviceLimit(deviceID, limit).then(
      (res) => console.log(res)
    );
  }

  const saveSchedule = async (interval, duration) => {
    scheduleDevice(deviceID, interval[0], interval[1], duration[0]).then(
      (res) => {
        if (res.status === 200) {
          toast.show({
            title: 'Schedule updated',
            status: 'success',
            description: 'Device schedule updated successfully!'
          })
        } else {
          toast.show({
            title: 'Something Went Wrong',
            status: 'error',
            description: 'An unexpected error has occured. Please try again or contact support.'
          })
        }
      }
    );
  };

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
      <ScheduleSlider saveSchedule={saveSchedule} disabled={!deviceID} />
      <PriceLimit limit={limit} setLimit={setLimit} deviceID={deviceID} />
    </Center>
  );
};

var styles = StyleSheet.create({
  background: {
    marginTop: '5%'
  }
});

export default HomeView;
