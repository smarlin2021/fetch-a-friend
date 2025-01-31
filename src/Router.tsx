import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AdoptionsPage } from './pages/Adoptions.page';
import FavoritesPage from './pages/Favorites.page';
import { HomePage } from './pages/Home.page';
import LoginPage from './pages/Login.page';

export function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '/dogs',
      element: <AdoptionsPage />,
    },
    {
      path: '/favorites',
      element: <FavoritesPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}
