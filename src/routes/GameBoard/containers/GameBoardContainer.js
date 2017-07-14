import { connect } from 'react-redux';
import GameBoard from '../components/GameBoard';
import { createCells, showAllImages, openResultPage, updateGameTime, resetGame } from '../modules/gameBoard';

const mapStateToProps = (state) => ({
  settings: state.settings,
  cells: state.gameboard.cells,
  clicks: state.gameboard.clicks
});

const mapDispatchToProps = {
  createCells,
  showAllImages,
  updateGameTime,
  openResultPage,
  resetGame
};

export default connect(mapStateToProps, mapDispatchToProps)(GameBoard);
