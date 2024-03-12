"use client";
import {
  Box,
  Title,
  Text,
  Flex,
  Group,
  useMantineTheme,
  rem,
  Paper,
} from "@mantine/core";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import demoimage from "../../assets/icons/bestsellers.jpg";
import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import "@mantine/carousel/styles.css";
import RowBox from "./RowBox";
import Loader from "../common/Loader";

// define types
type ProductImg = {
  contentType: String;
  name: String;
  _id: String;
};

type MyData = {
  price: number;
  productDescription: String;
  productName: String;
  uploadTime: String;
  productImage: Array<ProductImg>;
  _id: String;
};

type MyValuesProps = {
  category: String;
  documents: Array<MyData>;
};

function HomeRow() {
  const [myValues, setMyvalues] = useState<MyValuesProps[]>();

  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const tablet = useMediaQuery(`max-width : ${theme.breakpoints.lg}`);

  useEffect(() => {
    axios
      .get(`http://localhost:5050/product/allproducts`)
      .then((response) => {
        setMyvalues(response.data?.data);
      })
      .catch((e) => console.log(e, "This is error in CreateProduct form..."));
  }, []);

  // console.log(myValues, typeof myValues);

  return (
    <>
      {!myValues ? (
        <Loader />
      ) : (
        myValues?.map((items: MyValuesProps, i) => {
          const { category, documents } = items;
          // console.log(documents, typeof documents, "documents");

          return (
            <Box key={i} id="products">
              <Box mt={"2.5rem"} pb={20}>
                <Flex
                  justify="space-between"
                  align="center"
                  px={"lg"}
                  style={{ marginTop: "10px", width: "100%" }}
                >
                  <Box>
                    <Title order={1}>{category}</Title>
                    {/* <Text fz={"sm"} fw={"lighter"} c={"gray"}>
                      This is the head_down text
                    </Text> */}
                  </Box>
                </Flex>

                <Box mt={"sm"} style={{ overflowX: "hidden" }}>
                  <Carousel
                    draggable
                    withKeyboardEvents
                    controlsOffset="xs"
                    height={680}
                    slideSize={{ base: "100%", sm: "50%", md: "50%" }}
                    slideGap={{ base: rem(2), sm: "xl" }}
                    align={"end"}
                    slidesToScroll={tablet ? 2 : mobile ? 1 : 2}
                  >
                    {Object.values(documents).map((values, i) => {
                      console.log(values, i, `${category} +${i}`);
                      return (
                        <Carousel.Slide key={i}>
                          <RowBox {...values} />
                        </Carousel.Slide>
                      );
                    })}
                  </Carousel>
                </Box>
              </Box>
              <hr
                style={{ background: "#e9ecef", height: "1px", opacity: ".2" }}
              />
            </Box>
          );
        })
      )}
    </>
  );
}

export default HomeRow;
