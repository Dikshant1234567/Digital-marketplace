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

type DocumentType = {
  price: number;
  productDescription: String;
  productName: String;
  uploadTime: String;
  productImage: Array<ProductImg>;
  _id: String;
};

// MY BOX FUNCTION
function RowBox(document: DocumentType[]) {
  const router = useRouter();
  const theme = useMantineTheme();
  const [imgName, setImgName] = useState<String>("");

  useEffect(() => {
    Object.values(document).map((val) => {
      const imageUrl = val?.productImage.map((i) => i);
      let imageLength = imageUrl.length - 1;
      let imgValue = imageUrl[imageLength]?.name;
      setImgName(imgValue);
    });
  });
  console.log(imgName);
  return (
    <>
      {Object.values(document).map((val, i) => {
        return (
          <Paper
            key={i}
            onClick={() => {
              alert(val?._id);
              router.push(`/productinfo/${val?._id}`);
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
              {val?.productName}
            </Text>
            <Text
              ml={8}
              // my={1}
              fz={"sm"}
              fw={"lighter"}
              fs={"italic"}
              style={{ textTransform: "capitalize" }}
            >
              {val?.productDescription.substring(0, 65) + "..."}
            </Text>
            <Text ml={8} fz={"md"} fw={"bold"} mb={"xl"}>
              ${val?.price}
            </Text>
          </Paper>
        );
      })}
    </>
  );
}

export default RowBox;
