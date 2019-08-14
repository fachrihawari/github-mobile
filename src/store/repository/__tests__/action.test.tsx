import { parseError } from '../../helpers';
import * as action from '../action';
import * as constant from '../constant';

describe('repository actions', () => {
  it('should create an action to fetch commit', () => {
    const repository = 'facebook/react-ative'
    const fetchUserRequestAction = action.fetchCommitRequest(repository)
    const expectedAction = {
      type: constant.FETCH_COMMIT_REQUEST,
      payload: {
        repository,
        page: undefined,
        perPage: undefined
      }
    }
    expect(fetchUserRequestAction).toStrictEqual(expectedAction)
    expect(fetchUserRequestAction).toMatchSnapshot()
  })

  it('should create an action to fetch commit to another page', () => {
    const repository = 'facebook/react-ative'
    
    let fetchUserRequestAction = action.fetchCommitRequest(repository, 1, 10)
    const expectedAction = {
      type: constant.FETCH_COMMIT_REQUEST,
      payload: {
        repository,
        page: 1,
        perPage: 10
      }
    }
    expect(fetchUserRequestAction).toStrictEqual(expectedAction)
    expect(fetchUserRequestAction).toMatchSnapshot()
    
    fetchUserRequestAction = action.fetchCommitRequest(repository, 2, 10)
    expectedAction.payload.page = 2
    expect(fetchUserRequestAction).toStrictEqual(expectedAction)
    expect(fetchUserRequestAction).toMatchSnapshot()
  })

  it('should create an action to set loader when fetching user', () => {
    const expectedAction = {
      type: constant.FETCH_COMMIT_BEGIN
    }
    expect(action.fetchCommitBegin()).toStrictEqual(expectedAction)
    expect(action.fetchCommitBegin()).toMatchSnapshot()
  })

  it('should create an action to set commits when success fetching commits', () => {
    const expectedAction = {
      type: constant.FETCH_COMMIT_SUCCESS,
      payload: {
        commits: [],
        currentPage: 1
      }
    }
    expect(action.fetchCommitSuccess([], 1)).toStrictEqual(expectedAction)
    expect(action.fetchCommitSuccess([], 1)).toMatchSnapshot()
  })

  it('should create an action to set error message when failure fetching commits', () => {
    const error = {
      response: {
        data: {
          message: 'Not Found'
        }
      }
    }
    const expectedAction = {
      type: constant.FETCH_COMMIT_FAILURE,
      payload: {
        error: parseError(error)
      }
    }
    expect(action.fetchCommitFailure(parseError(error))).toStrictEqual(expectedAction)
    expect(action.fetchCommitFailure(parseError(error))).toMatchSnapshot()
  })

  it('should create an action to set error message when failure fetching commits because network problem', () => {
    const error = 'Lost connection'
    const expectedAction = {
      type: constant.FETCH_COMMIT_FAILURE,
      payload: {
        error: parseError(error)
      }
    }
    expect(action.fetchCommitFailure(parseError(error))).toStrictEqual(expectedAction)
    expect(action.fetchCommitFailure(parseError(error))).toMatchSnapshot()
  })
})