import React from 'react';
import HomeView from './src/views/HomeView';
import LoginView from './src/views/LoginView';
import { NativeBaseProvider } from 'native-base';
import Theme from './src/Theme';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NativeBaseProvider theme={Theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Login'
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen
            name='Home'
            component={HomeView}
          />
          <Stack.Screen
            name='Login'
            component={LoginView}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
