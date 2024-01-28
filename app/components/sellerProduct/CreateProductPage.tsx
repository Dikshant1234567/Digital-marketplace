"use client";
import {
  TextInput,
  Box,
  Textarea,
  NumberInput,
  Select,
  FileInput,
  Button,
  Title,
  Group,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconAt } from "@tabler/icons-react";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";

function CreateProductPage() {
  const [image, setImage] = useState<File | null>(null);
  const form = useForm({
    initialValues: {
      productName: "",
      productDescription: "",
      price: "",
      category: "",
      productImage: image,
    },
  });
  // console.log(typeof form.values.price, form.values.price);

  let { productDescription, productImage, productName, price, category } =
    form.values;
  //     console.log(productDescription, productImage, productName, price, category,'pppppppp')

  //   console.log(price);
  return (
    <Box>
      <Group my={10} align="baseline">
        <Title fz={35} fw={"600"}>
          <Link
            href={"/myProduct"}
            style={{ textDecoration: "none", color: "black" }}
          >
            Myproduct
          </Link>
        </Title>
        <Text fz={30}>\</Text>
        <Title fz={25} fw={"lighter"}>
          <Link href={"/"} style={{ textDecoration: "none", color: "black" }}>
            Order
          </Link>
        </Title>
      </Group>

      <Title
        order={1}
        my={".5rem"}
        style={{
          height: "4rem",
          textTransform: "capitalize",
          background: "default",
        }}
      >
        {productName}
      </Title>
      {/* Product details form */}
      <Box>
        <form
          onSubmit={form.onSubmit((values) => {
            // axios
            //   .post(`http://localhost:5050/product/allproducts`, values)
            //   .then((response) => console.log(response))
            //   .catch((e) =>
            //     console.log(e, "This is error in CreateProduct form...")
            //   );
          })}
        >
          <TextInput
            label="Product Name"
            required
            my={12}
            value={form.values.productName}
            {...form.getInputProps("productName")}
          />
          <Textarea
            label="Product Description"
            required
            placeholder="Enter description"
            value={form.values.productDescription}
            {...form.getInputProps("productDescription")}
          />
          <NumberInput
            label="Price in USD"
            required
            my={12}
            value={form.values.price}
            placeholder="Enter price"
            {...form.getInputProps("price")}
          />
          <Select
            label="Catogry"
            placeholder="Pick value"
            data={["React", "Angular", "Vue", "Svelte"]}
            value={form.values.category}
            required
            {...form.getInputProps("category")}
          />
          <FileInput
            label="Select file"
            my={12}
            value={form.values.productImage}
            placeholder="Product image"
            {...form.getInputProps("productImage")}
          />
          <Button type="submit" variant="gradient" mr={"xs"} mt={"sm"}>
            Register
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default CreateProductPage;
