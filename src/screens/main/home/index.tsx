import React from "react";
import { View, Text } from "react-native";

import style from "./style";

function HomeScreen() {
  return (
    <View style={style.container}>
      <Text style={style.welcome}>Welcome to Github Mobile!</Text>
      <Text style={style.instructions}>Manage your repository by phone</Text>
    </View>
  );
}

export default HomeScreen;
