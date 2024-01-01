import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/Forms/LoginFormPage';
import SignupFormPage from '../components/Forms/SignupFormPage';
import Layout from './Layout';
import SplashPage from '../components/SplashPage/SplashPage';
import ExploreProducts from '../components/Products/ExploreProducts';
import ProfilePage from '../components/ProfilePage';
import CurrUserInfo from '../components/ProfilePage/CurrUserInfo';
import CreateProductModal from '../components/Modals/CreateProductModal';
import ExploreCollections from '../components/Collections/ExploreCollections/ExploreCollections';
import CreateCollectionModal from '../components/Modals/CreateCollectionModal';
import Favorites from '../components/Favorites/Favorites';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <SplashPage />,
      },
      // {
      //   path: "login",
      //   element: <LoginFormPage />,
      // },
      // {
      //   path: "signup",
      //   element: <SignupFormPage />,
      // },
      // {
      //   path: "current/info",
      //   element: <CurrUserInfo />,
      // },
      // {
      //   path: "products/explore",
      //   element: <ExploreProducts />,
      // },
      // {
      //   path: "collections/explore",
      //   element: <ExploreCollections/>,
      // },
      // {
      //   path: "current/profile",
      //   element: <ProfilePage />,
      // },
      // {
      //   path: "collections",
      //   element: <CreateCollectionModal />
      // },
      // {
      //   path: "current/favorites",
      //   element: <Favorites />
      // }
    ],
  },
]);
