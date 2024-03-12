"use client";

import React, { useState } from "react";
import { MonthPickerInput,DatesProvider } from '@mantine/dates';
import '@mantine/dates/styles.css';
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
import Image from "next/image";

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
      expireDate: null,
      cardNo: "",
      cvv: "",
    },

    validate: {
            //@ts-ignore
      expireDate: (val) => new Date(val).getTime() < Date.now() ? 'Expiry Date must be future date':null,
      cvv: (val) => val.toString().length!==3 ? 'CVV should be of 3 digits':null,

      cardNo: (val) =>  val.toString().length!==16?'Card number should be 16 digits' : null
    },
  });
  const params = useSearchParams();
  const router = useRouter();
  // backend url
  const backendUrl = 'https://digital-marketplace-backend.onrender.com'

  const id = params.get("id");
  const category = params.get("category");
  const price = params.get("price");
  const imgUrl = params.get("imgurl");
  const productName = params.get("productName");
  const productDescription = params.get("productDescription");
  // console.log(id, price, imgUrl, productDescription, productName, category);
  const { firstName, lastName, expireDate, cardNo, cvv } = form.values;
  console.log(typeof expireDate);
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
          <Image
            src={`${backendUrl}/uploads/${imgUrl}`}
            alt="productImage"
            width={100}
            height={100}
            style={{
              width: "5rem",
              height: "5rem",
              borderRadius: "10px",
            }}
          />
          <Box pr={"md"}>
            <Text fw={"bold"} fz={"md"}>
              {productName?.substring(0, 13) + "..."}
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
          opacity: ".2",
        }}
      />

      {/* PAYMENT FORM */}
      <Box mt={"xl"}>
        <form
          action=""
          onSubmit={form.onSubmit((e) => {
            window.alert("Product Bought");
          })}
        >
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
          id="credit-card-input"
            my={"md"}
            label="Card Number"
            name="cardNo."
            placeholder="0000 0000 0000 0000"
            required
            maxLength={16}
            value={form.values.cardNo}
            {...form.getInputProps("cardNo")}
          />
          {/* <TextInput
            required
            label="Expire Date"
            name="expireDate"
            placeholder="MM/YY"
            radius={"md"}
            value={form.values.expireDate}
            {...form.getInputProps("expireDate")}
            /> */}

<DatesProvider settings={{timezone: '', }}>
<MonthPickerInput
           
           required
           label="Expire Date"
           name="expireDate"
           placeholder="MM/YY"
           
           // value={form.values.expireDate}
           {...form.getInputProps("expireDate")}
         />
</DatesProvider>


         
          <NumberInput
            required
            label="CVV"
            name="cvv"
            placeholder="CVV"
            radius={"md"}
            my={"md"}
            maxLength={3}
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
