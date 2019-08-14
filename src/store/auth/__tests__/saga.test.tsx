import { SagaIterator } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import * as userApi from '../../../api/user';
import { fetchUserBegin, fetchUserFailure, fetchUserRequest, fetchUserSuccess } from '../action';
import { userRequest } from '../saga';

const profile = {
  'login': 'github',
  'id': 9919,
  'node_id': 'MDEyOk9yZ2FuaXphdGlvbjk5MTk=',
  'avatar_url': 'https://avatars1.githubusercontent.com/u/9919?v=4',
  'gravatar_id': '',
  'url': 'https://api.github.com/users/github',
  'html_url': 'https://github.com/github',
  'followers_url': 'https://api.github.com/users/github/followers',
  'following_url': 'https://api.github.com/users/github/following{/other_user}',
  'gists_url': 'https://api.github.com/users/github/gists{/gist_id}',
  'starred_url': 'https://api.github.com/users/github/starred{/owner}{/repo}',
  'subscriptions_url': 'https://api.github.com/users/github/subscriptions',
  'organizations_url': 'https://api.github.com/users/github/orgs',
  'repos_url': 'https://api.github.com/users/github/repos',
  'events_url': 'https://api.github.com/users/github/events{/privacy}',
  'received_events_url': 'https://api.github.com/users/github/received_events',
  'type': 'Organization',
  'site_admin': false,
  'name': 'GitHub',
  'company': null,
  'blog': 'https://github.com/about',
  'location': 'San Francisco, CA',
  'email': 'support@github.com',
  'hireable': null,
  'bio': 'How people build software.',
  'public_repos': 306,
  'public_gists': 0,
  'followers': 0,
  'following': 0,
  'created_at': '2008-05-11T04:37:31Z',
  'updated_at': '2019-07-15T14:26:15Z'
}
const credentials = {
  username: 'Username',
  password: 'Password',
  OTP: '',
}

describe('userRequest Saga', () => {
  let getUserGenerator: SagaIterator


  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {

    const action = fetchUserRequest(credentials.username, credentials.password, credentials.OTP)
    getUserGenerator = userRequest(action);
  });

  it('should dispatch the fetchUserSuccess action if it requests the data successfully', () => {

    const putBegin = getUserGenerator.next().value;
    expect(putBegin).toMatchSnapshot();
    expect(putBegin).toEqual(put(fetchUserBegin()));

    const callDescriptor = getUserGenerator.next().value;
    expect(callDescriptor).toMatchSnapshot();
    expect(callDescriptor).toEqual(call(userApi.profile, credentials.username, credentials.password, credentials.OTP));
    
    const putFailure = getUserGenerator.next({ data: profile }).value;
    expect(putFailure).toMatchSnapshot();
    expect(putFailure).toEqual(put(fetchUserSuccess(profile)));
  });

  it('should dispatch the fetchUserFailure action', () => {
    const putBegin = getUserGenerator.next().value;
    expect(putBegin).toMatchSnapshot();
    expect(putBegin).toEqual(put(fetchUserBegin()));

    const callDescriptor = getUserGenerator.next().value;
    expect(callDescriptor).toMatchSnapshot();
    expect(callDescriptor).toEqual(call(userApi.profile, credentials.username, credentials.password, credentials.OTP));

    const error = {
      response: {
        data: {
          message: 'Bad Request'
        },
        headers: {}
      }
    }
    // @ts-ignore
    const putFailure = getUserGenerator.throw(error).value 
    expect(putFailure).toMatchSnapshot();
    expect(putFailure).toEqual(put(fetchUserFailure('Bad Request', false)));
  });

  it('should dispatch the fetchUserFailure action if 2FA enabled', () => {
    const putBegin = getUserGenerator.next().value;
    expect(putBegin).toMatchSnapshot();
    expect(putBegin).toEqual(put(fetchUserBegin()));

    const profileCallDescriptor = getUserGenerator.next().value;
    expect(profileCallDescriptor).toMatchSnapshot();
    expect(profileCallDescriptor).toEqual(call(userApi.profile, credentials.username, credentials.password, credentials.OTP));

    const error = {
      response: {
        data: {
          message: 'Must specify two-factor authentication OTP code.',
          documentation_url: 'https://developer.github.com/v3/auth#working-with-two-factor-authentication'
        },
        headers: {
          'x-github-otp': 'required; sms'
        }
      }
    }
    
    // @ts-ignore
    const authorizeCallDescriptor = getUserGenerator.throw(error).value;
    expect(authorizeCallDescriptor).toMatchSnapshot();
    expect(authorizeCallDescriptor).toEqual(call(userApi.authorize, credentials.username, credentials.password));
    
    const putFailure = getUserGenerator.next(error).value;    
    expect(putFailure).toMatchSnapshot();
    expect(putFailure).toEqual(put(fetchUserFailure('Must specify two-factor authentication OTP code.', true)));
    
  });
  
  it('should dispatch the fetchUserFailure action if failing network', () => {
    const putBegin = getUserGenerator.next().value;
    expect(putBegin).toMatchSnapshot();
    expect(putBegin).toEqual(put(fetchUserBegin()));

    const callDescriptor = getUserGenerator.next().value;
    expect(callDescriptor).toMatchSnapshot();
    expect(callDescriptor).toEqual(call(userApi.profile, credentials.username, credentials.password, credentials.OTP));
    
    const putFailure = getUserGenerator.next().value;
    expect(putFailure).toMatchSnapshot();
    expect(putFailure).toEqual(put(fetchUserFailure('You\'re offline!', false)));
  });
});