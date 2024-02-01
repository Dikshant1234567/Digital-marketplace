import { Container, Group, ActionIcon, rem } from "@mantine/core";
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
} from "@tabler/icons-react";
import { MantineLogo } from "@mantinex/mantine-logo";
import classes from "./FooterSocial.module.css";
import myLogo from "../../assets/favicon.ico";
import Image from "next/image";

export function Footer() {
  return (
    <div
      className={classes.footer}
      // style={{ height: "5rem", backgroundColor: "red" }}
    >
      <Container className={classes.inner}>
        {/* <MantineLogo size={28} /> */}
        {/* <img  src='../../assets/favicon.ico' alt="AppIcon" width={28} height={28} /> */}
        <Image src={myLogo} alt="logo" width={40} height={40} />
        <Group
          gap={0}
          className={classes.links}
          justify="flex-end"
          wrap="nowrap"
        >
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandTwitter
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandYoutube
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandInstagram
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
}

export default Footer;
