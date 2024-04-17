import PropTypes from 'prop-types';
import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes  } from 'react-router-dom';

import { getUser } from 'src/utils/helper';

import LoginPage from 'src/pages/login';
import DashboardLayout from 'src/layouts/dashboard'; // Assuming you have a function to get user info from localStorage

const IndexPage = lazy(() => import('src/pages/app'));
const BlogPage = lazy(() => import('src/pages/blog'));
const UserPage = lazy(() => import('src/pages/user'));
const ProPage = lazy(() => import('src/pages/pro'));
const AdminPage = lazy(() => import('src/pages/admin'));
const ProfilePage = lazy(() => import('src/pages/profile'));
const ProductsPage = lazy(() => import('src/pages/products'));
const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const user = getUser('user'); // Fetch user from localStorage or wherever you store user data
  // check if the user is authenticated or not
  const isAuthenticated = user !== null;

  const AuthenticatedRoute = ({ element, ...props }) => isAuthenticated ? element : <Navigate to="/login" replace />;
  
  AuthenticatedRoute.propTypes = {
    element: PropTypes.element.isRequired,
  };
  
  const UnauthenticatedRoute = ({ element, ...props }) => isAuthenticated ? <Navigate to="/" replace /> : element;
  
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
        { path: 'products', element: <AuthenticatedRoute element={<ProductsPage />} /> },
        { path: 'code-promo', element: <AuthenticatedRoute element={<BlogPage />} /> },
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

