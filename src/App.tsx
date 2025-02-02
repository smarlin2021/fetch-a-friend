import '@mantine/core/styles.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { AdoptionsPage } from './pages/Adoptions.page';
import FavoritesPage from './pages/Favorites.page';
import { HomePage } from './pages/Home.page';
import LoginPage from './pages/Login.page';
import { theme } from './theme';

const basename = '/fetch-a-friend';
export default function App() {
  return (
    <MantineProvider theme={theme}>
      <BrowserRouter basename={basename}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dogs" element={<AdoptionsPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}
