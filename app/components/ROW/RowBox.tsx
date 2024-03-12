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
  Button,
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
import { addCart } from "../../redux/slices/cart-slice";
import { useAppDispatch } from "../../redux/hooks";

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
  const dispatch = useAppDispatch();

  // backend url
  const backendUrl = 'https://digital-marketplace-backend.onrender.com'


  useEffect(() => {
    let imgurl = productImage?.map((i) => i);
    let index = imgurl.length - 1;
    setImgName(imgurl[index]?.name);
  });


  return (
    <Paper
      ml={"5%"}
      mb={"lg "}
      style={{
        width: "90%",
        height: "auto",
        overflow: "hidden",
      }}
    >
      <Image
        src={`${backendUrl}/uploads/${imgName}`}
        alt="productImage"
        width="400"
        height={500}
        style={{
          // border :"1px solid gray",
          cursor: "pointer",
          overflow: "hidden",
          width: "100%",
          // objectFit: "contain",
        }}
        onClick={() => {
          // alert(_id);
          router.push(`/productinfo/${_id}`);
        }}
      />
      <Group justify="space-between" py={"xs"}>
        <Box>
          <Text fz={"xl"} fw={"bold"} style={{ textTransform: "capitalize" }}>
            {productName}
          </Text>
          <Text
            fz={"sm"}
            fw={"lighter"}
            fs={"italic"}
            style={{ textTransform: "capitalize" }}
          >
            {productDescription.substring(0, 45) + "..."}
          </Text>
          <Text fz={"md"} fw={"bold"} my={"2"}>
            ${price}
          </Text>
        </Box>
        <Button
          onClick={() => dispatch(addCart(data))}
          variant="gradient"
          gradient={{ from: "gray", to: "violet", deg: 202 }}
        >
          Add to cart
        </Button>
      </Group>
    </Paper>
  );
}

export default RowBox;
