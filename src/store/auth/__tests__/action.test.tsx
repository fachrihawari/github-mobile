import { parseError } from '../../helpers';
import * as action from '../action';
import * as constant from '../constant';

describe('auth actions', () => {
  it('should create an action to fetch user profile', () => {
    const credentials = {
      username: 'Username',
      password: 'Password',
      OTP: ''
    }
    const fetchUserRequestAction = action.fetchUserRequest(credentials.username, credentials.password)
    const expectedAction = {
      type: constant.FETCH_USER_REQUEST,
      payload: credentials
    }
    expect(fetchUserRequestAction).toStrictEqual(expectedAction)
    expect(fetchUserRequestAction).toMatchSnapshot()
  })

  it('should create an action to fetch user profile if the user enabled 2FA', () => {
    const credentials = {
      username: 'Username',
      password: 'Password',
      OTP: '123456'
    }
    const fetchUserRequestAction = action.fetchUserRequest(credentials.username, credentials.password, credentials.OTP)
    const expectedAction = {
      type: constant.FETCH_USER_REQUEST,
      payload: credentials
    }
    expect(fetchUserRequestAction).toStrictEqual(expectedAction)
    expect(fetchUserRequestAction).toMatchSnapshot()
  })

  it('should create an action to set loader when fetching user', () => {
    const expectedAction = {
      type: constant.FETCH_USER_BEGIN
    }
    expect(action.fetchUserBegin()).toStrictEqual(expectedAction)
    expect(action.fetchUserBegin()).toMatchSnapshot()
  })

  it('should create an action to set profile user when success fetching user', () => {
    const profile = {
      id: 1,
      name: 'User'
    }
    const expectedAction = {
      type: constant.FETCH_USER_SUCCESS,
      payload: {
        profile
      }
    }
    expect(action.fetchUserSuccess(profile)).toStrictEqual(expectedAction)
    expect(action.fetchUserSuccess(profile)).toMatchSnapshot()
  })


  it('should create an action to set error message when failure fetching user because bad credentials', () => {
    const error = {
      response: {
        data: {
          message: 'Bad credentials'
        }
      }
    }
    const expectedAction = {
      type: constant.FETCH_USER_FAILURE,
      payload: {
        error: parseError(error),
        needOTP: false
      }
    }
    expect(action.fetchUserFailure(parseError(error), false)).toStrictEqual(expectedAction)
    expect(action.fetchUserFailure(parseError(error), false)).toMatchSnapshot()
  })

  it('should create an action to set error message when failure fetching user because network problem', () => {
    const error = 'Lost connection'
    const expectedAction = {
      type: constant.FETCH_USER_FAILURE,
      payload: {
        error: parseError(error),
        needOTP: false
      }
    }
    expect(action.fetchUserFailure(parseError(error), false)).toStrictEqual(expectedAction)
    expect(action.fetchUserFailure(parseError(error), false)).toMatchSnapshot()
  })

  it('should create an action to logout', () => {
    const logoutAction = action.logout()
    const expectedAction = {
      type: constant.LOGOUT
    }
    expect(logoutAction).toStrictEqual(expectedAction)
    expect(logoutAction).toMatchSnapshot()
  })
})