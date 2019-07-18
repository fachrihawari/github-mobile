import React, { useContext, useState, useEffect } from "react";
import { View, Text, TextInput, Alert, Image, Linking } from "react-native";
import { NavigationContext } from "react-navigation";
import { useDispatch, useSelector } from "react-redux";

import style from "./style";
import Button from "../../../components/Button";
import { logout } from "../../../store/auth/action";
import Touchable from "../../../components/Touchable";

function HomeScreen() {
  const [repository, setRepository] = useState<string>("facebook/react-native");
  const navigation = useContext(NavigationContext);
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);

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

  function handleBlogPress() {
    Linking.openURL(user.blog);
  }

  function renderUserInfo() {
    if (!user) return null;

    return (
      <View style={style.userWrapper}>
        <Image source={{ uri: user.avatarUrl }} style={style.userAvatar} />
        <View>
          <Text numberOfLines={1} style={style.userName}>
            {user.name}
          </Text>
          <Touchable onPress={handleBlogPress}>
            <Text numberOfLines={1} style={style.userBlog}>
              {user.blog}
            </Text>
          </Touchable>
          <Text numberOfLines={1} style={style.userBio}>
            {user.bio}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={style.container}>
      {renderUserInfo()}
      <View style={style.repositoryWrapper}>
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
