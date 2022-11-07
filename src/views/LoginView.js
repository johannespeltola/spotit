import React from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Text
} from 'react-native';
import LoginForm from '../components/LoginForm';

const LoginView = ({ navigation }) => {
  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={'position'}
      enabled
    >
      <ScrollView>
        <Text>HELLO????</Text>
        <View style={styles.loginForm}>
          <LoginForm navigation={navigation} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView >
  );
};

var styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
    zIndex: 1,
    overflow: 'hidden',
    height: '100%',
    backgroundColor: 'white'
  },
  loginForm: {
    marginTop: '35%',
    height: 500,
    backgroundColor: 'white',
    flex: 3
  }
});

export default LoginView;
