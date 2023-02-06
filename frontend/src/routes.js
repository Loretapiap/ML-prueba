import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Home from './Pages/Home/index';
import Profile from './Pages/Profile';
import Privacy from './Pages/Privacy';
import Purchases from './Pages/Purchases';
import Product from './Pages/Purchases/product';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/privacy',
    element: <Privacy />,
  },
  {
    path: '/purchases',
    element: <Purchases />,
  },
  {
    path: '/product/:id',
    element: <Product />,
  }
]);

export const Routes = () => {

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
