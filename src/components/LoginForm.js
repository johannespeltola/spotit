import React, { useState, useEffect } from 'react';
import {
  FormControl,
  Input,
  Stack,
  Box,
  Center,
  Button,
  useToast
} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { autoLogin, login } from '../services/AuthService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LoginForm = ({ navigation }) => {
  const [hidden, SetHidden] = useState(true);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const toast = useToast();

  useEffect(() => {
    autoLogin().then(
      () => navigation.navigate('Home'),
      () => { }
    );
  }, []);

  const loginAction = () => {
    if (username) {
      login(username.toLowerCase(), password ).then(
        async (res) => {
          await AsyncStorage.setItem('accessToken', res).then(
            () => navigation.navigate('Home'),
            () => toast.show({
              title: 'Something Went Wrong',
              status: 'error',
              description: 'An unexpected error has occured. Please try again or contact support.'
            })
          );
        },
        (err) => toast.show({
          title: 'Invalid Username or Password',
          status: 'error',
          description: `${err}`
        })
      );
    }
  };

  return (
    <Center flex={1} px='3'>
      <Box
        w={{
          base: '90%',
          md: '10%'
        }}
        h={{
          base: '70%',
          md: '20%'
        }}
      >
        <FormControl isRequired>
          <Stack mx='4'>
            <Stack space={4} w='100%' alignItems='center'>
              <Input
                w={{
                  base: '100%',
                  md: '0%'
                }}
                h={{
                  base: '30%'
                }}
                InputLeftElement={
                  <Icon
                    name='person'
                    size={30}
                    color='gray'
                  />
                }
                placeholder='Username'
                onChangeText={(text) => setUsername(text)}
              />
              <Input
                type={hidden ? 'password' : 'text'}
                w={{
                  base: '100%',
                  md: '0%'
                }}
                h={{
                  base: '30%'
                }}
                InputLeftElement={
                  <Icon
                    name='lock'
                    size={30}
                    color='gray'
                  />
                }
                InputRightElement={
                  <Button size='xs' style={{ backgroundColor: 'transparent' }} rounded='none' w='1/5' h='full' onPress={() => SetHidden(!hidden)}>
                    <Icon
                      name={hidden ? 'visibility' : 'visibility-off'}
                      size={30}
                      color='gray'
                    />
                  </Button>
                }
                placeholder='Password'
                onChangeText={(text) => setPassword(text)}
              />
              <Button
                rightIcon={<Icon name='login' color='white' />}
                colorScheme='primary' style={{ width: '100%', height: '30%' }}
                onPress={() => loginAction()}
              >
                LOGIN
              </Button>
            </Stack>
          </Stack>
        </FormControl>
      </Box>
    </Center>
  );
};

export default LoginForm;
