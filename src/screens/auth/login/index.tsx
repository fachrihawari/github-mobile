import React, { useContext, useState } from "react";
import { View, Text, TextInput, Alert } from "react-native";
import { NavigationContext } from "react-navigation";

import style from "./style";
import Button from "../../../components/Button";

function LoginScreen() {
  const [username, setUsername] = useState<string>("");
  const navigation = useContext(NavigationContext);

  function handleContinue() {
    if (!username.trim()) {
      return Alert.alert("Username required!");
    }

    navigation.navigate("Password", {
      username: username
    });
  }

  function handleUsernameChange(value: string) {
    setUsername(value);
  }

  return (
    <View style={style.container}>
      <TextInput
        placeholder="Username"
        autoCapitalize="none"
        autoFocus
        style={style.usernameInput}
        onChangeText={handleUsernameChange}
        returnKeyType="done"
        onSubmitEditing={handleContinue}
      />
      <Button wrapperStyle={style.continueButton} onPress={handleContinue}>
        Continue
      </Button>
    </View>
  );
}

LoginScreen.navigationOptions = {
  title: "Github Login"
};

export default LoginScreen;
