import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Autocomplete, Button, Container, Paper, Title } from '@mantine/core';
import apiService from '../../data/APIConnection';
import classes from './Login.module.css';

const Login = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  interface FormData {
    name: string;
    email: string;
  }

  const handleChange = (name: string, value: string) => {
    setFormData((prev: FormData) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await apiService.login(formData);
      setIsLoggedIn(true);
      setFormData({ name: '', email: '' });
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container size={600} my={50}>
      <Title ta="center" className={classes.title}>
        Welcome to Fetch a Friend
      </Title>
      <Paper>
        {error && <h1>{error}</h1>}
        <Autocomplete
          onChange={(value) => handleChange('name', value)}
          value={formData.name}
          placeholder="Type here"
          label="Name"
          className={classes.input}
        />
        <Autocomplete
          onChange={(value) => handleChange('email', value)}
          value={formData.email}
          placeholder="Type here"
          label="Email"
          className={classes.input}
        />
        <Button disabled={isLoading} onClick={handleLogin}>
          {isLoading ? 'Loading...' : <>Sign In</>}
        </Button>
      </Paper>
    </Container>
  );
};

export default Login;
