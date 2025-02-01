import DogsContainer from '../components/Containers/DogsContainer';
import { Header } from '../components/Header/Header';
import useAuth from '../hooks/useAuth';

export function AdoptionsPage() {
  useAuth();
  return (
    <>
      <Header />
      <DogsContainer />
    </>
  );
}
