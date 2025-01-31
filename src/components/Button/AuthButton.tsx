import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mantine/core';
import apiService from '../../data/APIConnection';

interface AuthButtonProps {
  isLoggedIn: boolean;
}

export const AuthButton: React.FC<AuthButtonProps> = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await apiService.logout();
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <Button
      onClick={isLoggedIn ? handleLogout : handleLoginClick}
      disabled={isLoading}
      variant="outline"
    >
      {isLoading ? 'Loading...' : isLoggedIn ? 'Logout' : 'Login'}
    </Button>
  );
};
