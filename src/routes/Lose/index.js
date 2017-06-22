import LosePage from './components/LosePage';

export default (store) => ({
  path: 'losePage',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      cb(null, LosePage);
    }, 'LosePage');
  }
});
