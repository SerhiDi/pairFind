import WinPage from './components/WinPage';

export default (store) => ({
  path: 'winPage',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      cb(null, WinPage);
    }, 'WinPage');
  }
});
