import React from "react";
import { View, Text } from "react-native";

 import styles from "./style";

 function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to Github Mobile!</Text>
      <Text style={styles.instructions}>Manage your repository by phone</Text>
    </View>
  );
}

 export default HomeScreen;