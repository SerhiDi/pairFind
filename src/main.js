import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './store/createStore';
import './styles/main.scss';

// Store Initialization
// ------------------------------------
const store = createStore(window.__INITIAL_STATE__);
// Render Setup
// ------------------------------------
const ROOT_NODE = document.getElementById('root');

let render = () => {
  const App = require('./components/App').default;
  const routes = require('./routes/routes').default(store);
  ReactDOM.render(
    <App store={store} routes={routes}/>,
    ROOT_NODE
  );
};

// Development Tools
// ------------------------------------
if (__DEV__) {
  if (module.hot) {
    const renderApp = render;
    const renderError = (error) => {
      const RedBox = require('redbox-react').default;

      ReactDOM.render(<RedBox error={error}/>, ROOT_NODE);
    };

    render = () => {
      try {
        renderApp();
      } catch (e) {
        console.error(e);
        renderError(e);
      }
    };

    // Setup hot module replacement
    module.hot.accept([
        './components/App',
      './routes/routes',
      ], () =>
        setImmediate(() => {
          ReactDOM.unmountComponentAtNode(ROOT_NODE);
          render();
        })
    );
  }
}

// Let's Go!
// ------------------------------------
if (!__TEST__) render();
