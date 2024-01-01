import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import SplashPage from '../components/SplashPage/SplashPage';
import Profile from '../components/Profile';
import Explore from '../components/Explore';


export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <SplashPage />,
      },
      {
        path: "/explore",
        element: <Explore />
      },
      {
        path: "users/current/profile",
        element: <Profile />,
      },
    ],
  },
]);
