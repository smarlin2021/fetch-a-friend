import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AdoptionsPage } from './pages/Adoptions.page';
import FavoritesPage from './pages/Favorites.page';
import { HomePage } from './pages/Home.page';
import LoginPage from './pages/Login.page';

export function Router() {
  const router = createBrowserRouter([
    {
      path: '/fetch-a-friend',
      element: <HomePage />,
    },
    {
      path: '/fetch-a-friend/login',
      element: <LoginPage />,
    },
    {
      path: '/fetch-a-friend/dogs',
      element: <AdoptionsPage />,
    },
    {
      path: '/fetch-a-friend/favorites',
      element: <FavoritesPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}
