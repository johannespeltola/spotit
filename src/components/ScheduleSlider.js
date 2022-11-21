import React, { useState } from 'react'
import { Text, StyleSheet } from 'react-native';
import { Center, Button } from 'native-base';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

export const ScheduleSlider = ({ saveSchedule, disabled }) => {
  const [interval, setInterval] = useState([0, 0]);
  const [duration, setDuration] = useState(0);

  return (
    <Center style={styles.body}>
      <Text style={styles.label}>{`Between the hours ${interval[0]}:00 - ${interval[1]}:00`}</Text>
      <Text style={styles.label}>{`I want to use the device for ${duration} hours`}</Text>
      <MultiSlider
        min={0}
        max={24}
        isMarkersSeparated={true}
        customLabel={(e) => console.log(e)}
        minMarkerOverlapStepDistance={2}
        allowOverlap={false}
        values={[0, 24]}
        onValuesChange={(e) => { setInterval(e); setDuration(0); }}
        showSteps={true}
      />
      <MultiSlider
        min={0}
        max={interval[1] - interval[0] + 1}
        isMarkersSeparated={true}
        minMarkerOverlapStepDistance={2}
        allowOverlap={false}
        onValuesChange={(e) => setDuration(e)}
      />
      <Button
        style={styles.button}
        onPress={() => saveSchedule(interval, duration)}
        isDisabled={disabled}
      >
        Save
      </Button>
    </Center>
  )
}

var styles = StyleSheet.create({
  body: {
    paddingTop: 100
  },
  markerLabel: {
    paddingBottom: 25,
    color: 'black'
  },
  label: {
    color: 'black',
  },
});

export default ScheduleSlider;
