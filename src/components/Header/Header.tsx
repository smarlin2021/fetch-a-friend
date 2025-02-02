import { IconBone, IconMoon, IconSun } from '@tabler/icons-react';
import cx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { ActionIcon, Group, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import useAuth from '../../hooks/useAuth';
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
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

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
        <Group justify="center">
          <ActionIcon
            onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
            variant="default"
            size="xl"
            aria-label="Toggle color scheme"
          >
            <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
            <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
          </ActionIcon>
        </Group>
        <Group gap={5} className={classes.links} visibleFrom="sm">
          {items}
          <AuthButton isLoggedIn={!isVerifying} />
        </Group>
      </div>
    </header>
  );
}
