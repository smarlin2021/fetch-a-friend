import { AspectRatio, Button, Card, Grid, Image, Stack, Text } from '@mantine/core';
import classes from './Cards.module.css';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

interface Dog {
  id: string;
  img: string;
  name: string;
  breed: string;
  age: number;
}

interface MatchCardProps {
  match: Dog;
  onClear: () => void;
}

const MatchCard = ({ match, onClear }: MatchCardProps) => {
  useEffect
(() => {
  if (!match) return;

  // Wait until the card starts appearing
  const timer = setTimeout(() => {
    confetti({
  particleCount: 100,
  spread: 80,
  origin: {
    x: 0.5,
    y: 0.55,
  },
  colors: [
    "#ff6b6b",
    "#ff922b",
    "#ffd43b",
    "#69db7c",
    "#74c0fc",
    "#da77f2",
  ],

      disableForReducedMotion: true,
    });
  }, 300);

  return () => clearTimeout(timer);
}, [match]);

  

  return (
    <div className={classes.matchOverlay}>
    <div className={classes.matchCard}>
      <div className={classes.matchHeader}></div>
    <Card p="xl" radius="md" withBorder className={classes.card}>
      <Text size="lg" fw={700} mb="md">
        We found a match for you!
      </Text>
      <Grid>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <AspectRatio ratio={1920 / 1080}>
            <Image src={match.img} alt={match.name} />
          </AspectRatio>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Stack>
            <Text size="xl" fw={200}>
              Congratulations! We fetched you a furry friend perfect for your wants in a best
              friend. Here are the details:
            </Text>
            <Text size="xl" fw={800}>
              Name: {match.name}
            </Text>
            <Text size="xl">Breed: {match.breed}</Text>
            <Text size="xl">Age: {match.age}</Text>
            <Text size="sm" pt="md">
              Want to try again?
            </Text>
            <Button variant="filled" color="blue" onClick={onClear}>
              Clear Match
            </Button>
          </Stack>
        </Grid.Col>
      </Grid>
    </Card>
    </div>
  </div>
);
};


export default MatchCard;
