import { Box, Title, Text, Flex } from "@mantine/core";
import React from "react";

function HomeRow() {
  return (
    <Box mt={'2.5rem'} bg={'green'}>
      <Flex justify="space-between" align="center" px={"lg"} >
        <Box >
          <Title order={1} className="bg-red-300">
            Title
          </Title>
          <Text fz={"sm"} fw={"lighter"} c={'gray'}>This is the head_down text</Text>
        </Box>
        <Box fw={"lighter"} c={'gray'} className="cursor-pointer">Show more &#8594;</Box>
      </Flex>
      {/* slider div */}
      <Box mt={'sm'}>This is the slider Row...</Box>
    </Box>
  );
}

export default HomeRow;
