import React, { useContext, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContext, NavigationAction } from "react-navigation";

import Item from "./item";
import style from "./style";
import Button from "../../../components/Button";
import { fetchCommitRequest } from "../../../store/repository/action";
import { ICommit } from "../../../store/repository/reducer";

function CommitScreen() {
  const dispatch = useDispatch();
  const navigation = useContext(NavigationContext);
  const repository = navigation.getParam("repository");
  const { commits, page, perPage } = useSelector(
    (state: any) => state.repository
  );

  useEffect(() => {
    dispatch(fetchCommitRequest(repository, page, perPage));
    navigation.setParams({
      handleLogout: () => dispatch()
    });
  }, []);

  function handleChangePage(direction: number) {
    dispatch(fetchCommitRequest(repository, page + direction, perPage));
  }

  return (
    <View style={style.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={commits}
        keyExtractor={(item: ICommit) => item.sha}
        renderItem={({ item }: { item: ICommit }) => <Item commit={item} />}
        style={style.commitsWrapper}
      />
      <View style={style.actionWrapper}>
        <Button
          wrapperStyle={style.actionButton}
          onPress={handleChangePage.bind(null, -1)}
        >
          Prev Page
        </Button>
        <Button
          wrapperStyle={style.actionButton}
          onPress={handleChangePage.bind(null, 1)}
        >
          Next Page
        </Button>
      </View>
    </View>
  );
}

CommitScreen.navigationOptions = ({ navigation }: any) => {
  return {
    title: navigation.getParam("repository")
  };
};

export default CommitScreen;