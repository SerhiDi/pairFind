// import HomeView from './components/HomeView'
//
// // Sync route definition
// export default {
//   component : HomeView
// }

import { injectReducer } from '../../store/reducers';

export default (store) => ({
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const HomeView = require('./containers/HomeViewContainer').default;
      const reducer = require('./modules/homeView').default;
      injectReducer(store, {
        key: 'home',
        reducer
      });
      cb(null, HomeView);
    }, 'homeView');
  }
});
