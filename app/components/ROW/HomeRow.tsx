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
import classes from "./CardsCarousel.module.css";
import RowBox from "./RowBox";

// define types
type ProductImg = {
  contentType: String;
  name: String;
  _id: String;
};
type MyValuesProps = {
  category: String;
  price: number;
  productDescription: String;
  productName: String;
  uploadTime: String;
  productImage: Array<ProductImg>;
};



function HomeRow() {
  const [myValues, setMyvalues] = useState([]);
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  useEffect(() => {
    axios
      .get(`http://localhost:5050/product/allproducts`)
      .then((response) => {
        setMyvalues(response?.data?.data);
      })
      .catch((e) => console.log(e, "This is error in CreateProduct form..."));
  }, []);

  // console.log(myValues);

  return (
    <>
      {myValues &&
        myValues.map((items: MyValuesProps, i) => {
          const {
            category,
            price,
            productDescription,
            productName,
            productImage,
          } = items;
          return (
            <Box
              mt={"2.5rem"}
              bg={"#E2E8F0"}
              key={i}
              pb={20}
              className={classes.card}
            >
              <Flex
                justify="space-between"
                align="center"
                px={"lg"}
                style={{ marginTop: "10px" }}
              >
                <Box>
                  <Title order={1} className="bg-red-300">
                    {category}
                  </Title>
                  <Text fz={"sm"} fw={"lighter"} c={"gray"}>
                    This is the head_down text
                  </Text>
                </Box>
                <Box fw={"lighter"} c={"gray"} style={{ cursor: "pointer" }}>
                  Show more &#8594;
                </Box>
              </Flex>
              {/* slider div  */}

              <Box mt={"sm"} style={{ overflowX: "hidden" }}>
                <Carousel
                  draggable
                  withKeyboardEvents
                  controlsOffset="xs"
                  // slidesToScroll={1}
                  height={300}
                  slideSize={{ base: "100%", sm: "50%", md: "50%" }}
                  // slideGap={{ base: 0, sm: "sm" }}
                  // align={0.03}
                  slideGap={{ base: rem(2), sm: "xl" }}
                  align="start"
                  slidesToScroll={mobile ? 1 : 2}
                >
                  <Carousel.Slide>
                    <RowBox
                      price={price}
                      productDescription={productDescription}
                      productName={productName}
                      productImage={productImage}
                      category={category}
                      uploadTime={Date.now().toString()}
                    />
                  </Carousel.Slide>

                  <Carousel.Slide>
                    <RowBox
                      price={price}
                      productDescription={productDescription}
                      productName={productName}
                      productImage={productImage}
                      category={category}
                      uploadTime={Date.now().toString()}
                    />
                  </Carousel.Slide>

                  <Carousel.Slide>
                    <RowBox
                      price={price}
                      productDescription={productDescription}
                      productName={productName}
                      productImage={productImage}
                      category={category}
                      uploadTime={Date.now().toString()}
                    />
                  </Carousel.Slide>

                  <Carousel.Slide>
                    <RowBox
                      price={price}
                      productDescription={productDescription}
                      productName={productName}
                      productImage={productImage}
                      category={category}
                      uploadTime={Date.now().toString()}
                    />
                  </Carousel.Slide>
                </Carousel>
              </Box>
            </Box>
          );
        })}
    </>
  );
}

export default HomeRow;
