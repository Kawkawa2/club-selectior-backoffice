import PropTypes from 'prop-types';
import { lazy, Suspense, useState, useEffect } from 'react';
import { Outlet, Navigate, useRoutes  } from 'react-router-dom';

import { getUser } from 'src/utils/helper';

import LoginPage from 'src/pages/login';
import DashboardLayout from 'src/layouts/dashboard'; // Assuming you have a function to get user info from localStorage

const IndexPage = lazy(() => import('src/pages/app'));
const PromoCodePage = lazy(() => import('src/pages/promoCode'));
const UserPage = lazy(() => import('src/pages/user'));
const ProPage = lazy(() => import('src/pages/pro'));
const AdminPage = lazy(() => import('src/pages/admin'));
const ProfilePage = lazy(() => import('src/pages/profile'));
const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  // check if the user is authenticated or not
  
  const [storedUser, setStoredUser] = useState(null);

  const isAuthenticated = Boolean(storedUser);

  useEffect(() => {
    setStoredUser(getUser());
  }, []);
  
  const AuthenticatedRoute = ({ element }) => isAuthenticated ? element : <Navigate to="/login" />;
  
  AuthenticatedRoute.propTypes = {
    element: PropTypes.element.isRequired,
  };
  
  const UnauthenticatedRoute = ({ element}) => isAuthenticated ? <Navigate to="/"/> : element;
  
  UnauthenticatedRoute.propTypes = {
    element: PropTypes.element.isRequired,
  };
  
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <AuthenticatedRoute element={<IndexPage />} />, index: true }, // Wrap IndexPage with AuthenticatedRoute
        { path: 'particuliers', element: <AuthenticatedRoute element={<UserPage />} /> },
        { path: 'professionnels', element: <AuthenticatedRoute element={<ProPage />} /> },
        { path: 'admins', element: <AuthenticatedRoute element={<AdminPage />} /> },
        { path: 'profil', element: <AuthenticatedRoute element={<ProfilePage />} /> },
        { path: 'code-promo', element: <AuthenticatedRoute element={<PromoCodePage />} /> },
      ],
    },
    {
      path: 'login',
      element: <UnauthenticatedRoute element={<LoginPage />} />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}

