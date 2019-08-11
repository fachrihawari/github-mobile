import { all } from 'redux-saga/effects';

import authSaga from './auth/saga';
import repositorySaga from './repository/saga';

export default function* rootSaga() {
  yield all([...authSaga, ...repositorySaga]);
}
