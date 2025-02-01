import { IconHeart } from '@tabler/icons-react';
import { ActionIcon, AspectRatio, Card, Group, Image, Text } from '@mantine/core';
import { Dog } from '../../data/APIConnection';
import classes from './Cards.module.css';

interface DogCardProps {
  dog: Dog;
  isFavorite: boolean;
  onFavoriteToggle: (dogId: string) => void;
}

const DogCards = ({ dog, isFavorite, onFavoriteToggle }: DogCardProps) => {
  return (
    <Card key={dog.id} p="md" radius="md" component="a" href="#" className={classes.card}>
      <AspectRatio ratio={1920 / 1080}>
        <Image src={dog.img} alt={dog.name} />
      </AspectRatio>
      <Text mt={5}>{dog.name}</Text>
      <Group>
        <Text size="sm" c="dimmed">
          {dog.breed}
        </Text>
        <Text size="sm" c="dimmed">
          Age: {dog.age}
        </Text>
        <Text size="sm" c="dimmed">
          Zip code: {dog.zip_code}
        </Text>
        <ActionIcon
          onClick={() => onFavoriteToggle(dog.id)}
          color={isFavorite ? 'red' : 'gray'}
          variant={isFavorite ? 'filled' : 'subtle'}
        >
          <IconHeart size={16} />
        </ActionIcon>
      </Group>
    </Card>
  );
};

export default DogCards;
