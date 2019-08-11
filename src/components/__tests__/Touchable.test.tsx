import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import { Text, TouchableOpacity, Image, Platform, TouchableNativeFeedback } from 'react-native';

import Touchable from '../Touchable';

export const createTestProps = () => ({
  handlePress: jest.fn(),
  touchableLabel: 'Awesome Touchable',
  touchableImage: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
})

describe('rendering', () => {
  const props = createTestProps()

  let wrapper: ShallowWrapper
  
  function newInstance() {
    wrapper = shallow(
      <Touchable testID='touchable' onPress={props.handlePress}>
        <Image source={{ uri: props.touchableImage }} />
        <Text>{props.touchableLabel}</Text>
      </Touchable>
    )
  }

  beforeEach(() => {
    newInstance()  
  })

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should render <TouchableOpacity/> for iOS', () => {
    Platform.OS = 'ios';
    newInstance()
    expect(wrapper.find({ testID: 'touchable' }).type() === TouchableOpacity).toBe(true)
  })

  it('should render <TouchableNativeFeedback/> for Android', () => {
    Platform.OS = 'android';
    newInstance()
    expect(wrapper.find({ testID: 'touchable' }).type() === TouchableNativeFeedback).toBe(true)
  })

  it('has pressed the touchable', () => {
    wrapper.simulate('press')
    expect(props.handlePress).toHaveBeenCalledTimes(1)
  })

})
