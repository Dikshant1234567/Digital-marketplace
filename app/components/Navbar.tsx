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
import { useEffect } from "react";

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
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();
  const { setColorScheme, clearColorScheme, colorScheme } =
    useMantineColorScheme();

  useEffect(() => {
    setColorScheme("dark");
  }, []);

  const router = useRouter();
  return (
    <Box className="bg-slate-150 py-4">
      <header className={classes.header}>
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
                    <Box display={"block"} className="text-center">
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
                    <Box display={"block"} className="text-center">
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

          {/* login and sinup btns */}
          <Group visibleFrom="sm">
            <Button variant="default" onClick={() => router.push("/login")}>
              Log in
            </Button>
            <Button onClick={() => router.push("/sinup")}>Sign up</Button>
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
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
          <Box className="block text-center text-lg font-medium">
            <Link href={"/"} onClick={() => closeDrawer()}>
              Icons
            </Link>
            <br />
            <hr className="w-24 m-auto h-2" />
            <Link href={"/"} onClick={() => closeDrawer()}>
              Ui-Kits
            </Link>
          </Box>

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <Button
              variant="default"
              onClick={() => router.push("/login")}
              className="py-24"
            >
              Log in
            </Button>
            <Button onClick={() => router.push("/sinup")}>Sign up</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
