import React, { useEffect, useContext } from "react";
import { ActivityIndicator, View, StatusBar } from "react-native";
import { useSelector } from "react-redux";
import { NavigationContext } from "react-navigation";

import style from "./style";

function LoaderScreen() {
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  const navigation = useContext(NavigationContext);

  useEffect(() => {
    if (isLoggedIn) {
      navigation.navigate("Home");
    } else {
      navigation.navigate("Login");
    }
  }, []);

  return (
    <View style={style.container}>
      <ActivityIndicator />
      <StatusBar />
    </View>
  );
}

export default LoaderScreen;
