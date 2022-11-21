import React from 'react';
import { TextInput } from 'react-native';
import { FormControl } from 'native-base';
import { StyleSheet } from 'react-native';

export const PriceLimit = ({ limit, setLimit, deviceID }) => {
  return (
    <FormControl style={styles.form}>
      <FormControl.Label>Price limit (cent/kWh)</FormControl.Label>
      <TextInput
        style={styles.input}
        keyboardType='numeric'
        value={limit.toString()}
        onChangeText={(text) => setLimit(parseFloat(text) || '')}
        editable={deviceID.length > 0}
      />
    </FormControl>
  )
}

var styles = StyleSheet.create({
  input: {
    height: 40,
    width: 100,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: 'black'
  },
  form: {
    maxWidth: 300,
    paddingTop: 100,
    alignItems: 'center'
  }
});

export default PriceLimit;
