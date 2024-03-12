// @ts-nocheck
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
import { useForm } from "@mantine/form";
import { IconAt, IconTrashFilled } from "@tabler/icons-react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export interface productType {
  productDescription: String;
  productName: String;
  productImage: Object;
  price: Number | string;
  category: String;
}

function CreateProductPage(props) {
  const [deleteImage, setDeleteImage] = useState([]);
  const backendUrl = 'https://digital-marketplace-backend.onrender.com'

  const router = useRouter();
  const form = useForm({
    initialValues: {
      productName: "",
      productDescription: "",
      price: "",
      category: "",
      productImage: [{}],
    },
  });

  console.log(form.values, "forrrrrrrr");

  // async function fetchSingleProduct() {

  // }

  //OPEN THIS USEEFFECT AND REPLACE ID IN API TO SEE AN EXISTING PRODUCT
  useEffect(() => {
    if (props?.productId) {
      let data = null;
      axios
        .get(`${backendUrl}/product/${props.productId}`)
        .then((e) => {
          data = e.data.data;

          let productImageData = data?.productImage?.map((e: any) => {
            return { ...e };
          });

          let updateData = {
            productName: data.productName,
            productDescription: data.productDescription,
            price: data.price,
            category: data.category,
            productImage: productImageData,
          };

          form.setInitialValues(updateData);
          form.setValues(updateData);
        });
    }

    return () => {
      // props.setProductId(null)
      console.log("called");
    };
  }, []);

  function handleForm(values: productType) {
    const form_Data = new FormData();

    Object.keys(values).forEach((key) => {
      if (key !== "productImage") {
        // @ts-ignore
        form_Data.append(key, values[key]);
      }
    });

    // Check if productImage exists and is an array
    if (values.productImage && Array.isArray(values.productImage)) {
      values.productImage.forEach((imageObj, index) => {
        // const file = imageObj.file;
        if (imageObj) {
          form_Data.append(`productImage[${index}]`, imageObj);
        }
      });
    }

    if (true) {
      form_Data.append("deletedImageIds", JSON.stringify(deleteImage));
    }

    if (!props.productId) {
      axios
        .post(`${backendUrl}/product/create`, form_Data)
        .then((response) => {
          alert("Created successfully");
          // form.reset() To reset the form after submitting
        });
    } else {
      axios
        .post(
          `${backendUrl}/product/update/${props.productId}`,
          form_Data
        )
        .then((response) => {
          alert("Product updated successfully");
          // form.reset() To reset the form after submitting
        });
    }
  }

  return (
    <Box className="product-details-box">
      <Flex justify="end">
        <Button
          type="button"
          onClick={() => handleForm(form.values)}
          variant="gradient"
        >
          {props.productId ? "Update" : "Create"}
        </Button>
      </Flex>

      {/* Product details form */}
      <Box className="product-input-box">
        <form
          onSubmit={form.onSubmit((values) => {
            handleForm(values);
          })}
        >
          <TextInput
            label="Product Name"
            required
            mb={12}
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
            data={[
              "Ui Kits",
              "Web Pages",
              "Invoice Template",
              "Music Templates",
            ]}
            value={form.values.category}
            required
            {...form.getInputProps("category")}
          />
          <Accordion my={12} mt={30} variant="separated" defaultValue="1">
            <Accordion.Item value="1">
              <Accordion.Control>Upload Product images</Accordion.Control>
              <Accordion.Panel>
                {form.values?.productImage?.map((name, index) => {
                  return (
                    <div key={index.toString()}>
                      <Flex
                        justify="space-between"
                        gap={"lg"}
                        align="center"
                        style={{ height: "90px" }}
                      >
                        <FileInput
                          capture
                          style={{ flexGrow: "1" }}
                          my={12}
                          clearable
                          accept="image/png,image/jpeg"
                          placeholder={"Upload Image"}
                          {...form.getInputProps(`productImage.${index}`)}
                        />
                        {/* {name.file && <img height={"100px"} width={"100px"} src={URL.createObjectURL(name.file)}/>} */}
                        <div style={{ cursor: "pointer" }}>
                          <IconTrashFilled
                            color={"red"}
                            colorProfile={"red"}
                            onClick={() => {
                              form.removeListItem("productImage", index);
                              if (props.productId) {
                                setDeleteImage([...deleteImage, name._id]);
                              }
                            }}
                          ></IconTrashFilled>
                        </div>
                      </Flex>
                    </div>
                  );
                })}

                <Flex gap={"xl"}>
                  {form.values?.productImage?.map(
                    (e) =>
                      e !== null &&
                      Object.keys(e).length > 0 && (
                        <Image
                          key={Math.random()}
                          width={"100px"}
                          height={"100px"}
                          src={
                            e.size
                              ? URL.createObjectURL(e)
                              : `${backendUrl}/uploads/${e.name}`
                          }
                        />
                      )
                  )}
                </Flex>
                <Button
                  mt={"xl"}
                  onClick={() => {
                    form.insertListItem("productImage", {});
                  }}
                >
                  Add Image
                </Button>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </form>
      </Box>
    </Box>
  );
}

export default CreateProductPage;
