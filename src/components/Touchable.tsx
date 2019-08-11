import React, { ReactNode, ReactType } from 'react';
import {
  Platform,
  TouchableNativeFeedback,
  TouchableNativeFeedbackProps,
  TouchableOpacity,
  TouchableOpacityProps
} from 'react-native';

export interface ITouchableProps extends TouchableOpacityProps, TouchableNativeFeedbackProps {
  onPress: () => void;
  children: ReactNode;
}

function Touchable({ children, onPress, ...props }: ITouchableProps) {
  const Component: ReactType =
    Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;

  return <Component {...props} onPress={onPress}>{children}</Component>;
}

export default Touchable;
