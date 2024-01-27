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
  Accordion,
  Flex,
} from "@mantine/core";
import {useForm} from "@mantine/form";
import {IconAt, IconTrashFilled} from "@tabler/icons-react";
import axios from "axios";
import Link from "next/link";
import React, {useState} from "react";

export interface productType {
  productDescription: String;
  productName: String;
  productImage: Object;
  price: Number | string;
  category: String;
}

function CreateProductPage() {
  const [image, setImage] = useState<[]>([]);
  const form = useForm({
    initialValues: {
      productName: "",
      productDescription: "",
      price: "",
      category: "",
      productImage: [{ file: null }],
    },
  });

  function handleForm(values: productType) {
    const form_Data = new FormData();
  
    Object.keys(values).forEach((key)=> {
      if (key !== "productImage") {
        // @ts-ignore
        form_Data.append(key, values[key]);
      }
    });
  
    // Check if productImage exists and is an array
    if (values.productImage && Array.isArray(values.productImage)) {
      values.productImage.forEach((imageObj, index) => {
        const file = imageObj.file;
        if (file && file instanceof File) {
          form_Data.append(`productImage[${index}]`, file);
        }
      });
    }
  
    axios.post("http://localhost:5050/product/create", form_Data).then((response) => {
      alert('Created successfully')
      // form.reset() To reset the form after submitting
    });
  }

  return (
    <Box>
      <Group my={10} align="baseline">
        <Title fz={35} fw={"600"}>
          <Link href={"/myProduct"} style={{textDecoration: "none", color: "black"}}>
            Myproduct
          </Link>
        </Title>
        <Text fz={30}>\</Text>
        <Title fz={25} fw={"lighter"}>
          <Link href={"/"} style={{textDecoration: "none", color: "black"}}>
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
        }}></Title>
      {/* Product details form */}
      <Box>
        <form
          onSubmit={form.onSubmit((values) => {
            handleForm(values);
          })}>
          <TextInput
            label="Name"
            placeholder="Product Name"
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
            value={Number(form.values.price)}
            placeholder="Enter price"
            {...form.getInputProps("price")}
          />
          <Select
            my={12}
            label="Catogry"
            placeholder="Pick value"
            data={["React", "Angular", "Vue", "Svelte"]}
            value={form.values.category}
            required
            {...form.getInputProps("category")}
          />
          <Accordion my={12} mt={30} variant="separated" defaultValue="1">
            <Accordion.Item value="1">
              <Accordion.Control>Upload Product images</Accordion.Control>
              <Accordion.Panel>
                {form.values.productImage.map((file, index) => (
                  <>
                    <Flex
                      justify="space-between"
                      gap={"md"}
                      align="center"
                      style={{height: "90px"}}>
                      <FileInput
                        // label="Select file"
                        style={{flexGrow: "1"}}
                        my={12}
                        clearable
                        accept=""
                        value={file}
                        placeholder="Upload image"
                        {...form.getInputProps(`productImage.${index}.file`)}
                      />
                      <div style={{cursor: "pointer"}}>
                        <IconTrashFilled
                          color={"red"}
                          colorProfile={"red"}
                          onClick={() =>
                            form.removeListItem("productImage", index)
                          }></IconTrashFilled>
                      </div>
                    </Flex>
                  </>
                ))}
                <Button onClick={() => form.insertListItem("productImage", {file: null})}>
                  Add Image
                </Button>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>

          <Button type="submit" variant="gradient" mr={"xs"} mt={"sm"}>
            Register
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default CreateProductPage;
