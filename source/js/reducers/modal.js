import { handleActions } from 'redux-actions';

import * as actionTypes from 'config/actionTypes';

const initialState = {
  queue: [],
  current: null
};

export default handleActions({
  [actionTypes.PUSH_MODAL]: (state, { payload }) => {
    const queue = [...state.queue];

    queue.push(payload);

    let { current } = state;

    if (current == null) {
      current = queue[queue.length - 1];
    }

    return {
      queue,
      current
    };
  },

  [actionTypes.POP_MODAL]: (state, { payload }) => {
    const queue = [...state.queue];

    queue.pop();

    let { current } = state;

    if (queue.length === 0) {
      current = null;
    }
    else {
      current = queue[queue.length - 1];
    }

    return {
      queue,
      current
    };
  }
}, initialState);
