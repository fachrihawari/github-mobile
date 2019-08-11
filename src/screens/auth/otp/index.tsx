import React, { useContext, useEffect, useState } from 'react';
import { Alert, Text, TextInput, View } from 'react-native';
import { NavigationContext } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../../components/Button';
import { fetchUserRequest } from '../../../store/auth/action';
import style from './style';

function OTPScreen() {
  const dispatch = useDispatch();
  const navigation = useContext(NavigationContext);
  const [OTP, setOTP] = useState<string>('');

  const store = useSelector((state: any) => ({
    isLoading: state.auth.isLoading,
    isLoggedIn: state.auth.isLoggedIn,
    error: state.auth.error,
    needOTP: state.auth.needOTP,
  }));

  const username = navigation.getParam('username');
  const password = navigation.getParam('password');

  useEffect(() => {
    if (store.isLoading === false && store.isLoggedIn === true) {
      navigation.navigate('Home');
    }
  }, [store.isLoggedIn]);

  function handleLogin() {
    if (!OTP.trim()) {
      return Alert.alert('OTP required!');
    }

    dispatch(fetchUserRequest(username, password, OTP));
  }

  function handleOTPChange(value: string) {
    setOTP(value);
  }

  return (
    <View style={style.container}>
      <TextInput
        autoFocus={true}
        secureTextEntry={true}
        placeholder="OTP"
        autoCapitalize="none"
        returnKeyType="done"
        style={style.OTPInput}
        onChangeText={handleOTPChange}
        onSubmitEditing={handleLogin}
        editable={!store.isLoading}
      />
      <Button wrapperStyle={style.continueButton} onPress={handleLogin}>
        {store.isLoading ? 'Loading...' : 'Login'}
      </Button>
    </View>
  );
}

OTPScreen.navigationOptions = {
  title: 'Github OTP'
};

export default OTPScreen;
