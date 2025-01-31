import FavoritesContainer from '../components/Containers/FavoritesContainer';
import { Header } from '../components/Header/Header';
import useAuth from '../hooks/useAuth';

const FavoritesPage = () => {
  useAuth();
  return (
    <>
      <Header />
      <FavoritesContainer />
    </>
  );
};
export default FavoritesPage;
