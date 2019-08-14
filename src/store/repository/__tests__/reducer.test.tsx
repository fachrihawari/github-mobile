import { AnyAction } from 'redux';
import { fetchCommitBegin, fetchCommitFailure, fetchCommitSuccess } from '../action';
import reducer, { ICommit, initialState, IState } from '../reducer'
import { transformCommit } from '../transform';

describe('reducer', () => {

  let currentState: IState

  function setup() {
    currentState = Object.assign({}, initialState)
  }

  beforeEach(setup)

  it('should return the initial state', () => {
    expect(reducer(undefined, {} as AnyAction)).toEqual(currentState)
    expect(reducer(undefined, {} as AnyAction)).toMatchSnapshot()
  })

  it('should return the begin state', () => {
    currentState.isLoading = true
    expect(reducer(undefined, fetchCommitBegin())).toEqual(currentState)
    expect(reducer(undefined, fetchCommitBegin())).toMatchSnapshot()
  })

  it('should return the success state', () => {
    const firstData = [
      {
        'sha': '825e1c087c314cb06345d6e6e521cb3739f7687b',
        'commit': {
          'author': {
            'name': 'Joshua Gross',
            'email': 'joshuagross@fb.com',
            'date': '2019-08-13T20:33:20Z'
          },
          'committer': {
            'name': 'Facebook Github Bot',
            'email': 'facebook-github-bot@users.noreply.github.com',
            'date': '2019-08-13T20:37:24Z'
          },
          'message': 'Commands: support Float arguments\n\nSummary: Support codegen\'ing commands with Float arguments.\n\nReviewed By: mdvacca\n\nDifferential Revision: D16785534\n\nfbshipit-source-id: 8174ae40762c1114b87a023cb2b69b2515dc6e23',
          'tree': {
            'sha': '6aa4f8972b798d30c92f61d454ddb9494746b198',
            'url': 'https://api.github.com/repos/facebook/react-native/git/trees/6aa4f8972b798d30c92f61d454ddb9494746b198'
          },
          'url': 'https://api.github.com/repos/facebook/react-native/git/commits/825e1c087c314cb06345d6e6e521cb3739f7687b',
          'comment_count': 0,
          'verification': {
            'verified': false,
            'reason': 'unsigned',
            'signature': null,
            'payload': null
          }
        },
        'url': 'https://api.github.com/repos/facebook/react-native/commits/825e1c087c314cb06345d6e6e521cb3739f7687b',
        'html_url': 'https://github.com/facebook/react-native/commit/825e1c087c314cb06345d6e6e521cb3739f7687b',
        'comments_url': 'https://api.github.com/repos/facebook/react-native/commits/825e1c087c314cb06345d6e6e521cb3739f7687b/comments',
        'author': {
          'login': 'JoshuaGross',
          'id': 70602,
          'node_id': 'MDQ6VXNlcjcwNjAy',
          'avatar_url': 'https://avatars1.githubusercontent.com/u/70602?v=4',
          'gravatar_id': '',
          'url': 'https://api.github.com/users/JoshuaGross',
          'html_url': 'https://github.com/JoshuaGross',
          'followers_url': 'https://api.github.com/users/JoshuaGross/followers',
          'following_url': 'https://api.github.com/users/JoshuaGross/following{/other_user}',
          'gists_url': 'https://api.github.com/users/JoshuaGross/gists{/gist_id}',
          'starred_url': 'https://api.github.com/users/JoshuaGross/starred{/owner}{/repo}',
          'subscriptions_url': 'https://api.github.com/users/JoshuaGross/subscriptions',
          'organizations_url': 'https://api.github.com/users/JoshuaGross/orgs',
          'repos_url': 'https://api.github.com/users/JoshuaGross/repos',
          'events_url': 'https://api.github.com/users/JoshuaGross/events{/privacy}',
          'received_events_url': 'https://api.github.com/users/JoshuaGross/received_events',
          'type': 'User',
          'site_admin': false
        },
        'committer': {
          'login': 'facebook-github-bot',
          'id': 6422482,
          'node_id': 'MDQ6VXNlcjY0MjI0ODI=',
          'avatar_url': 'https://avatars3.githubusercontent.com/u/6422482?v=4',
          'gravatar_id': '',
          'url': 'https://api.github.com/users/facebook-github-bot',
          'html_url': 'https://github.com/facebook-github-bot',
          'followers_url': 'https://api.github.com/users/facebook-github-bot/followers',
          'following_url': 'https://api.github.com/users/facebook-github-bot/following{/other_user}',
          'gists_url': 'https://api.github.com/users/facebook-github-bot/gists{/gist_id}',
          'starred_url': 'https://api.github.com/users/facebook-github-bot/starred{/owner}{/repo}',
          'subscriptions_url': 'https://api.github.com/users/facebook-github-bot/subscriptions',
          'organizations_url': 'https://api.github.com/users/facebook-github-bot/orgs',
          'repos_url': 'https://api.github.com/users/facebook-github-bot/repos',
          'events_url': 'https://api.github.com/users/facebook-github-bot/events{/privacy}',
          'received_events_url': 'https://api.github.com/users/facebook-github-bot/received_events',
          'type': 'User',
          'site_admin': false
        },
        'parents': [
          {
            'sha': '724fe11472cb874ce89657b2c3e7842feff04205',
            'url': 'https://api.github.com/repos/facebook/react-native/commits/724fe11472cb874ce89657b2c3e7842feff04205',
            'html_url': 'https://github.com/facebook/react-native/commit/724fe11472cb874ce89657b2c3e7842feff04205'
          }
        ]
      }
    ]
    currentState.isLoading = false
    currentState.commits = firstData.map(transformCommit)
    currentState.page = 1
    expect(reducer(undefined, fetchCommitSuccess(firstData, 1))).toEqual(currentState)
    expect(reducer(undefined, fetchCommitSuccess(firstData, 1))).toMatchSnapshot()

    const secondData = [{
      'sha': '724fe11472cb874ce89657b2c3e7842feff04205',
      'node_id': 'MDY6Q29tbWl0MjkwMjg3NzU6NzI0ZmUxMTQ3MmNiODc0Y2U4OTY1N2IyYzNlNzg0MmZlZmYwNDIwNQ==',
      'commit': {
        'author': {
          'name': 'Adam Ernst',
          'email': 'adamjernst@fb.com',
          'date': '2019-08-13T18:09:56Z'
        },
        'committer': {
          'name': 'Facebook Github Bot',
          'email': 'facebook-github-bot@users.noreply.github.com',
          'date': '2019-08-13T18:14:06Z'
        },
        'message': 'Add reexport_all_header_dependencies to (yet more) misc rules\n\nSummary: Currently this is the default, but I plan to toggle the default to False shortly. False is better for build speed, as it forces you to separate deps and exported_deps.\n\nReviewed By: williamtwilson\n\nDifferential Revision: D16785991\n\nfbshipit-source-id: 8cb73b87f1dfa50f21c0c12df1579054cdc99e6e',
        'tree': {
          'sha': 'b8cbcd70cf34176b5f9de429e3e48d599f01ad7d',
          'url': 'https://api.github.com/repos/facebook/react-native/git/trees/b8cbcd70cf34176b5f9de429e3e48d599f01ad7d'
        },
        'url': 'https://api.github.com/repos/facebook/react-native/git/commits/724fe11472cb874ce89657b2c3e7842feff04205',
        'comment_count': 0,
        'verification': {
          'verified': false,
          'reason': 'unsigned',
          'signature': null,
          'payload': null
        }
      },
      'url': 'https://api.github.com/repos/facebook/react-native/commits/724fe11472cb874ce89657b2c3e7842feff04205',
      'html_url': 'https://github.com/facebook/react-native/commit/724fe11472cb874ce89657b2c3e7842feff04205',
      'comments_url': 'https://api.github.com/repos/facebook/react-native/commits/724fe11472cb874ce89657b2c3e7842feff04205/comments',
      'author': {
        'login': 'adamjernst',
        'id': 97944,
        'node_id': 'MDQ6VXNlcjk3OTQ0',
        'avatar_url': 'https://avatars1.githubusercontent.com/u/97944?v=4',
        'gravatar_id': '',
        'url': 'https://api.github.com/users/adamjernst',
        'html_url': 'https://github.com/adamjernst',
        'followers_url': 'https://api.github.com/users/adamjernst/followers',
        'following_url': 'https://api.github.com/users/adamjernst/following{/other_user}',
        'gists_url': 'https://api.github.com/users/adamjernst/gists{/gist_id}',
        'starred_url': 'https://api.github.com/users/adamjernst/starred{/owner}{/repo}',
        'subscriptions_url': 'https://api.github.com/users/adamjernst/subscriptions',
        'organizations_url': 'https://api.github.com/users/adamjernst/orgs',
        'repos_url': 'https://api.github.com/users/adamjernst/repos',
        'events_url': 'https://api.github.com/users/adamjernst/events{/privacy}',
        'received_events_url': 'https://api.github.com/users/adamjernst/received_events',
        'type': 'User',
        'site_admin': false
      },
      'committer': {
        'login': 'facebook-github-bot',
        'id': 6422482,
        'node_id': 'MDQ6VXNlcjY0MjI0ODI=',
        'avatar_url': 'https://avatars3.githubusercontent.com/u/6422482?v=4',
        'gravatar_id': '',
        'url': 'https://api.github.com/users/facebook-github-bot',
        'html_url': 'https://github.com/facebook-github-bot',
        'followers_url': 'https://api.github.com/users/facebook-github-bot/followers',
        'following_url': 'https://api.github.com/users/facebook-github-bot/following{/other_user}',
        'gists_url': 'https://api.github.com/users/facebook-github-bot/gists{/gist_id}',
        'starred_url': 'https://api.github.com/users/facebook-github-bot/starred{/owner}{/repo}',
        'subscriptions_url': 'https://api.github.com/users/facebook-github-bot/subscriptions',
        'organizations_url': 'https://api.github.com/users/facebook-github-bot/orgs',
        'repos_url': 'https://api.github.com/users/facebook-github-bot/repos',
        'events_url': 'https://api.github.com/users/facebook-github-bot/events{/privacy}',
        'received_events_url': 'https://api.github.com/users/facebook-github-bot/received_events',
        'type': 'User',
        'site_admin': false
      },
      'parents': [
        {
          'sha': '8a82503b54e3c63230a07de99ec082b2dcb54bc7',
          'url': 'https://api.github.com/repos/facebook/react-native/commits/8a82503b54e3c63230a07de99ec082b2dcb54bc7',
          'html_url': 'https://github.com/facebook/react-native/commit/8a82503b54e3c63230a07de99ec082b2dcb54bc7'
        }
      ]
    }]
    currentState.commits = secondData.map(transformCommit)
    currentState.page = 2

    const newState = Object.assign({}, currentState)
    newState.commits = currentState.commits.concat(secondData.map(transformCommit))
    expect(reducer(currentState, fetchCommitSuccess(secondData, 2))).toEqual(newState)
    expect(reducer(currentState, fetchCommitSuccess(secondData, 2))).toMatchSnapshot()
  })

  it('should return the failure state', () => {
    const error = 'Bad Credentials'
    currentState.error = error
    expect(reducer(undefined, fetchCommitFailure(error))).toEqual(currentState)
    expect(reducer(undefined, fetchCommitFailure(error))).toMatchSnapshot(currentState)
  })
})