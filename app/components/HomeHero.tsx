import { Box, Button, Text, Title } from "@mantine/core";
import React from "react";

function HomeHero() {
  return (
    <Box className="my-12 px-6">
      <Title order={1} fz={40}>
        Your Digital marketplace for high-quality
        <span className="text-blue-600"> digital assets</span>
      </Title>
      <Text c="grey" fz={"md"} my={8}>
        Welcome to digitalHippo Every asset on our platform is verified by our
        team to ensure our highest quality standards.
      </Text>
      <Box className="lg:flex items-center justify-center  ">
        <Button className="my-4 lg:mx-10" fz={"md"}>
          Browse Trending
        </Button>
        <Title my={4} order={6}>
          Our quality promise &#8594;
        </Title>
      </Box>
    </Box>
  );
}

export default HomeHero;
