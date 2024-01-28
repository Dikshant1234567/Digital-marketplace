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
type ProductImgType = {
  contentType: String;
  name: String;
};
// MY BOX FUNCTION
function RowBox(props: MyValuesProps) {
  const { category, price, productDescription, productName, productImage } =
    props;

  const [imageUrl, setImageUrl] = useState<String>("");

  useEffect(() => {
    productImage.map((item) =>setImageUrl(item.name) );
  }, []);

//   console.log(Object.values(imageUrl) , Object.keys(imageUrl));
console.log(imageUrl)

  return (
    <>
      <Paper
        ml={"5%"}
        mb={"lg "}
        // w={"200"}
        h={300}
        style={{
          cursor: "pointer",
          width: "100%",
          height: "auto",
          background: "#F5F5DC",
        }}
      >
        <Image
        //   src={demoimage}
            src={'imageUrl'}
          alt="produc1"
          width={200}
          height={180}
          style={{
            overflow: "hidden",
            height: "auto",
            // width: "100%",
            borderRadius: "5px",
          }}
        />
        <Text
          ml={8}
          fz={"xl"}
          fw={"bold"}
          style={{ textTransform: "capitalize" }}
        >
          {productName}
        </Text>
        <Text
          ml={8}
          my={1}
          fz={"sm"}
          fw={"lighter"}
          fs={"italic"}
          style={{ textTransform: "capitalize" }}
        >
          {productDescription}
        </Text>
        <Text ml={8} fz={"md"} fw={"bold"}>
          ${price}
        </Text>
      </Paper>
    </>
  );
}

export default RowBox;
