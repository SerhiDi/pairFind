import { connect } from 'react-redux';
import {
  setGameTime,
  setHintTime,
  setBoardSize
} from '../modules/homeView';
import HomeView from '../components/HomeView';

const mapDispatchToProps = {
  setGameTime,
  setHintTime,
  setBoardSize
};

const mapStateToProps = (state) => ({
  settings: state.settings
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
