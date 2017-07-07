import ResultPage from './components/ResultPage';

export default (store) => ({
  path: 'resultPage',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      cb(null, ResultPage);
    }, 'ResultPage');
  }
});
