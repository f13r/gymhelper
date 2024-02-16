'use client';

import React from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  Link,
} from '@nextui-org/react';
import Image from 'next/image';
import { transformForRoute } from '@/app/lib/utils/date';
import { usePathname } from 'next/navigation';

export default function NavBar() {
  const path = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    {
      title: 'Тренування',
      link: '/training/1/' + transformForRoute(new Date()),
    },
    {
      title: 'Програма',
      link: '/program/new',
    },
    {
      title: 'Вправи',
      link: '/workout',
    },
  ];

  let pageTitle = menuItems[0].title;
  menuItems.forEach(({ link, title }) => {
    if (link === path) {
      pageTitle = title;
    }
  });

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      position="static"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarBrand>
          <Image src="/logo.png" width={60} height={60} alt="logo" />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="pr-3 sm:hidden" justify="center">
        <NavbarBrand>
          <p className="text-xl font-bold text-inherit">{pageTitle}</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden gap-4 sm:flex"
        justify="center"
      ></NavbarContent>

      <NavbarContent justify="end">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        />
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map(({ title, link }, index) => (
          <NavbarMenuItem key={`${title}-${index}`}>
            <Link
              className="w-full"
              color={link === path ? 'primary' : 'foreground'}
              href={link}
              size="lg"
            >
              {title}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
