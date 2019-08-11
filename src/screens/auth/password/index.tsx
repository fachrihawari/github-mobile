import React, { useContext, useEffect, useState } from 'react';
import { Alert, Text, TextInput, View } from 'react-native';
import { NavigationContext } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../../components/Button';
import { fetchUserRequest } from './../../../store/auth/action';
import style from './style';

function PasswordScreen() {
  const dispatch = useDispatch();
  const navigation = useContext(NavigationContext);
  const [password, setPassword] = useState<string>('');

  const store = useSelector((state: any) => ({
    isLoading: state.auth.isLoading,
    isLoggedIn: state.auth.isLoggedIn,
    error: state.auth.error,
    needOTP: state.auth.needOTP
  }));

  const username = navigation.getParam('username');

  useEffect(() => {
    if (store.isLoading === false && store.isLoggedIn === true) {
      navigation.navigate('Home');
    }
  }, [store.isLoggedIn]);

  useEffect(() => {
    if (store.needOTP) {
      navigation.navigate('OTP', {
        username, 
        password
      });
    }
  }, [store.needOTP])

  function handleLogin() {
    if (!password.trim()) {
      return Alert.alert('Password required!');
    }

    dispatch(fetchUserRequest(username, password));
  }

  function handlePasswordChange(value: string) {
    setPassword(value);
  }

  return (
    <View style={style.container}>
      {(!store.needOTP && store.error) && <Text style={style.error}>{store.error}</Text>}
      <TextInput
        autoFocus={true}
        secureTextEntry={true}
        placeholder="Password"
        autoCapitalize="none"
        returnKeyType="done"
        style={style.passwordInput}
        onChangeText={handlePasswordChange}
        onSubmitEditing={handleLogin}
        editable={!store.isLoading}
      />
      <Button wrapperStyle={style.continueButton} onPress={handleLogin}>
        {store.isLoading ? 'Loading...' : 'Login'}
      </Button>
    </View>
  );
}

PasswordScreen.navigationOptions = {
  title: 'Github Password'
};

export default PasswordScreen;
