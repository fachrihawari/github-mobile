import React, { ReactNode, ReactType } from 'react';
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity
} from 'react-native';

interface ITouchableProps {
  onPress: () => void;
  children: ReactNode;
}

function Touchable({ children, onPress }: ITouchableProps) {
  const Component: ReactType =
    Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;

  return <Component testID="touchable" onPress={onPress}>{children}</Component>;
}

export default Touchable;
