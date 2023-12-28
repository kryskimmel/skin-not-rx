import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/Forms/LoginFormPage';
import SignupFormPage from '../components/Forms/SignupFormPage';
import Layout from './Layout';
import SplashPage from '../components/SplashPage/SplashPage';
import ExploreProducts from '../components/Products/ExploreProducts';
import ProfilePage from '../components/ProfilePage';
import CurrUserInfo from '../components/ProfilePage/CurrUserInfo';
import CreateProductModal from '../components/Modals/CreateProductModal';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <SplashPage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "current/info",
        element: <CurrUserInfo />,
      },
      {
        path: "products/explore",
        element: <ExploreProducts />,
      },
      {
        path: "current/profile",
        element: <ProfilePage />,
      },
    ],
  },
]);
