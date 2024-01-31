"use client";

import axios from "axios";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  SimpleGrid,
  Skeleton,
  Text,
  Title,
  rem,
} from "@mantine/core";
import { after } from "node:test";
import Navbar from "../../components/Navbar";
import { IconShoppingCart } from "@tabler/icons-react";
import Link from "next/link";

type ProductImg = {
  contentType: String;
  name: String;
  _id: String;
};

type MyData = {
  category: String;
  price: number;
  productDescription: String;
  productName: String;
  uploadTime: String;
  productImage: Array<ProductImg>;
  _id: String;
};

function page() {
  const { _id } = useParams();
  const router = useRouter();
  const [productData, setProductData] = useState<MyData>();

  //   PRODUCT FETCHING API
  useEffect(() => {
    axios
      .get(`http://localhost:5050/product/${_id}`)
      .then((res) => {
        setProductData(res?.data?.data);
      })
      .catch((e) =>
        console.log(
          e,
          "this the error in the productinfo dynamic router in fetching products details"
        )
      );
  }, []);

  const imageUrl: any = productData?.productImage.map((i) => i.name);

  return (
    // <>
    //   <p>This is page for productinfo with id {_id}</p>
    //   <img
    //     src={`http://localhost:5050/uploads/${imageUrl}`}
    //     alt="productImage"
    //     width={200}
    //     height={200}
    //   />
    //   <p>{productData?.category}</p>
    //   <p>{productData?.price}</p>
    //   <p>{productData?.productDescription}</p>
    //   <p>{productData?.productName}</p>
    //   <p>{productData?.productImage.map((i) => i.contentType)}</p>
    //   <p>{productData?.productImage.map((i) => i.name)}</p>
    //   <p>{productData?.productImage.map((i) => i._id)}</p>
    //   <p>{productData?.uploadTime}</p>
    // </>
    <>
      <Navbar />
      <Container my="md" h={"80vh"}>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
          <Box p={"auto"} pt={"xl"}>
            <img
              src={`http://localhost:5050/uploads/${imageUrl}`}
              alt="productImage"
              width={"100%"}
              height={"80%"}
            />
          </Box>
          <Box pt={"xl"}>
            <Title order={1}>{productData?.productName}</Title>

            <Text fs={"italic"} fw={"lighter"}>
              ${productData?.price}
            </Text>
            <Text fw={"bold"} fz={"xl"} py={"xs"}>
              {productData?.category}
            </Text>
            <Text fw={"normal"} fz={"md"}>
              {productData?.productDescription}
            </Text>
            <Flex mt={"lg"} gap={"lg"}>
              <Button bg={"orange"}>
                <IconShoppingCart height={16} /> ADD TO CART
              </Button>
              <Button bg={"yellow"}>
                <Link
                  href={{
                    pathname: "/payment",
                    query: {
                      productName: `${productData?.productName}`,
                      price: `${productData?.price}`,
                      productDescription: `${productData?.productDescription}`,
                      imgurl: `${imageUrl}`,
                      id: `${productData?.productImage.map((i) => i._id)}`,
                      category: `${productData?.category}`,
                    },
                  }}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  BUY NOW
                </Link>
              </Button>
            </Flex>
          </Box>
        </SimpleGrid>
      </Container>
    </>
  );
}

export default page;
