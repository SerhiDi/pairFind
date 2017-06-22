import { connect } from 'react-redux';
import LosePage from '../components/LosePage';

const mapStateToProps = (state) => ({
  home: state.home
});

export default connect(mapStateToProps)(LosePage);
