import { Center, Tooltip, UnstyledButton, Stack, rem, useMantineColorScheme, Collapse, ScrollArea } from '@mantine/core';
import {
  IconHome2,
  IconFingerprint,
  IconMoon,
  IconSun,
  IconPackage,
  IconHome,
  IconShield,
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
  { icon: IconHome, label: 'Combat Maker' },
  { icon: IconPackage, label: 'Packs' },
  { icon: IconShield, label: 'Armors' },
  { icon: IconFingerprint, label: 'Backgrounds' },
  { icon: IconFingerprint, label: 'Classes' },
  { icon: IconFingerprint, label: 'Conditions' },
  { icon: IconFingerprint, label: 'Feats' },
  { icon: IconFingerprint, label: 'Magic Items' },
  { icon: IconFingerprint, label: 'Monsters' },
  { icon: IconFingerprint, label: 'Planes' },
  { icon: IconFingerprint, label: 'Races' },
  { icon: IconFingerprint, label: 'Sections' },
  { icon: IconFingerprint, label: 'Spell Lists' },
  { icon: IconFingerprint, label: 'Spells' },
  { icon: IconFingerprint, label: 'Weapons' },
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
        <div className={classes.navbarMain}>
          <Stack justify="center" gap={5}>
            {links}
          </Stack>
        </div>

        <Stack justify="center" gap={5}>
          {/* <NavbarLink icon={IconSwitchHorizontal} label="Change account" /> */}
          {/* <NavbarLink icon={IconLogout} label="Logout" /> */}
          <NavbarLink onClick={toggleMode} icon={icon} label="Mode switch" />
        </Stack>
      </nav>
    </div>
  );
}