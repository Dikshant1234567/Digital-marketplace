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
import {useForm} from "@mantine/form";
import {IconAt, IconTrashFilled} from "@tabler/icons-react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, {useEffect, useState} from "react";

export interface productType {
  productDescription: String;
  productName: String;
  productImage: Object;
  price: Number | string;
  category: String;
}

function CreateProductPage() {
  const [image, setImage] = useState<[]>([]);
  const[deleteImage,setDeleteImage]=useState([])
  const router = useRouter()
  const form = useForm({
    initialValues: {
      productName: "",
      productDescription: "",
      price: "",
      category: "",
      productImage: [{}],
    },
  });

  // async function fetchSingleProduct() {
  
  // }


  //OPEN THIS USEEFFECT AND REPLACE ID IN API TO SEE AN EXISTING PRODUCT
  useEffect(() => {
    let data = null;
     axios
      .get("http://localhost:5050/product/65b66dc7e3d540ebd193f152")
      .then((e) => {
        data = e.data.data;

        let productImageData = data?.productImage?.map((e: any) => {
          return {...e};
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

      });  }, []);

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
      values.productImage.forEach((imageObj,index) => {
        
        const file = imageObj.file;
        if (file) {
          form_Data.append(`productImage[${index}]`, file);
        }
      });
    }

    if(true){
      form_Data.append('deletedImageIds', JSON.stringify(deleteImage))
    }

    axios.post("http://localhost:5050/product/create", form_Data).then((response) => {
      alert("Created successfully");
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
                {form.values?.productImage?.map((name, index) => {
                  return (
                    <div key={index.toString()}>
                      <Flex
                        justify="space-between"
                        gap={"md"}
                        align="center"
                        style={{height: "90px"}}>
                        <FileInput
                        capture
                          style={{flexGrow: "1"}}
                          my={12}
                          clearable
                          accept="image/png,image/jpeg"
                          // value={name}
                          placeholder={name.name ? name.name : "Upload Image"}
                          {...form.getInputProps(`productImage.${index}.file`)}
                        />
                        <div style={{cursor: "pointer"}}>
                          <IconTrashFilled
                            color={"red"}
                            colorProfile={"red"}
                            onClick={() =>{
                              form.removeListItem("productImage", index)
                              setDeleteImage([...deleteImage,name._id])}
                            }></IconTrashFilled>
                        </div>
                      </Flex>
                    </div>
                  );
                })}

                <Flex>{form.values?.productImage?.map(e=> (e.name && <img key={Math.random()} width={"100px"} height={"100px"} src={`http://localhost:5050/uploads/${e.name}`} />) )}</Flex>
                <Button onClick={() =>{ form.insertListItem("productImage", {})
                            }}>
                  Add Image
                </Button>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>

          <Button type="submit" variant="gradient" mr={"xs"} mt={"sm"} onClick={()=> router.push('/')}>
            Register
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default CreateProductPage;
