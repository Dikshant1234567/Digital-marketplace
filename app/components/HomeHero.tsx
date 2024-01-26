import { Box, Button, Text, Title } from "@mantine/core";
import React from "react";

function HomeHero() {
  return (
    <Box  px={"md"}  style={{textAlign :"center"}}>
      <Title order={1} fz={40} mt={25}>
        Your Digital marketplace for high-quality
        <span className="text-blue-600"> digital assets</span>
      </Title>
      <Text c="grey" fz={"md"} my={8} fw={"lighter"} className="my-4">
        Welcome to digitalHippo Every asset on our platform is verified by our
        team to ensure our highest quality standards.
      </Text>
      <Box className="lg:flex items-center justify-center flex" mt={"lg"}>
        <Button className="my-4 lg:mx-10" fz={"md"} mr={"md"}>
          Browse Trending
        </Button>
        <Button variant="transparent" my={4} >
          Our quality promise &#8594;
        </Button>
      </Box>
    </Box>
  );
}

export default HomeHero;
