import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { Center, Select, FormControl, CheckIcon, WarningOutlineIcon } from 'native-base';
import { getDevice, getUserDevices, updateDeviceLimit } from '../services/DeviceService';

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
      <FormControl w="3/4" maxW="300" isRequired isInvalid={!deviceID}>
        <FormControl.Label>Select Device</FormControl.Label>
        <Select
          minWidth="200"
          accessibilityLabel="Select Device"
          placeholder="Select Device"
          mt="1"
          selectedValue={deviceID}
          onValueChange={(e) => setDeviceID(e)}
        >
          {
            devices?.map((d) => <Select.Item key={d.id} label={d.id} value={d.id} />)
          }
        </Select>
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          Please make a selection!
        </FormControl.ErrorMessage>
      </FormControl>
      <FormControl maxW="300">
        <FormControl.Label>Price limit (cent/kWh)</FormControl.Label>
        <TextInput
          style={styles.input}
          keyboardType='numeric'
          value={limit.toString()}
          onChangeText={(text) => setLimit(parseFloat(text))}
          editable={deviceID.length > 0}
        />
      </FormControl>

    </Center>
  );
};

var styles = StyleSheet.create({
  background: {
    marginTop: '50%'
  },
  input: {
    height: 40,
    width: 100,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: 'black'
  },
});

export default HomeView;
