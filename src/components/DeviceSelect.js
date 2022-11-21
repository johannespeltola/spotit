import React from 'react';
import { Select, FormControl, WarningOutlineIcon } from 'native-base';

export const DeviceSelect = ({ devices, deviceID, setDeviceID }) => {
  return (
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
  )
}

export default DeviceSelect;
