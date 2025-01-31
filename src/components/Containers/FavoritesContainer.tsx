import { useEffect, useState } from 'react';
import { IconAlertCircle } from '@tabler/icons-react';
import { Alert, Button, Container, Grid, Group, Loader, Stack, Text } from '@mantine/core';
import apiService, { Dog } from '../../data/APIConnection';
import FavoriteCards from '../Card/FavoriteCards';
import MatchCard from '../Card/MatchCard';

const FAVORITES_KEY = 'favoriteDogs';

const FavoritesContainer = () => {
  const [favoriteDogs, setFavoriteDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [match, setMatch] = useState<Dog | null>(null);
  const [isLoadingMatch, setIsLoadingMatch] = useState(false);

  useEffect(() => {
    loadFavoriteDogs();
  }, []);

  const loadFavoriteDogs = async () => {
    const savedFavorites = localStorage.getItem(FAVORITES_KEY);
    if (!savedFavorites) {
      setIsLoading(false);
      return;
    }

    const favoriteIds = JSON.parse(savedFavorites);
    if (!favoriteIds.length) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError('');
    try {
      const dogs = await apiService.getDogs(favoriteIds);
      setFavoriteDogs(dogs);
    } catch (err) {
      console.error('Failed to load favorite dogs:', err);
      setError(
        'Failed to load favorite dogs, please ensure that your selection total is under 100 dogs'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const removeFavorite = (dogId: string) => {
    setFavoriteDogs((prev) => prev.filter((dog) => dog.id !== dogId));
    const savedFavorites = localStorage.getItem(FAVORITES_KEY);
    if (savedFavorites) {
      const favoriteIds = JSON.parse(savedFavorites);
      const newFavorites = favoriteIds.filter((id: string) => id !== dogId);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    }
  };

  const handleFindMatch = async () => {
    if (favoriteDogs.length === 0) {
      return;
    }

    setIsLoadingMatch(true);
    setError('');

    try {
      const dogIds = favoriteDogs.map((dog) => dog.id);
      const matchId = await apiService.matchDog(dogIds);
      const matchedDogs = await apiService.getDogs([matchId]);

      if (matchedDogs && matchedDogs.length > 0) {
        setMatch(matchedDogs[0]);
      } else {
        throw new Error('No match found');
      }
    } catch (err) {
      console.error('Failed to find a match:', err);
      setError('Failed to find a match');
    } finally {
      setIsLoadingMatch(false);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <Group justify="center" p="xl">
          <Loader size="lg" />
        </Group>
      );
    }

    if (error) {
      return (
        <Alert color="red" icon={<IconAlertCircle size={16} />}>
          {error}
        </Alert>
      );
    }

    if (favoriteDogs.length === 0) {
      return (
        <Alert icon={<IconAlertCircle size={16} />} title="No favorites yet">
          Browse dogs and click the heart icon to add them to your favorites!
        </Alert>
      );
    }

    return (
      <Grid>
        {favoriteDogs.map((dog) => (
          <Grid.Col key={dog.id} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
            <FavoriteCards dog={dog} onRemove={removeFavorite} />
          </Grid.Col>
        ))}
      </Grid>
    );
  };

  return (
    <Container py="xl" size="xl">
      <Stack gap="xl">
        <Group justify="space-between">
          <Text size="xl" fw={700}>
            Your Favorite Dogs
          </Text>
          <Button
            onClick={handleFindMatch}
            disabled={favoriteDogs.length === 0 || isLoadingMatch}
            loading={isLoadingMatch}
          >
            Find a Match
          </Button>
        </Group>
        {match && <MatchCard match={match} onClear={() => setMatch(null)} />}
        {renderContent()}
      </Stack>
    </Container>
  );
};

export default FavoritesContainer;
