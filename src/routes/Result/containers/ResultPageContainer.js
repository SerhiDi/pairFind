import { connect } from 'react-redux';
import ResultPage from '../components/ResultPage';

const mapStateToProps = (state) => ({
  clicks: state.gameboard.clicks,
  gameTime: state.gameboard.gameTime,
  gameResult: state.gameboard.gameResult
});

export default connect(mapStateToProps)(ResultPage);
