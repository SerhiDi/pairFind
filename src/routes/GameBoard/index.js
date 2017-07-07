import { injectReducer } from '../../store/reducers';

export default (store) => ({
  path: 'gameBoard',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const GameBoard = require('./containers/GameBoardContainer').default;
      const reducer = require('./modules/gameBoard').default;
      injectReducer(store, {
        key: 'gameboard',
        reducer
      });
      cb(null, GameBoard);
    }, 'gameBoard');
  }
});
