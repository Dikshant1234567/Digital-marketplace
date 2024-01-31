"use client";

import React from "react";
import Navbar from "../Navbar";
import { Box, SimpleGrid, Text, Title } from "@mantine/core";
import { useParams, useSearchParams } from "next/navigation";
import { Container } from "postcss";

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
  uploadTime?: String;
  productImage: Array<ProductImg>;
  id: String;
};

function Payment() {
  const params = useSearchParams();

  const id = params.get("id");
  const category = params.get("category");
  const price = params.get("price");
  const imgUrl = params.get("imgurl");
  const productName = params.get("productName");
  const productDescription = params.get("productDescription");
  console.log(id, price, imgUrl, productDescription, productName, category);

  return (
    <>
      <Navbar />

      <>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
          <Box>
            <Title>This is the Payment box</Title>
          </Box>

          {/* PRODUCT DETAILS SECTION */}
          <Box style={{ marginLeft: "10%" }}>
            <Title order={1} my={"xs"}>
              Product Details
            </Title>
            <img
              src={`http://localhost:5050/uploads/${imgUrl}`}
              alt="productImage"
              style={{
                width: "70%",
                height: "50%",
              }}
            />

            {/* <Box style={{ textAlign: "start" }}> */}
              <Title order={3}>{productName}</Title>

              <Text fs={"italic"} fw={"lighter"}>
                ${price}
              </Text>
              <Text fw={"bold"} fz={"xl"} >
                {category}
              </Text>
              <Text fw={"normal"} fz={"md"}>
                {productDescription}
              </Text>
            {/* </Box> */}
          </Box>
        </SimpleGrid>
      </>
    </>
  );
}

export default Payment;
