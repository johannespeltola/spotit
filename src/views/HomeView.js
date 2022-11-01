import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { getDevice, updateDeviceLimit } from '../services/DeviceService';

const HomeView = () => {
  const deviceID = 'd9b657';
  const [limit, setLimit] = useState(0.0);

  const fetchData = async () => {
    const data = await getDevice(deviceID);
    setLimit(parseFloat(data.priceLimit));
  };

  const updateLimit = async () => {
    updateDeviceLimit(deviceID, limit).then(
      (res) => console.log(res)
    );
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (limit) {
      updateLimit();
    }
  }, [limit]);

  return (
    <TextInput
      style={styles.input}
      keyboardType='numeric'
      value={limit.toString()}
      onChangeText={(text) => setLimit(parseFloat(text))}
    />
  );
};

var styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: 'black'
  },
});

export default HomeView;
