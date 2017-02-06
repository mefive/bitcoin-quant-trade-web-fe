import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';

import reducer from 'reducers';
import sagas from 'sagas';

const sagaMiddleware = createSagaMiddleware();
const logger = createLogger();

export default function (initialState = {}) {
  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(thunk, promise, sagaMiddleware, logger)
  );

  sagaMiddleware.run(sagas);

  return store;
}
