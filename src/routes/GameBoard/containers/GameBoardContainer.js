import { connect } from 'react-redux';
import GameBoard from '../components/GameBoard';
import { createCells, getBoardWidth } from '../modules/gameBoard';

const mapStateToProps = (state) => ({
  settings: state.settings,
  cells: state.gameboard.cells,
  clicks: state.gameboard.clicks,
});

const mapDispatchToProps = {
  createCells,
  getBoardWidth,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameBoard);
