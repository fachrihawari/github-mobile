import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import LoginScreen from '../index';
import NavigationContext from '../../../../hooks/useNavigation';


describe('rendering', () => {

  let wrapper: ShallowWrapper

  function newInstance() {
    wrapper = shallow(<LoginScreen />)
  }

  beforeEach(() => {
    newInstance()
  })

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should change username value', () => {
    const newValue = 'My new value'
    wrapper.find({ testID: 'input-username' }).simulate('changeText', newValue);

    const inputValue = wrapper.find({ testID: 'input-username' }).prop('value')
    expect(inputValue).toBe(newValue)
  })

  it('should not continue to next page', () => {
    wrapper.find({ testID: 'button-continue' }).simulate('press');
  })
})
