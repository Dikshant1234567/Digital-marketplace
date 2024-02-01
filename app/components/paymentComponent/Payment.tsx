"use client";

import React, { useState } from "react";
import Navbar from "../Navbar";
import {
  Box,
  Button,
  FileInput,
  Flex,
  NumberInput,
  SimpleGrid,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { Container } from "postcss";
import { useForm } from "@mantine/form";

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
  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      expireDate: "",
      cardNo: "",
      cvv: "",
    },
  });
  const params = useSearchParams();
  const router = useRouter();

  const id = params.get("id");
  const category = params.get("category");
  const price = params.get("price");
  const imgUrl = params.get("imgurl");
  const productName = params.get("productName");
  const productDescription = params.get("productDescription");
  // console.log(id, price, imgUrl, productDescription, productName, category);
  const { firstName, lastName, expireDate, cardNo, cvv } = form.values;
  console.log(firstName, lastName, expireDate, cardNo, cvv);

  return (
    <>
      <Navbar />

      {/* PRODUCT DETAILS */}
      <Flex
        my={"md"}
        h={"5rem"}
        justify={"flex-start"}
        align={"center"}
        gap={"md"}
      >
        <Title order={2} mr={"md"}>
          Product :
        </Title>
        <Flex
          my={"md"}
          justify={"flex-start"}
          align={"center"}
          style={{
            background: "#4340401a",
            borderRadius: "10px",
            width: "max-content",
            cursor: "pointer",
          }}
          gap={"md"}
          onClick={() => router.back()}
        >
          <img
            src={`http://localhost:5050/uploads/${imgUrl}`}
            alt="productImage"
            style={{
              width: "5rem",
              height: "5rem",
              borderRadius: "10px",
            }}
          />
          <Box pr={"md"}>
            <Text fw={"bold"} fz={"md"}>
              {productName?.substring(0 , 13) + "..."}
            </Text>
            <Text fs={"italic"} fw={"lighter"}>
              ${price}
            </Text>
          </Box>
        </Flex>
      </Flex>
      <hr
        style={{
          height: "1",
          margin: "0px",
          width: "372px",
          backgroundColor: "#f8f9fa",
        }}
      />

      {/* PAYMENT FORM */}
      <Box mt={"xl"}>
        <form action="">
          <Title m={"auto"}>Enter the Details</Title>
          <Flex gap={"md"} mt={"md"} style={{ width: "100%" }}>
            <TextInput
              required
              label="FirstName"
              name="firstName"
              placeholder="first name"
              radius={"md"}
              w={"50%"}
              value={form.values.firstName}
              {...form.getInputProps("firstName")}
            />
            <TextInput
              required
              label="LastName"
              name="lastName"
              placeholder="lastname"
              radius={"md"}
              w={"50%"}
              value={form.values.lastName}
              {...form.getInputProps("lastName")}
            />
          </Flex>
          <NumberInput
            my={"md"}
            label="Card Number"
            name="cardNo."
            placeholder="Enter the card no"
            required
            value={form.values.cardNo}
            {...form.getInputProps("cardNo")}
          />
          <TextInput
            required
            label="Expire Date"
            name="expireDate"
            placeholder="MM/YY"
            radius={"md"}
            value={form.values.expireDate}
            {...form.getInputProps("expireDate")}
          />
          <NumberInput
            required
            label="CVV"
            name="cvv"
            placeholder="CVV"
            radius={"md"}
            my={"md"}
            value={form.values.cvv}
            {...form.getInputProps("cvv")}
          />
          <Button
            fz={"lg"}
            type="submit"
            my={"md"}
            style={{ width: "100%", height: "3rem" }}
          >
            Buy Now
          </Button>
        </form>
      </Box>

    </>
  );
}

export default Payment;
