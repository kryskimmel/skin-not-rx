import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/Forms/LoginFormPage';
import SignupFormPage from '../components/Forms/SignupFormPage';
import SplashPage from '../components/SplashPage';
import Layout from './Layout';
import ExploreProducts from '../components/Products/ExploreProducts';
import ProfilePage from '../components/ProfilePage';
import CreateProductFormPage from '../components/Forms/CreateProductFormPage/CreateProductFormPage';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <SplashPage />,
      },
      {
        path: "/login",
        element: <LoginFormPage />,
      },
      {
        path: "/signup",
        element: <SignupFormPage />,
      },
      {
        path: "/products/explore",
        element: <ExploreProducts />,
      },
      {
        path: "/current/profile",
        element: <ProfilePage />,
      },
      {
        path: "/products/create",
        element: <CreateProductFormPage/>
      }
    ],
  },
]);
