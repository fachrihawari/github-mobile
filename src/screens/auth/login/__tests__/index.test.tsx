import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import LoginScreen from '../index';

const createTestProps = () => ({
  navigation: {
    navigate: jest.fn(),
    getParam: jest.fn(),
    setParams: jest.fn(),
  }
})

describe('rendering', () => {
  
  let wrapper: ShallowWrapper

  function setup() {
    const props = createTestProps() as any
    wrapper = shallow(<LoginScreen {...props}  />)
  }

  beforeEach(() => {
    setup()
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

  it('should continue to next page', () => {
    const newValue = 'My new value'
    wrapper.find({ testID: 'input-username' }).simulate('changeText', newValue);

    wrapper.find({ testID: 'button-continue' }).simulate('press');
  })
})
