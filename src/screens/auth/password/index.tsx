import React, { useContext, useState, useEffect } from "react";
import { View, Text, TextInput, Alert } from "react-native";
import { NavigationContext } from "react-navigation";
import { useDispatch, useSelector } from "react-redux";

import style from "./style";
import Button from "../../../components/Button";
import { fetchUserRequest } from "./../../../store/auth/action";

function PasswordScreen() {
  const dispatch = useDispatch();
  const navigation = useContext(NavigationContext);
  const [password, setPassword] = useState<string>("");

  const store = useSelector((state: any) => ({
    isLoading: state.auth.isLoading,
    isLoggedIn: state.auth.isLoggedIn,
    error: state.auth.error,
    needOTP: state.auth.needOTP
  }));

  const username = navigation.getParam("username");

  useEffect(() => {
    if (store.isLoading === false && store.isLoggedIn === true) {
      navigation.navigate("Home");
    }
  }, [store.isLoggedIn]);

  useEffect(() => {
    if (store.needOTP) {
      navigation.navigate("OTP", {
        username, 
        password
      });
    }
  }, [store.needOTP])

  function handleLogin() {
    if (!password.trim()) {
      return Alert.alert("Password required!");
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
        autoFocus
        secureTextEntry
        placeholder="Password"
        autoCapitalize="none"
        returnKeyType="done"
        style={style.passwordInput}
        onChangeText={handlePasswordChange}
        onSubmitEditing={handleLogin}
        editable={!store.isLoading}
      />
      <Button wrapperStyle={style.continueButton} onPress={handleLogin}>
        {store.isLoading ? "Loading..." : "Login"}
      </Button>
    </View>
  );
}

PasswordScreen.navigationOptions = {
  title: "Github Password"
};

export default PasswordScreen;
