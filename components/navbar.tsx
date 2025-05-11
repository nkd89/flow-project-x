'use client';

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  SearchIcon,
  Logo,
} from "@/components/icons";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar} from "@heroui/react";
import { signOut, useSession } from "next-auth/react";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import { User } from "@/types/user";

export const Navbar = () => {

  const { data: sessionData } = useSession();
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    if (sessionData) {
      setSession(sessionData);
      if (sessionData.user) {
        setUser(sessionData?.user as User);
      }
    } else {
      setSession(null);
      setUser(null);
    }
  }, [sessionData]);

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <HeroUINavbar maxWidth="full"  className="wrapper" position="sticky">
      <NavbarContent justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-2" href="/">
            <Logo />
            <p className="font-bold text-inherit">xunapu</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        {/* <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem> */}
        <NavbarItem >
          {user !== null ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                showFallback 
                isBordered
                as="button"
                className="transition-transform"
                name={`${user?.first_name} ${user?.last_name}`}
                src={user?.avatar}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile-item" className="h-14 gap-2">
                <p className="font-semibold">Профиль</p>
                <p className="font-semibold">{user?.email ?? user?.phone}</p>
              </DropdownItem>
              <DropdownItem key="system-item">Мб кнопка</DropdownItem>
              <DropdownItem key="configurations-item">Не кнопка</DropdownItem>
              <DropdownItem onClick={() => signOut()} key="logout-item" color="danger">
                Выйти
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          ) : (
            <NextLink
              className={clsx(
                linkStyles({ color: "foreground" }),
                "data-[active=true]:text-primary data-[active=true]:font-medium",
              )}
              color="foreground"
              href="/profile/login"
            >
              Войти
            </NextLink>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarItem>
          {user ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                showFallback 
                isBordered
                as="button"
                className="transition-transform"
                name={`${user?.first_name} ${user?.last_name}`}
                src={user?.avatar}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile-item" className="h-14 gap-2">
                <p className="font-semibold">Профиль</p>
                <p className="font-semibold">{user?.email ?? user?.phone}</p>
              </DropdownItem>
              <DropdownItem key="system-item">Мб кнопка</DropdownItem>
              <DropdownItem key="configurations-item">Не кнопка</DropdownItem>
              <DropdownItem onClick={() => {
                signOut();
              }} key="logout-item" color="danger">
                Выйти
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          ) : (
            <NextLink
              className={clsx(
                linkStyles({ color: "foreground" }),
                "data-[active=true]:text-primary data-[active=true]:font-medium",
              )}
              color="foreground"
              href="/profile/login"
            >
              Войти
            </NextLink>
          )}
        </NavbarItem>
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {/* {searchInput} */}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
