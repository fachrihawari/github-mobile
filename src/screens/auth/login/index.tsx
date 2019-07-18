import React from "react";
import { View, Text, TextInput } from "react-native";

import style from "./style";

function HomeScreen() {
  return (
    <View style={style.container}>
      <Text style={style.title}>Github Login</Text>
      <TextInput style={style.usernameInput} />
    </View>
  );
}

export default HomeScreen;
