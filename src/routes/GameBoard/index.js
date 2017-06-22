export default (store) => ({
  path: 'gameBoard',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const GameBoard = require('./containers/GameBoardContainer').default;
      cb(null, GameBoard);
    }, 'gameBoard');
  }
});
