import { createBrowserRouter } from 'react-router';
import App from '../../App';
import { NotFound } from '../components/errors/not-found';
import { Airdrop } from '../pages/airdrop';
import { Home } from '../pages/home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: ':airdropId', element: <Airdrop /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default router;
