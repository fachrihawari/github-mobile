import React, { useContext, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContext } from "react-navigation";

import Item from "./item";
import style from "./style";
import { fetchCommitRequest } from "../../../store/repository/action";
import { ICommit } from "../../../store/repository/reducer";
import Touchable from "../../../components/Touchable";
import { logout } from "../../../store/auth/action";

function CommitScreen() {
  const dispatch = useDispatch();
  const navigation = useContext(NavigationContext);
  const repository = navigation.getParam("repository");
  const { commits, page, perPage, isLoading } = useSelector(
    (state: any) => state.repository
  );

  useEffect(() => {
    handleFetchCommit()
    navigation.setParams({
      handleLogout: () => {
        dispatch(logout());
        navigation.navigate("Login");
      }
    });
  }, []);

  function handleFetchCommit() {
    if (isLoading) return;

    const nextPage = page + 1
    dispatch(fetchCommitRequest(repository, nextPage, perPage));
  }

  function _renderItem({ item }: { item: ICommit }) {
    return  <Item commit={item} />
  }

  function _renderFooter() {
    return isLoading && <Text style={style.loadingText}>Getting commits...</Text>
  }

  return (
    <View style={style.container}>
      <FlatList
      showsVerticalScrollIndicator={false}
        data={commits}
        keyExtractor={(item: ICommit) => item.sha}
        renderItem={_renderItem}
        onEndReached={handleFetchCommit.bind(null)}
        ListFooterComponent={_renderFooter}
        onEndReachedThreshold={0.5}
        initialNumToRender={10}
        style={style.commitsWrapper}
      />
      
    </View>
  );
}

CommitScreen.navigationOptions = ({ navigation }: any) => {
  return {
    title: navigation.getParam("repository"),
    headerRight: (
      <Touchable onPress={navigation.getParam("handleLogout")}>
        <Text style={style.logoutText}>Logout</Text>
      </Touchable>
    )
  };
};

export default CommitScreen;
