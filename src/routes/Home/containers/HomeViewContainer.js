import { connect } from 'react-redux';
import { setGameTime, setHintTime, setBoardSize } from '../modules/homeView';
import HomeView from '../components/HomeView';

const mapDispatchToProps = {
  setGameTime,
  setHintTime,
  setBoardSize
};

const mapStateToProps = (state) => ({
  home: state.home
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
