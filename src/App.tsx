import '@mantine/core/styles.css';

import { HashRouter, Route, Routes } from 'react-router-dom';

import { MantineProvider } from '@mantine/core';

import { AdoptionsPage } from './pages/Adoptions.page';
import FavoritesPage from './pages/Favorites.page';
import { HomePage } from './pages/Home.page';
import LoginPage from './pages/Login.page';
import { theme } from './theme';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dogs" element={<AdoptionsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </HashRouter>
    </MantineProvider>
  );
}
