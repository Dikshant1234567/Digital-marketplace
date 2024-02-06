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
import { useRouter } from "next/navigation";

// define types
type ProductImg = {
  contentType: String;
  name: String;
  _id: String;
};

type DataPropType = {
  price: number;
  // category: String;
  productDescription: String;
  productName: String;
  uploadTime: String;
  productImage: Array<ProductImg>;
  _id: String;
};

// MY BOX FUNCTION
function RowBox({ ...data }: DataPropType) {
  const { _id, price, productDescription, productImage, productName } = data;
  const router = useRouter();
  const theme = useMantineTheme();
  const [imgName, setImgName] = useState<String>("");

  useEffect(() => {
    let imgurl = productImage?.map((i) => i);
    let index = imgurl.length - 1;
    setImgName(imgurl[index]?.name);
  });
  // console.log(imgName);
  return (
    <>
      <Paper
        // key={i}
        onClick={() => {
          alert(_id);
          router.push(`/productinfo/${_id}`);
        }}
        ml={"5%"}
        mb={"lg "}
        // w={"200"}
        h={"500"}
        style={{
          cursor: "pointer",
          width: "90%",
          height: "auto",
          // background: "red",
          overflow: "hidden",
        }}
      >
        <img
          src={`http://localhost:5050/uploads/${imgName}`}
          alt="productImage"
          width={"full"}
          height={400}
          style={{
            overflow: "hidden",
            width: "100%",
            objectFit: "cover",
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
          // my={1}
          fz={"sm"}
          fw={"lighter"}
          fs={"italic"}
          style={{ textTransform: "capitalize" }}
        >
          {productDescription.substring(0, 65) + "..."}
        </Text>
        <Text ml={8} fz={"md"} fw={"bold"} mb={"xl"}>
          ${price}
        </Text>
      </Paper>
    </>
  );
}

export default RowBox;
