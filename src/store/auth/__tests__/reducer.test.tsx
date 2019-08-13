import reducer, { initialState, IState } from '../reducer'
import { AnyAction } from 'redux';
import { logout, fetchUserBegin, fetchUserSuccess, fetchUserFailure } from '../action';
import { transformProfile } from '../transform';

describe('reducer', () => {

  let currentState: IState

  function setup() {
    currentState = Object.assign({}, initialState)
  }

  beforeEach(setup)

  it('should return the initial state', () => {
    expect(reducer(undefined, {} as AnyAction)).toEqual(currentState)
    expect(reducer(undefined, logout())).toEqual(currentState)
  })

  it('should return the begin state', () => {
    currentState.isLoading = true
    expect(reducer(undefined, fetchUserBegin())).toEqual(currentState)
  })

  it('should return the success state', () => {
    const profile = {
      "login": "github",
      "id": 9919,
      "node_id": "MDEyOk9yZ2FuaXphdGlvbjk5MTk=",
      "avatar_url": "https://avatars1.githubusercontent.com/u/9919?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/github",
      "html_url": "https://github.com/github",
      "followers_url": "https://api.github.com/users/github/followers",
      "following_url": "https://api.github.com/users/github/following{/other_user}",
      "gists_url": "https://api.github.com/users/github/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/github/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/github/subscriptions",
      "organizations_url": "https://api.github.com/users/github/orgs",
      "repos_url": "https://api.github.com/users/github/repos",
      "events_url": "https://api.github.com/users/github/events{/privacy}",
      "received_events_url": "https://api.github.com/users/github/received_events",
      "type": "Organization",
      "site_admin": false,
      "name": "GitHub",
      "company": null,
      "blog": "https://github.com/about",
      "location": "San Francisco, CA",
      "email": "support@github.com",
      "hireable": null,
      "bio": "How people build software.",
      "public_repos": 306,
      "public_gists": 0,
      "followers": 0,
      "following": 0,
      "created_at": "2008-05-11T04:37:31Z",
      "updated_at": "2019-07-15T14:26:15Z"
    }

    currentState.isLoading = false
    currentState.isLoggedIn = true
    currentState.user = transformProfile(profile)
    
    expect(reducer(undefined, fetchUserSuccess(profile))).toEqual(currentState)
  })

  it('should return the failure state', () => {
    const error = 'Bad Credentials'
    currentState.error = error
    expect(reducer(undefined, fetchUserFailure(error, false))).toEqual(currentState)
  })
})