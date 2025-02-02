import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Container,
  Grid,
  Group,
  MultiSelect,
  Pagination,
  Select,
  SimpleGrid,
  Stack,
  Text,
} from '@mantine/core';
import apiService, { Dog, SORT_OPTIONS } from '../../data/APIConnection';
import DogCards from '../Card/DogCards';
import classes from './DogsContainer.module.css';

const DOGS_PER_PAGE = 8;
const FAVORITES_KEY = 'favoriteDogs';

const DogsContainer = () => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [breeds, setBreeds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalDogs, setTotalDogs] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState('breed:asc');
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem(FAVORITES_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const navigate = useNavigate();

  const fetchBreeds = useCallback(async () => {
    try {
      const breedsList = await apiService.getBreeds();
      setBreeds(breedsList);
    } catch (err) {
      setError('Failed to load breeds');
      console.error(err);
    }
  }, []);

  const searchDogs = useCallback(
    async (page: number = 1) => {
      setIsLoading(true);
      try {
        const { dogs: dogsData, total } = await apiService.searchDogs({
          page,
          size: DOGS_PER_PAGE,
          breeds: selectedBreeds,
          sort: sortOption,
        });

        setDogs(dogsData);
        setTotalDogs(total);
        setCurrentPage(page);
      } catch (err) {
        setError('Failed to load dogs');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    },
    [selectedBreeds, sortOption]
  );

  const handleFavoriteToggle = useCallback((dogId: string) => {
    setFavorites((prevFavorites) => {
      const newFavorites = prevFavorites.includes(dogId)
        ? prevFavorites.filter((id) => id !== dogId)
        : [...prevFavorites, dogId];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      return newFavorites;
    });
  }, []);

  const handleBreedsChange = useCallback((values: string[]) => {
    setSelectedBreeds(values);
    setCurrentPage(1);
  }, []);

  const handleSortChange = useCallback((value: string) => {
    setSortOption(value);
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    fetchBreeds();
  }, [fetchBreeds]);

  useEffect(() => {
    searchDogs(1);
  }, [selectedBreeds, sortOption, searchDogs]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  const totalPages = Math.ceil(totalDogs / DOGS_PER_PAGE);

  return (
    <Container py="xl" size="xl">
      <Grid mb="md">
        <Grid.Col span={{ base: 12, sm: 5 }}>
          <MultiSelect
            label="Filter by breeds"
            placeholder="Select one or more breeds"
            data={breeds.map((breed) => ({ value: breed, label: breed }))}
            value={selectedBreeds}
            onChange={handleBreedsChange}
            searchable
            clearable
            maxDropdownHeight={400}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 5 }}>
          <Select
            label="Sort by"
            placeholder="Select sorting option"
            data={SORT_OPTIONS}
            value={sortOption}
            onChange={(value) => value && handleSortChange(value)}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 2 }} className={classes.button}>
          <Button onClick={() => navigate('/favorites')} variant="filled">
            View Favorites
          </Button>
        </Grid.Col>
      </Grid>

      <Stack gap="md">
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }}>
          {dogs.map((dog) => (
            <DogCards
              key={dog.id}
              dog={dog}
              isFavorite={favorites.includes(dog.id)}
              onFavoriteToggle={handleFavoriteToggle}
            />
          ))}
        </SimpleGrid>

        <Group justify="center">
          <Pagination
            total={totalPages}
            value={currentPage}
            onChange={searchDogs}
            size="sm"
            radius="md"
            withEdges
          />
          <Text size="sm" c="dimmed">
            Showing {Math.min(DOGS_PER_PAGE, totalDogs - (currentPage - 1) * DOGS_PER_PAGE)} dogs
            per page of {totalDogs} total
          </Text>
        </Group>
      </Stack>
    </Container>
  );
};

export default DogsContainer;
