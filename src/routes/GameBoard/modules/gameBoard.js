export const CREATE_CELLS = 'CREATE_CELLS';
export const ADD_CLICK = 'ADD_CLICK';
export const UPDATE_CELL = 'UPDATE_CELL';
export const COMPLETE_CELLS = 'COMPLETE_CELLS';

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
  }
};

const initialState = {
  cells: [],
  clicks: 0
};

export default function gameboardReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

//additional functions

import soundFile from '../../../audio/click.mp3';
const audio = new Audio(soundFile);
const IMAGE_MAX_INDEX = 50;

let createImagesArray = (arrayLength) => {
  const imagesIndexes = [...new Array(IMAGE_MAX_INDEX)].map((_, i) => {
    return i + 1;
  });

  return [...new Array(arrayLength)]
    .map(() => {
      let randomElem = Math.floor(Math.random() * imagesIndexes.length);
      return {
        index: imagesIndexes.splice(randomElem, 1)[0],
        show: false,
        complete: false,
        pairFind: false
      };
    });
};

const createCellsArray = (cellsCount) => {
  let randomImagesArray = createImagesArray(cellsCount / 2);
  let copyArray = JSON.parse(JSON.stringify(randomImagesArray));
  let doubleArray = randomImagesArray.concat(copyArray);

  return [...new Array(cellsCount)].map(() => {
    let randomElem = Math.floor(Math.random() * doubleArray.length);
    return doubleArray.splice(randomElem, 1)[0];
  });
};

let firstSelectedCell = false;
let secondSelectedCell = false;

export const clickOnCell = (cell, index) => (dispatch, getState) => {
  audio.play();
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
    clearInterval(this.countdownTimer);

    setTimeout(() => {
      browserHistory.push({
        pathname: 'winPage',
        state: {
          clicks: this.state.clicks,
          time: this.props.home.gameTime - this.state.countdown
        }
      });
    }, 500);
  }
};


export const gameOver = () => {
  clearInterval(countdownTimer);
  browserHistory.push({
    pathname: 'losePage',
    state: {
      clicks: this.state.clicks
    }
  });
};

export const formatSeconds = (seconds) => {
  let minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  return (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
};
