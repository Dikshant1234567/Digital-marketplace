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
import { addCart } from "../../redux/slices/cart-slice";
import { useAppDispatch } from "../../redux/hooks";
import Loader from "../../components/common/Loader";

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

function ProductInfoComponent() {
  const { _id } = useParams();
  const router = useRouter();
  const [productData, setProductData] = useState<MyData>();
  const [imgUrl, setImgUrl] = useState<String>("");
  const dispatch = useAppDispatch();
  const backendUrl = "https://digital-marketplace-backend.onrender.com";

  //   PRODUCT FETCHING API
  useEffect(() => {
    axios
      .get(`${backendUrl}/product/${_id}`)
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

  useEffect(() => {
    let imageUrl: any = productData?.productImage.map((i) => i.name);
    console.log(imageUrl, typeof imageUrl);

    if (typeof imageUrl === "object") {
      let index: number = imageUrl?.length - 1;
      setImgUrl(imageUrl[index]);
    } else if (typeof imageUrl === "string") {
      setImgUrl(imageUrl);
    }
  }, [productData]);

  console.log(productData);
  return (
    <>
      {!productData ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <Container my="md" h={"80vh"}>
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
              <Box p={"auto"} pt={"xl"}>
                <Image
                  src={`${backendUrl}/uploads/${imgUrl}`}
                  alt="productImage"
                  width={200}
                  height={200}
                  className="productInfo-img"
                  style={{
                    width: "100%",
                  }}
                />
              </Box>

              <Box pt={"xl"} mb={"3rem"}>
                <Title order={1} style={{ textTransform: "capitalize" }}>
                  {productData?.productName}
                </Title>

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
                  <Button
                    onClick={() => dispatch(addCart(productData))}
                    variant="gradient"
                    gradient={{ from: "gray", to: "violet", deg: 202 }}
                  >
                    <IconShoppingCart height={16} /> ADD TO CART
                  </Button>
                  <Button
                    variant="gradient"
                    gradient={{ from: "lime", to: "green", deg: 67 }}
                  >
                    <Link
                      href={{
                        pathname: "/payment",
                        query: {
                          productName: `${productData?.productName}`,
                          price: `${productData?.price}`,
                          productDescription: `${productData?.productDescription}`,
                          imgurl: `${imgUrl}`,
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
      )}
    </>
  );
}

export default ProductInfoComponent;
