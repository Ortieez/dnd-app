import { useState } from 'react';
import { Center, Tooltip, UnstyledButton, Stack, rem, useMantineColorScheme } from '@mantine/core';
import {
  IconHome2,
  IconGauge,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconCalendarStats,
  IconUser,
  IconSettings,
  IconLogout,
  IconSwitchHorizontal,
  IconMoon,
  IconSun,
  IconPackage,
  IconHome,
} from '@tabler/icons-react';
import classes from './Sidebar.module.css';

interface NavbarLinkProps {
  icon: typeof IconHome2;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton onClick={onClick} className={classes.link} data-active={active || undefined}>
        <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
  { icon: IconHome, label: 'Dashboard' },
  { icon: IconPackage, label: 'Packs' },
  { icon: IconCalendarStats, label: 'Releases' },
  { icon: IconUser, label: 'Account' },
  { icon: IconFingerprint, label: 'Security' },
  { icon: IconSettings, label: 'Settings' },
];

export function Sidebar({ active, setActive }) {
  const { setColorScheme, colorScheme } = useMantineColorScheme();

  const icon = colorScheme === 'light' ? IconMoon : IconSun;

  const toggleMode = () => {
    setColorScheme(colorScheme === "light" ? "dark" : "light");
  }

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));

  return (
    <div className='flex flex-col h-screen'>
      <nav className={classes.navbar + " h-full"}>
        <Center>
          {/* <MantineLogo type="mark" size={30} /> */}
        </Center>

        <div className={classes.navbarMain}>
          <Stack justify="center" gap={0}>
            {links}
          </Stack>
        </div>

        <Stack justify="center" gap={0}>
          {/* <NavbarLink icon={IconSwitchHorizontal} label="Change account" /> */}
          {/* <NavbarLink icon={IconLogout} label="Logout" /> */}
          <NavbarLink onClick={toggleMode} icon={icon} label="Mode switch" />
        </Stack>
      </nav>
    </div>
  );
}