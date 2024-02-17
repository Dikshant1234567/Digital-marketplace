"use client";

import {
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  useMantineTheme,
  Title,
  useMantineColorScheme,
  ActionIcon,
  useComputedColorScheme,
} from "@mantine/core";
import { MantineLogo } from "@mantinex/mantine-logo";
import { useDisclosure } from "@mantine/hooks";
import {
  IconNotification,
  IconCode,
  IconBook,
  IconChartPie3,
  IconFingerprint,
  IconCoin,
  IconChevronDown,
  IconShoppingCart,
} from "@tabler/icons-react";
import classes from "./HeaderMegaMenu.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import myLogo from "../assets/favicon.ico";
import Mybestseller from "../assets/icons/bestsellers.jpg";
import MynewImg from "../assets/icons/new.jpg";
import MyPicks from "../assets/icons/picks.jpg";
import MyBlue from "../assets/ui-kits/blue.jpg";
import MyMixed from "../assets/ui-kits/mixed.jpg";
import MyPurple from "../assets/ui-kits/purple.jpg";
import { useEffect, useState } from "react";
import cx from "clsx";
// import { ActionIcon, useMantineColorScheme, useComputedColorScheme, Group } from '@mantine/core';
import { IconSun, IconMoon } from "@tabler/icons-react";
import classesDarkLight from "./ActionToggle.module.css";
import Cart from "./Cart";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getCookies, setCookie, deleteCookie, getCookie } from "cookies-next";
import "./navbarResponsive.modules.css";

const MyIcondata = [
  {
    name: "BestSeller",
    href: "#",
    imageSrc: Mybestseller,
  },
  {
    name: "New Arrivals",
    href: "#",
    imageSrc: MynewImg,
  },
  {
    name: "Picks",
    href: "#",
    imageSrc: MynewImg,
  },
];
const MyUiKitsData = [
  {
    name: "Blue",
    href: "#",
    imageSrc: MyBlue,
  },
  {
    name: "Mixed",
    href: "#",
    imageSrc: MyMixed,
  },
  {
    name: "Purple",
    href: "#",
    imageSrc: MyPurple,
  },
];

export default function Navbar() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const item = useAppSelector((state) => state.cartReducer.product);

  const [opened, { open, close }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();
  const { setColorScheme, clearColorScheme, colorScheme } =
    useMantineColorScheme();
  const [token, setToken] = useState<string | null>();

  // light and dark mode handler useEffect
  useEffect(() => {
    setColorScheme("dark");
  }, []);

  // Router
  const router = useRouter();

  // Token
  useEffect(() => {
    let myToken = getCookie("userToken");
    setToken(myToken);
  }, [token]);

  // DELETE TOKEN HANDLER FUNCTION
  function handlerLogout() {
    deleteCookie("userToken");
    setToken("");
  }

  return (
    <Box className="bg-slate-150 py-4">
      <header className={classes.header} id="navHeader">
        <Group justify="space-between" h="100%">
          <Link href={"/"}>
            <Image src={myLogo} alt="logo" width={40} height={40} />
          </Link>

          <Group h="100%" gap={0} visibleFrom="sm">
            {/* icons hover` */}
            <HoverCard
              width={600}
              position="bottom"
              radius="md"
              shadow="md"
              withinPortal
            >
              <HoverCard.Target>
                <Link href="#" className={classes.link}>
                  <Center inline>
                    <Box component="span" mr={5}>
                      Features
                    </Box>
                    <IconChevronDown
                      style={{ width: rem(16), height: rem(16) }}
                      color={theme.colors.blue[6]}
                    />
                  </Center>
                </Link>
              </HoverCard.Target>

              <HoverCard.Dropdown style={{ overflow: "hidden" }}>
                <Group className="items-end">
                  {MyIcondata.map((items) => (
                    <Box
                      display={"block"}
                      className="text-center"
                      key={items.name}
                    >
                      <Title order={5} mb={5}>
                        {items.name}
                      </Title>
                      <Image
                        src={items.imageSrc}
                        alt={items.name}
                        width={170}
                        className="cursor-pointer"
                      />
                    </Box>
                  ))}
                </Group>
              </HoverCard.Dropdown>
            </HoverCard>

            {/* ui kits */}
            <HoverCard
              width={600}
              position="bottom"
              radius="md"
              shadow="md"
              withinPortal
            >
              <HoverCard.Target>
                <Link href="#" className={classes.link}>
                  <Center inline>
                    <Box component="span" mr={5}>
                      Ui-kits
                    </Box>
                    <IconChevronDown
                      style={{ width: rem(16), height: rem(16) }}
                      color={theme.colors.blue[6]}
                    />
                  </Center>
                </Link>
              </HoverCard.Target>

              <HoverCard.Dropdown style={{ overflow: "hidden" }}>
                <Group>
                  {MyUiKitsData.map((items) => (
                    <Box
                      display={"block"}
                      className="text-center"
                      key={items.name}
                    >
                      <Title order={5} mb={5}>
                        {items.name}
                      </Title>
                      <Image
                        src={items.imageSrc}
                        alt={items.name}
                        width={178}
                        height={200}
                        className="cursor-pointer"
                      />
                    </Box>
                  ))}
                </Group>
              </HoverCard.Dropdown>
            </HoverCard>
          </Group>

          <Group visibleFrom="sm">
            {/* login and sinup btns and logout */}

            {token !== undefined ? (
              <>
                <Button onClick={() => router.push("/createProduct")}>
                  Create Product
                </Button>
                <Button onClick={handlerLogout}>Logout</Button>
              </>
            ) : (
              <>
                <Button variant="default" onClick={() => router.push("/login")}>
                  Log in
                </Button>
                <Button onClick={() => router.push("/sinup")}>Sign up</Button>
              </>
            )}

            {/* CART ICON */}
              <Drawer
                opened={opened}
                onClose={close}
                title="Cart"
                position="right"
                style={{ overflow: "hidden" , maxWidth :"1024px" }}
                
              >
                <Cart />
              </Drawer>
            <Box style={{ position: "relative" }}>
              <p
                style={{
                  position: "absolute",
                  top: "-1.75rem",
                  right: "-.25rem",
                  fontSize: "18px",
                  background: "purple",
                  zIndex: "99",
                  borderRadius: "50%",
                  width: "25px",
                  textAlign: "center",
                  color: "white",
                }}
              >
                {item.length !== 0 && item.length}
              </p>
              <Button
                onClick={open}
                variant="gradient"
                gradient={{ from: "gray", to: "violet", deg: 202 }}
              >
                <IconShoppingCart />
              </Button>
            </Box>

            {/* DARK AND LIGHT BTN */}
            <Group justify="center">
              <ActionIcon
                radius={"xl"}
                onClick={() =>
                  setColorScheme(colorScheme === "light" ? "dark" : "light")
                }
                variant="default"
                size="xl"
                aria-label="Toggle color scheme"
              >
                <IconSun
                  className={cx(classesDarkLight.icon, classesDarkLight.light)}
                  stroke={1.5}
                />
                <IconMoon
                  className={cx(classesDarkLight.icon, classesDarkLight.dark)}
                  stroke={1.5}
                />
              </ActionIcon>
            </Group>
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
          {/* cartBtn small screen */}
          <Box style={{ position: "relative" }} className="cartBox">
            <p
              style={{
                position: "absolute",
                top: "-1.75rem",
                right: "-.25rem",
                fontSize: "18px",
                background: "purple",
                zIndex: "99",
                borderRadius: "50%",
                width: "25px",
                textAlign: "center",
                color: "white",
              }}
            >
              {item.length !== 0 && item.length}
            </p>
            <Button
              onClick={open}
              variant="gradient"
              gradient={{ from: "gray", to: "violet", deg: 202 }}
            >
              <IconShoppingCart />
            </Button>
          </Box>

          <Group justify="center" className="dark_light_btn">
            <ActionIcon
              radius={"xl"}
              onClick={() =>
                setColorScheme(colorScheme === "light" ? "dark" : "light")
              }
              variant="default"
              size="xl"
              aria-label="Toggle color scheme"
            >
              <IconSun
                className={cx(classesDarkLight.icon, classesDarkLight.light)}
                stroke={1.5}
              />
              <IconMoon
                className={cx(classesDarkLight.icon, classesDarkLight.dark)}
                stroke={1.5}
              />
            </ActionIcon>
          </Group>
        </Group>
      </header>
      {/* mobile screen */}
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          <Box className="nav-box">
            <Link
              href={"/"}
              onClick={() => closeDrawer()}
              className="nav-links"
              style={{
                color: `${
                  colorScheme == "dark" ? "navajowhite" : "black"
                } !important`,
              }}
            >
              Icons
            </Link>
            <br />
            <hr />
            <Link
              href={"/"}
              className="nav-links"
              style={{
                color: `${
                  colorScheme == "dark" ? "navajowhite" : "black"
                } !important`,
              }}
            >
              Ui-Kits
            </Link>
          </Box>

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            {token !== undefined ? (
              <>
                <Button onClick={() => router.push("/createProduct")}>
                  Create Product
                </Button>
                <Button onClick={handlerLogout}>Logout</Button>
              </>
            ) : (
              <>
                <Button variant="default" onClick={() => router.push("/login")}>
                  Log in
                </Button>
                <Button onClick={() => router.push("/sinup")}>Sign up</Button>
              </>
            )}
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
