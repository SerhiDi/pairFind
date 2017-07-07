export const SET_GAME_TIME = 'SET_GAME_TIME';
export const SET_HINT_TIME = 'SET_HINT_TIME';
export const SET_BOARD_SIZE = 'SET_BOARD_SIZE';

export const setGameTime = (value) => {
  return {
    type: SET_GAME_TIME,
    payload: value
  };
};

export const setHintTime = (value) => {
  return {
    type: SET_HINT_TIME,
    payload: value
  };
};

export const setBoardSize = (value) => {
  return {
    type: SET_BOARD_SIZE,
    payload: value
  };
};

export const actions = {
  setGameTime,
  setHintTime,
  setBoardSize
};

const ACTION_HANDLERS = {
  [SET_GAME_TIME]: (state, action) => {
    return {
      ...state,
      gameTime: +action.payload
    };
  },
  [SET_HINT_TIME]: (state, action) => {
    return {
      ...state,
      hintTime: +action.payload
    };
  },
  [SET_BOARD_SIZE]: (state, action) => {
    return {
      ...state,
      boardSize: +action.payload
    };
  }
};

const initialState = {
  gameTime: 60,
  hintTime: 2,
  boardSize: 16
};
export default function homeReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
