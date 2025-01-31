import useAuth from '@/hooks/useAuth';
import DogsContainer from '../components/Containers/DogsContainer';
import { Header } from '../components/Header/Header';

export function AdoptionsPage() {
  useAuth();
  return (
    <>
      <Header />
      <DogsContainer />
    </>
  );
}
