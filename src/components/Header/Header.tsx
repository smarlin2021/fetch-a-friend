import { IconBone } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { Group } from '@mantine/core';
import useAuth from '@/hooks/useAuth';
import { AuthButton } from '../Button/AuthButton';
import classes from './Header.module.css';

const links = [
  { link: '/', label: 'Home' },
  { link: '/dogs', label: 'Dogs for Adoption' },
  { link: '/favorites', label: 'Your Favorites' },
];

export function Header() {
  const navigate = useNavigate();
  const isVerifying = useAuth();

  if (isVerifying) {
    return null;
  }

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      onClick={(e) => {
        e.preventDefault();
        navigate(link.link);
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <h1>Fetch a Friend</h1>
          <IconBone stroke={3} />
        </Group>
        <Group gap={5} className={classes.links} visibleFrom="sm">
          {items}
          <AuthButton isLoggedIn={!isVerifying} />
        </Group>
      </div>
    </header>
  );
}
