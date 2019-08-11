import moment from 'moment';
import React from 'react';
import { Image, Text, View } from 'react-native';

import { ICommit } from '../../../store/repository/reducer';
import style from './style';

interface IItemProps {
  commit: ICommit;
}

function Item({ commit }: IItemProps) {
  return (
    <View style={style.commitItem}>
      <Text style={style.commitItemMessage} numberOfLines={1}>
        {commit.message}
      </Text>
      <View style={style.commitItemAuthor}>
        <Image
          source={{ uri: commit.authorAvatarUrl }}
          style={style.commitItemImage}
        />
        <View>
          <Text>{commit.authorUsername || commit.authorName}</Text>
          <Text>{moment(commit.date).fromNow()}</Text>
        </View>
      </View>
    </View>
  );
}

export default Item;
