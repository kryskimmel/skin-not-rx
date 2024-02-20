import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import SplashPage from '../components/SplashPage/SplashPage';
import UserProducts from '../components/Products/UserProducts';
import UserCollections from '../components/Collections/UserCollections';


export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <SplashPage />,
      },
      {
        path: "/users/current/products",
        element: <UserProducts />
      },
      {
        path: "/users/current/collections",
        element: <UserCollections />
      }
    ],
  },
]);
