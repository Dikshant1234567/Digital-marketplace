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

// MY BOX FUNCTION
function RowBox(props: MyValuesProps) {
  const router = useRouter();
  const [propsData, setPropsData] = useState<MyData>();

  useEffect(() => {
    props.documents.map((i) => {
      // console.log(i);
      setPropsData(i);
    });
  }, []);

  // console.log(Object.values(propsData))
  // console.log(props.documents , typeof props.documents)
  // console.log(typeof propsData , propsData)
  // console.log(propsData?._id)
  // console.log(propsData?.productImage.map(i => i.name))
  const imageUrl = propsData?.productImage.map((i) => i.name);
  const theme = useMantineTheme();
  return (
    <>
      <Paper
        onClick={() => {
          alert(propsData?._id);
          router.push(`/productinfo/${propsData?._id}`);
        }}
        ml={"5%"}
        mb={"lg "}
        // w={"200"}
        h={'500'}
        style={{
          cursor: "pointer",
          width: "90%",
          height: "auto",
          // background: "red",
          overflow: "hidden",
        }}
      >
        <img
          src={`http://localhost:5050/uploads/${imageUrl}`}
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
          {propsData?.productName}
        </Text>
        <Text
          ml={8}
          // my={1}
          fz={"sm"}
          fw={"lighter"}
          fs={"italic"}
          style={{ textTransform: "capitalize" }}
        >
          {propsData?.productDescription.substring(0, 65) + "..."}
        </Text>
        <Text ml={8} fz={"md"} fw={"bold"} mb={'xl'}>
          ${propsData?.price}
        </Text>
      </Paper>
    </>
  );
}

export default RowBox;
