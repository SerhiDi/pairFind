export const CREATE_CELLS = 'CREATE_CELLS';
export const ADD_CLICK = 'ADD_CLICK';
export const UPDATE_CELL = 'UPDATE_CELL';

export const createCells = (value) => {
  return {
    type: CREATE_CELLS,
    payload: value
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
      clicks: state.clicks + 1
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

this.audio = new Audio(soundFile);
import soundFile from '../../../audio/click.mp3';
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

export const checkWin = (array) => {
  return array.every((elem) => elem.complete === true);
};

export const clickOnCell = (cell) => (dispatch, getState) => {
  this.audio.play();
  dispatch({type: 'ADD_CLICK'});

  // cell.show = true;

  if (!this.firstSelectedCell) {
    this.firstSelectedCell = cell.index;
  } else {
    this.secondSelectedCell = cell.index;
  }

  if (this.firstSelectedCell && this.secondSelectedCell) {
    if (this.firstSelectedCell === this.secondSelectedCell) {
      this.state.cells.forEach((cell) => {
        if (cell.index === this.firstSelectedCell && this.secondSelectedCell) {
          cell.complete = true;
        }
      });

      this.win();

    } else {
      setTimeout(() => {
        this.state.cells.forEach((cell) => {
          if (!cell.complete) {
            cell.show = false;
          }
        });
      }, 300);
    }
    this.firstSelectedCell = null;
    this.secondSelectedCell = null;
  }
};


export const win = () => {
  let allComplete = checkWin(this.state.cells);
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
  clearInterval(this.countdownTimer);
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

