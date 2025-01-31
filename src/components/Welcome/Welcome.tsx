import { useNavigate } from 'react-router-dom';
import { Button, Container, Overlay, Text, Title } from '@mantine/core';
import classes from './Welcome.module.css';

export function Welcome() {
  const navigate = useNavigate();
  return (
    <div className={classes.hero}>
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
        opacity={1}
        zIndex={0}
      />
      <Container className={classes.container} size="md">
        <Title className={classes.title}>Looking for your own bestie? Fetch a friend!</Title>
        <Text className={classes.description} size="xl" mt="xl">
          Browse dogs near and far! Whatever you're looking for in a best friend, we'll help you
          find it – Search by breed, location, name and more! We hope you find your next furry
          companion here at Fetch a Friend.
        </Text>

        <Button
          variant="fill"
          size="xl"
          radius="lg"
          className={classes.button}
          onClick={(e) => {
            e.preventDefault();
            navigate('/dogs');
          }}
        >
          Browse our dogs
        </Button>
        <Text size="sm" mt="sm">
          Photo taken by Sierra Marlin
        </Text>
      </Container>
    </div>
  );
}
