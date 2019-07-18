import React, { useContext, useState, useEffect } from "react";
import { View, Text, TextInput, Alert } from "react-native";
import { NavigationContext } from "react-navigation";
import { useDispatch } from "react-redux";

import style from "./style";
import Button from "../../../components/Button";
import { logout } from "../../../store/auth/action";
import Touchable from "../../../components/Touchable";

function HomeScreen() {
  const [repository, setRepository] = useState<string>("facebook/react-native");
  const navigation = useContext(NavigationContext);
  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setParams({
      handleLogout: () => {
        dispatch(logout());
        navigation.navigate("Login");
      }
    });
  }, []);

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

HomeScreen.navigationOptions = ({ navigation }: any) => {
  return {
    title: "Home",
    headerRight: (
      <Touchable onPress={navigation.getParam("handleLogout")}>
        <Text style={style.logoutText}>Logout</Text>
      </Touchable>
    )
  };
};
export default HomeScreen;
