export const CREATE_CELLS = 'CREATE_CELLS';
export const ADD_CLICK = 'ADD_CLICK';
export const UPDATE_CELL = 'UPDATE_CELL';
export const COMPLETE_CELLS = 'COMPLETE_CELLS';
export const GAME_OVER = 'GAME_OVER';
export const RESET_GAME = 'RESET_GAME';
export const UPDATE_GAMETIME = 'UPDATE_GAMETIME';

import { browserHistory } from 'react-router';
import { createCellsArray } from '../../helpers';

export const createCells = (value) => {
  return {
    type: CREATE_CELLS,
    payload: value
  };
};

export const updateCell = (index, value) => {
  return {
    type: UPDATE_CELL,
    payload: {
      index: index,
      value: value
    }
  };
};

export const completeCells = (index) => {
  return {
    type: COMPLETE_CELLS,
    payload: index
  };
};

export const addClick = () => {
  return {
    type: ADD_CLICK
  };
};

export const updateGameTime = (time) => {
  return {
    type: UPDATE_GAMETIME,
    time: time
  };
};

export const gameOver = (result) => {
  return {
    type: GAME_OVER,
    result: result
  };
};

export const resetGame = () => {
  return {
    type: RESET_GAME
  };
};

const ACTION_HANDLERS = {
  [CREATE_CELLS]: (state, action) => {
    return {
      ...state,
      cells: createCellsArray(+action.payload)
    };
  },
  [ADD_CLICK]: (state) => {
    return {
      ...state,
      clicks: state.clicks + 1
    };
  },
  [UPDATE_CELL]: (state, action) => {
    return {
      ...state,
      cells: state.cells.map((cell, i) => {
        if (i === action.payload.index) {
          return ({
            ...cell,
            show: action.payload.value
          })
        } else {
          return cell;
        }
      })
    };
  },
  [COMPLETE_CELLS]: (state, action) => {
    return {
      ...state,
      cells: state.cells.map((cell, i) => {
        if (i === action.payload) {
          return ({
            ...cell,
            complete: true
          })
        } else {
          return cell;
        }
      })
    };
  },
  [GAME_OVER]: (state, action) => {
    return {
      ...state,
      gameResult: action.result
    };
  },
  [RESET_GAME]: (state, action) => initialState,
  [UPDATE_GAMETIME]: (state, action) => {
    return {
      ...state,
      gameTime: action.time
    };
  }
};

const initialState = {
  cells: [],
  clicks: 0,
  gameTime: null,
  gameResult: null
};

export default function gameboardReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

// additional functions

let firstSelectedCell = false;
let secondSelectedCell = false;

export const clickOnCell = (cell, index) => (dispatch, getState) => {
  dispatch(addClick());
  dispatch(updateCell(index, true));
  let cells = getState().gameboard.cells;

  if (!firstSelectedCell) {
    firstSelectedCell = cell.index
  } else {
    secondSelectedCell = cell.index;
  }

  if (firstSelectedCell && secondSelectedCell) {
    if (firstSelectedCell === secondSelectedCell) {
      cells.forEach((cell, index) => {
        if (cell.index === firstSelectedCell && secondSelectedCell) {
          dispatch(completeCells(index));
        }
      });
      dispatch(checkWin());

    } else {
      setTimeout(() => {
        cells.forEach((cell, index) => {
          if (!cell.complete) {
            dispatch(updateCell(index, false));
          }
        });
      }, 300);
    }
    firstSelectedCell = null;
    secondSelectedCell = null;
  }
};

export const showAllImages = (value) => (dispatch, getState) => {
  let cells = getState().gameboard.cells;
  cells.forEach((cell, index) => {
    dispatch(updateCell(index, value));
  });
};

const checkWin = () => (dispatch, getState) => {
  let cells = getState().gameboard.cells;
  let allComplete = cells.every((elem) => elem.complete === true);
  if (allComplete) {
    dispatch(openResultPage('win'));
  }
};

export const openResultPage = (result) => (dispatch) => {
  if (result === 'win') {
    dispatch(gameOver('win'))
  } else if (result === 'lose') {
    dispatch(gameOver('lose'))
  }
  browserHistory.push({
    pathname: 'resultPage'
  });
};
