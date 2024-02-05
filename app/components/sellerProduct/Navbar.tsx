"use client";

import {useEffect, useState} from "react";
import {
  Center,
  Tooltip,
  UnstyledButton,
  Stack,
  rem,
  Group,
  Title,
  Text,
} from "@mantine/core";
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
} from "@tabler/icons-react";
import {MantineLogo} from "@mantinex/mantine-logo";
import classes from "./NavbarMinimal.module.css";
import CreateProductPage from "./CreateProductPage";
import {MyOrders} from "./MyOrders";
import Link from "next/link";

interface NavbarLinkProps {
  icon: typeof IconHome2;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({icon: Icon, label, active, onClick}: NavbarLinkProps) {
  return (
    <Tooltip label={label} position="right" transitionProps={{duration: 0}}>
      <UnstyledButton
        onClick={onClick}
        className={classes.link}
        data-active={active || undefined}>
        <Icon style={{width: rem(20), height: rem(20)}} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

export function NavbarMinimal() {
  const [active, setActive] = useState(0);
  const [productId, setProductId] = useState(null);

  const mockdata = [
    {
      icon: IconHome2,
      label: "Orders",
      component: <MyOrders setActive={setActive} setProductId={setProductId} />,
    },
    {
      icon: IconGauge,
      label: "Create Product",
      component: <CreateProductPage productId={productId} setProductId={setProductId} />,
    },
  ];

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));

  return (
    <>
    <div>
      <div style={{marginLeft: "10rem"}}>
        <Group pt="sm" h={"10vh"} align="baseline">
          <Title fz={35} fw={"600"}>
            <Link href={"/myProduct"} style={{textDecoration: "none"}}>
              Myproduct
            </Link>
          </Title>
          <Text fz={30}>\</Text>
          <Title fz={25} fw={"lighter"}>
            <Link href={"/"} style={{textDecoration: "none"}}>
              Order
            </Link>
          </Title>
          {
            active === 1 && (
              <>
                <Text fz={30}>\</Text>
                <Title fz={25} fw={"lighter"}>
                  {productId ? "Edit" : "Create"}
                </Title>{" "}
              </>
            )}
        </Group>
      </div>
      <div style={{display: "flex", gap: "80px",height:'90vh'}}>
        <nav className={classes.navbar}>
          <div className={classes.navbarMain}>
            <Stack justify="center" gap={20}>
              {links}
            </Stack>
          </div>
        </nav>
        <div style={{flexGrow: "1"}}>{mockdata[active]["component"]}</div>
      </div>
      </div>
    </>
  );
}
