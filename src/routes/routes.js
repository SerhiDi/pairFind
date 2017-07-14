import CoreLayout from '../layouts/PageLayout/PageLayout';
import Home from './Home';
import GameBoard from './GameBoard';
import ResultPage from './Result';

export const createRoutes = (store) => ({
  path: '/',
  component: CoreLayout,
  indexRoute: Home(store),
  childRoutes: [
    GameBoard(store),
    ResultPage(store)
  ]
});

export default createRoutes;
