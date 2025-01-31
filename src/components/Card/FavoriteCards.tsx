import { AspectRatio, Button, Card, Group, Image, Text } from '@mantine/core';

interface Dog {
  id: string;
  img: string;
  name: string;
  breed: string;
  age: number;
}

interface FavoriteCardsProps {
  dog: Dog;
  onRemove: (dogId: string) => void;
}

const FavoriteCards = ({ dog, onRemove }: FavoriteCardsProps) => {
  return (
    <Card key={dog.id}>
      <AspectRatio ratio={1920 / 1080}>
        <Image src={dog.img} alt={dog.name} />
      </AspectRatio>
      <Text c="dimmed" size="xs" tt="uppercase" fw={700} mt="md">
        {dog.breed}
      </Text>
      <Group justify="space-between">
        <Text fw={500}>{dog.name}</Text>
        <Button variant="subtle" color="red" onClick={() => onRemove(dog.id)}>
          Remove
        </Button>
      </Group>
    </Card>
  );
};

export default FavoriteCards;
