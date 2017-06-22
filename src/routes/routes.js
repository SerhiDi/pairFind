import CoreLayout from '../layouts/PageLayout/PageLayout';
import Home from './Home';
import GameBoard from './GameBoard';
import LosePage from './Lose';
import WinPage from './Win';

export const createRoutes = (store) => ({
  path: '/',
  component: CoreLayout,
  indexRoute: Home(store),
  childRoutes: [
    GameBoard(store),
    LosePage(store),
    WinPage(store)
  ]
});

export default createRoutes;
