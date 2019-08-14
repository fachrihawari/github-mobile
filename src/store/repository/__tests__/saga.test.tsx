import { SagaIterator } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import * as repositoryApi from '../../../api/repository';
import { fetchCommitBegin, fetchCommitFailure, fetchCommitRequest, fetchCommitSuccess } from '../action';
import { commitRequest } from '../saga';

const commitData = {
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
const payload = {
  repository: 'Username',
  page: 0,
  perPage: 10,
}

describe('userRequest Saga', () => {
  let getUserGenerator: SagaIterator

  function setup() {
    const action = fetchCommitRequest(payload.repository, payload.page, payload.perPage)
    getUserGenerator = commitRequest(action);
  }

  beforeEach(() => {
    setup()
  });

  it('should dispatch the fetchCommitSuccess action for page < 1', () => {
    const putBegin = getUserGenerator.next().value;
    expect(putBegin).toEqual(put(fetchCommitBegin()));
    expect(putBegin).toMatchSnapshot();

    const callDescriptor = getUserGenerator.next().value;
    expect(callDescriptor).toEqual(call(repositoryApi.commits, payload.repository, payload.page, payload.perPage));
    expect(callDescriptor).toMatchSnapshot();
    
    const putFailure = getUserGenerator.next({ data: [commitData], currentPage: 0 }).value;
    expect(putFailure).toEqual(put(fetchCommitSuccess([commitData], 1)));
    expect(putFailure).toMatchSnapshot();
  });

  it('should dispatch the fetchCommitSuccess action for page >= 1', () => {
    payload.page = 1
    setup()

    const putBegin = getUserGenerator.next().value;
    expect(putBegin).toMatchSnapshot();
    expect(putBegin).toEqual(put(fetchCommitBegin()));

    const callDescriptor = getUserGenerator.next().value;
    expect(callDescriptor).toEqual(call(repositoryApi.commits, payload.repository, payload.page, payload.perPage));
    expect(callDescriptor).toMatchSnapshot();
    
    const putFailure = getUserGenerator.next({ data: [commitData], currentPage: 1 }).value;
    expect(putFailure).toEqual(put(fetchCommitSuccess([commitData], 1)));
    expect(putFailure).toMatchSnapshot();
  });

  it('should dispatch the fetchCommitFailure action', () => {
    const putBegin = getUserGenerator.next().value;
    expect(putBegin).toEqual(put(fetchCommitBegin()));
    expect(putBegin).toMatchSnapshot();

    const callDescriptor = getUserGenerator.next().value;
    expect(callDescriptor).toEqual(call(repositoryApi.commits, payload.repository, payload.page, payload.perPage));
    expect(callDescriptor).toMatchSnapshot();

    const error = {
      response: {
        data: {
          message: 'Not Found'
        },
        headers: {}
      }
    }
    // @ts-ignore
    const putFailure = getUserGenerator.throw(error).value 
    expect(putFailure).toEqual(put(fetchCommitFailure(error.response.data.message)));
    expect(putFailure).toMatchSnapshot();
  });

  
  it('should dispatch the fetchCommitFailure action if failing network', () => {
    const putBegin = getUserGenerator.next().value;
    expect(putBegin).toEqual(put(fetchCommitBegin()));
    expect(putBegin).toMatchSnapshot();

    const callDescriptor = getUserGenerator.next().value;
    expect(callDescriptor).toEqual(call(repositoryApi.commits, payload.repository, payload.page, payload.perPage));
    expect(callDescriptor).toMatchSnapshot();
    
    const putFailure = getUserGenerator.next().value;
    expect(putFailure).toEqual(put(fetchCommitFailure('You\'re offline!')));
    expect(putFailure).toMatchSnapshot();
  });
});