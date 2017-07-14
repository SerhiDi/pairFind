export default (store) => ({
  path: 'resultPage',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const ResultPage = require('./containers/ResultPageContainer').default;
      cb(null, ResultPage);
    }, 'ResultPage');
  }
});
