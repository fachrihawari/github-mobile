import React, { useContext, useState } from "react";
import { View, Text, TextInput, Alert } from "react-native";
import { NavigationContext } from "react-navigation";

import style from "./style";
import Button from "../../../components/Button";

function HomeScreen() {
  const [repository, setRepository] = useState<string>("facebook/react-native");
  const navigation = useContext(NavigationContext);

  function handleContinue() {
    if (!repository.trim()) {
      return Alert.alert("Repository Name required!");
    }

    navigation.navigate("Commit", {
      repository: repository
    });
  }

  function handleRepositoryChange(value: string) {
    setRepository(value);
  }

  return (
    <View style={style.container}>
      <Text style={style.title}>Repository Name</Text>
      <TextInput
        placeholder="example: facebook/react-native"
        autoCapitalize="none"
        returnKeyType="done"
        style={style.usernameInput}
        value={repository}
        onChangeText={handleRepositoryChange}
        onSubmitEditing={handleContinue}
      />
      <Button wrapperStyle={style.continueButton} onPress={handleContinue}>
        Continue
      </Button>
    </View>
  );
}

HomeScreen.navigationOptions = {
  title: "Home"
};
export default HomeScreen;
