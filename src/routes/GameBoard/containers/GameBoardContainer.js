import { connect } from 'react-redux';
import GameBoard from '../components/GameBoard';

const mapStateToProps = (state) => ({
  home: state.home
});

export default connect(mapStateToProps)(GameBoard);
