import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../data/APIConnection'; // Adjust path as needed

const useAuth = () => {
  const navigate = useNavigate();
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        await apiService.getBreeds();
        setIsVerifying(false);
      } catch (error) {
        navigate('/fetch-a-friend/login');
        setIsVerifying(false);
      }
    };

    checkSession();
  }, [navigate]);

  return isVerifying;
};

export default useAuth;
