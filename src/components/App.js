import React from 'react';
import { browserHistory, Router } from 'react-router';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';

class App extends React.Component {
  componentWillMount() {
    browserHistory.push('/');
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <Router history={browserHistory} children={this.props.routes}/>
      </Provider>
    );
  }
}

App.propTypes = {
  store: PropTypes.object.isRequired,
  routes: PropTypes.object.isRequired,
};

export default App;
