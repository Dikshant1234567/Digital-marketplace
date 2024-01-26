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
import Link from "next/link";
import React, { useState } from "react";

function CreateProductPage() {
  const [image, setImage] = useState<File | null>(null);
  const form = useForm({
    initialValues: {
      productName: "",
      productDescription: "",
      price: parseInt(""),
      category: "",
      productImage: image,
    },
  });
  // console.log(typeof form.values.price, form.values.price);

  let { productDescription, productImage, productName, price, category } =
    form.values;
  //   console.log(productDescription, productImage, productName, price, category);/

  console.log(price);
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
        <form action="">
          <TextInput
            label="Name"
            placeholder="Product Name"
            required
            my={12}
            value={form.values.productName}
            onChange={(event) =>
              form.setFieldValue("productName", event.currentTarget.value)
            }
          />
          <Textarea
            label="Product Description"
            required
            value={form.values.productDescription}
            onChange={(event) =>
              form.setFieldValue(
                "productDescription",
                event.currentTarget.value
              )
            }
          />
          <NumberInput
            label="Price in USD"
            required
            my={12}
            value={form.values.price}
            onChange={(event) => form.setFieldValue("price", form.values.price)}
          />
          <Select
            label="Catogry"
            placeholder="Pick value"
            data={["React", "Angular", "Vue", "Svelte"]}
            value={form.values.category}
            required
            // onChange={(event) =>
            //   form.setFieldValue("category", event.value)
            // }
          />
          <FileInput
            label="Select file"
            my={12}
            value={form.values.productImage}
            // onChange={(event) =>
            //   form.setFieldValue("productImage", setImage(event.))
            // }
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
